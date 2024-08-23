<?php

use App\Models\Token;
use Illuminate\Http\Request;

if (!(
    function_exists("randstr")
    || function_exists("make_token")
    || function_exists("p_hash")
    || function_exists("p_compare_password")
)){
    // ランダムな文字列を出力するだけの関数
    function randstr($length)
    {
        $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $str = "";
        for($i = 0; $i < $length; $i++){
            $str .= $characters[mt_rand(0, strlen($characters) - 1)];
        }
        return $str;
    }

    // トークン作成関数
    function make_token($data = null)
    {
        return hash("sha256", randstr(20));
    }
    // 本題のハッシュ化関数
    function p_hash($password)
    {
        $pepper = getenv("PEPPER");
        $salt = randstr(20);
        // ペッパーとソルトをハッシュ化で融合させる
        $realsalt = hash("sha224", $pepper . $salt);
        $strech_num = 10;
        for($i = 0; $i < pow(2, $strech_num); $i++){
            // $realsalt+$passwordをハッシュ化
            $password = hash("sha224", $realsalt . $password);
        }
        // $p$10$salt$hashed_passwordのような構成で出力をする
        $password = "p$" . strval($strech_num) . "$" . $salt . "$" . $password;
        return $password;
    }
    // ハッシュ化の比較関数p_compare_password("password","p$10$45moFTu8fGkpp8w8vTLo$700a995f94390f184f5be2fdca03411f9ebff4ab4ab0f263a1387788","pepper")
    function p_compare_password($password, $hashed_password)
    {
        $pepper = getenv("PEPPER");
        $kind = "";
        $stretch_str="";
        $stretch_num=0;
        $salt = "";
        $main = "";
        $phase = 0;
        for($i=0;$i<mb_strlen($hashed_password);$i++){
            if($hashed_password[$i]=="$"){
                $phase++;
            }
            else {
                switch($phase){
                    case 0:
                        $kind.=$hashed_password[$i];
                        break;
                    case 1:
                        $stretch_str.=$hashed_password[$i];
                        break;
                    case 2:
                        $salt.=$hashed_password[$i];
                        break;
                    case 3:
                        $main.=$hashed_password[$i];
                        break;
                }
            }
        }
        $stretch_num = intval($stretch_str);
        if($kind != "p"){
            return false;
        }
        // ペッパーとソルトをハッシュ化で融合させる
        $realsalt = hash("sha224", $pepper . $salt);
        for($i = 0; $i < pow(2, $stretch_num); $i++){
            // $realsalt+$passwordをハッシュ化
            $password = hash("sha224", $realsalt . $password);
        }
        if($password == $main){
            return true;
        } else {
            return false;
        }
    }
    // JSONをBase64化
    function json_to_b64($data)
    {
        return base64_encode(json_encode($data));
    }
    // Base64を扱いやすいJSONデータに変換
    function b64_to_json($data)
    {
        return json_decode(base64_decode($data),true);
    }
    // 署名関数
    function sign($data,$algo,$salt)
    {
        $secret = hash("sha256",$salt.getenv("SECRET"));
        if($algo=="HS256"){
            return base64_encode(hash_hmac("sha256",$data,$secret,true));
        }
    }
    function make_jwt($role,$uid,$token_id)
    {
        $header = [
            "alg"=>"HS256",
            "typ"=>"JWT",
        ];
        $payload = [
            "uid"=>$uid,
            "tid"=>$token_id,
            "role"=>$role,
            'iat'=>time(),
            'exp'=>time()+3600*24,//有効期限は1日
        ];
        $b64Header = json_to_b64($header);
        $b64Payload = json_to_b64($payload);
        $salt = Token::find($token_id);

        $signature = sign($b64Header . "." . $b64Payload,$header['alg'],$salt);
        $jwt = $b64Header . "." . $b64Payload . "." . $signature;
        return $jwt;
    }
    // トークンが有効期限内のものであるかや、それが誰のトークンなのかなど様々な確認をする
    function check_token($jwt)
    {
        $tokenParts = explode('.', $jwt);
        $b64Header = $tokenParts[0];
        $b64Payload = $tokenParts[1];
        $signature = $tokenParts[2];
        $salt = Token::find(b64_to_json($b64Payload)["tid"]);
        // トークンの改ざんを検知
        if(sign($b64Header . "." . $b64Payload,"HS256",$salt)!=$signature){
            return [
                "result"=>false,
                "messages"=>"sign is falied",
                "signature" => $signature,
                "signature2"=>sign($b64Header . "." . $b64Payload,"HS256",$salt)
            ];
        }
        // トークンの期限を確認
        else if(b64_to_json($b64Payload)["exp"]<time()){
            return [
                "result"=>false,
                "messages"=>"token is expired"
            ];
        }
        // トークンに含まれる情報を確認
        else{
            return [
                "result"=>true,
                "payload"=>b64_to_json($b64Payload),
                "user_type"=>b64_to_json($b64Payload)["role"],
                "id"=>b64_to_json($b64Payload)["uid"],
            ];
        }
    }
    // ヘッダーに含まれるトークンの正当性を確認
    function headerIsValid(Request $request)
    {
        $jwt_token = $request->header('JWT_TOKEN');
        if(check_token($jwt_token)["result"]==true){
            return true;
        }
        else{
            return false;
        }
    }
}
