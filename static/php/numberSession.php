<?php
$configs = include('config.php');
$directory = $configs["DIRECTORY"];
$csvFiles = glob($directory.'/*.csv');  
$jsonFiles = glob($directory.'/*.json');
$session_count = 0;
foreach($csvFiles as $i => $csvFile){
    $parts = explode("/", $csvFile);
    $filename = end($parts);
    $targetJsonFilename = str_replace("events.csv", "data.json", $filename);
    if(!in_array($targetJsonFilename, $jsonFiles)){
        $session_count++;
    }
}
echo $session_count;
?>
