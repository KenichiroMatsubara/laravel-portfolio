<?php

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
        return hash("sha224", randstr(20)) . hash("sha224", randstr(20));
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
}
