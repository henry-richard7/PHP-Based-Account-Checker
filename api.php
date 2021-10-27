<?php
error_reporting(0);
header("Content-Type: application/json");

$username = $_GET['username'];
$password = $_GET['password'];

$postData = json_encode(
    array(
        "username" => $username,
        "password" => $password
    )
);

$ch = curl_init();

curl_setopt($ch, CURLOPT_URL, "https://ajax.streamable.com/check");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, $postData);
curl_setopt($ch, CURLOPT_USERAGENT, $_SERVER['HTTP_USER_AGENT']);
$headers = array();
$headers[] = 'content-type: application/json';
$headers[] = 'origin: https://streamable.com';
$headers[] = 'referer: https://streamable.com/';
$headers[] = 'sec-fetch-mode: cors';
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

$result = curl_exec($ch);

if (strpos($result, "ad_tags")) {
    $planType = json_decode($result, true);
    $resultJson = json_encode(array(
        "Success" => true,
        "Plan" => $planType['plan_name']
    ));

    echo $resultJson;
} else {
    $resultJson = json_encode(array(
        "Success" => false
    ));
    echo $resultJson;
}
