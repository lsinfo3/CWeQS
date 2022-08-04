<?php
//error_reporting(0);   // Don't report errors
//ignore_user_abort(1); // Allow running script in the background

/* 
 * This is an example of how to handle TrackUI logs.
 * We are going to create .csv inside the logs dir.
 * Remember to assign write permissions to that dir.
 */

$configs = include('config.php');
$directory = $configs["DIRECTORY"];

define('LOGDIR', $directory);
define('LOGEXT', ".csv");
define('INFSEP', "|||"); // Must match that of defined in trackui.js (INFO_SEPARATOR)

// Enable CORS
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: X-Requested-With');
header('Access-Control-Max-Age: 86400'); // Cache preflight request

// Exit early so that the page isn't fully loaded for OPTIONS requests
if (strtolower($_SERVER['REQUEST_METHOD']) == 'options') exit;

// If raw post data, this could be from IE8 XDomainRequest
//if (isset($_POST) && !isset($HTTP_RAW_POST_DATA)) $HTTP_RAW_POST_DATA = file_get_contents('php://input');
// Only use this if you want to populate $_POST in all instances
if (isset($HTTP_RAW_POST_DATA)) {
  $data = explode('&', $HTTP_RAW_POST_DATA);
  foreach ($data as $val) {
    if (!empty($val)) {
      list($key, $value) = explode('=', $val);   
        $_POST[$key] = rawurldecode($value);
    }
  }
}

if (get_magic_quotes_gpc()) {
  function stripslashes_deep($value) {
    $value = is_array($value) ? array_map('stripslashes_deep', $value) : stripslashes($value);
    return $value;
  }
  $_GET  = stripslashes_deep($_GET);
  $_POST = stripslashes_deep($_POST);
}

// Convert JS array to newline-delimited entries
$info_data = str_replace(INFSEP, PHP_EOL, $_POST['info']) .PHP_EOL;

// Ensure that our dir exists
if (!is_dir(LOGDIR) && !mkdir(LOGDIR)){ exit;}

if ($_POST['action'] == "init") {
  // Get name of log file
  $fid = $_POST['task'];
  // Save data for the first time
  $header = "cursor timestamp xpos ypos event xpath attrs extras" .PHP_EOL;
  file_put_contents(LOGDIR."/".$fid.LOGEXT, $header.$info_data);  
  // Notify recording script
  echo round(microtime(true) * 1000);
  
} else if ($_POST['action'] == "append") {
  // Don't write blank lines
  $fid = $_POST['task'];
  if (trim($info_data)) {
    file_put_contents(LOGDIR."/".$fid.LOGEXT, $info_data, FILE_APPEND);
  }
}
?>
