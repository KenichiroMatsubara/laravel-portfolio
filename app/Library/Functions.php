<?php
namespace App\Library;

use Faker\Core\Number;

class Functions
{
    // ランダムな文字列を出力するだけの関数
    public static function randstr($length)
    {
        $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!#%&-=^~|@:*;+,<.>?';
        $str = "";
        for($i=0;$i<$length;$i++){
            $str .= $characters[mt_rand(0,strlen($characters))-1];
        }
        return $str;
    }
    // トークン作成関数
    public static function make_token()
    {
        $functions = new \App\Library\Functions;
        return hash("sha224",$functions->randstr(20));
    }
    // 本題のハッシュ化関数
    public static function p_hash($password,$pepper)
    {
        $functions = new \App\Library\Functions;
        $salt = $functions->randstr(20);
        // ペッパーとソルトをハッシュ化で融合させる
        $realsalt = hash("sha224",$pepper.$salt);
        $strech_num=10;
        for($i=0;$i<pow(2,$strech_num);$i++){
            // $realsalt+$passwordをハッシュ化
            $password = hash("sha224",$realsalt.$password);
        }
        // $p$10$salt$hashed_passwordのような構成で出力をする
        $password = "$"."p$".strval($strech_num).$salt."$".$password;
        return $password;
    }
    // 照合するための関数
    public static function pcompare($password,$hashed_password,$pepper)
    {
        preg_match('/\$(.*?)\$(.*?)\$(.*?)\$(.*)/', $hashed_password, $matches);
        $kind = $matches[1];
        $stretch_num = intval($matches[2]);
        $salt = $matches[3];
        $hashed_password = $matches[4];
        if($kind!="p"){
            return false;
        }
        // ペッパーとソルトをハッシュ化で融合させる
        $realsalt = hash("sha224",$pepper.$salt);
        for($i=0;$i<pow(2,$stretch_num);$i++){
            // $realsalt+$passwordをハッシュ化
            $password = hash("sha224",$realsalt.$password);
        }
        if($password==$hashed_password){
            return true;
        }
        else {
            return false;
        }
    }
}
