<?php

if (!(
    function_exists("randstr")
    ||function_exists("make_token")
    ||function_exists("p_hash")
    ||function_exists("p_compare_password")
)){
    // ランダムな文字列を出力するだけの関数
    function randstr($length)
    {
        $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $str = "";
        for($i=0;$i<$length;$i++){
            $str .= $characters[mt_rand(0,strlen($characters))-1];
        }
        return $str;
    }

    // トークン作成関数
    function make_token($data=null)
    {
        return hash("sha224",randstr(20)).hash("sha224",randstr(20));
    }
    // 本題のハッシュ化関数
    function p_hash($password,$pepper)
    {
        $salt = randstr(20);
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
    // ハッシュ化の比較関数
    function p_compare_password($password,$hashed_password,$pepper)
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
