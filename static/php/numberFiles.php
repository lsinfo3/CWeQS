<?php
$configs = include('config.php');
$directory = $configs["DIRECTORY"];
$number_files = count(glob($directory.'/*.json')); //count only JSON files as events.csvs are always created at beginning and JSON files only in the end 
echo $number_files;
?>
