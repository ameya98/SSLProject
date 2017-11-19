<?php
    $coursecount = 8;
    $courses = array();
    $fname = $_POST["firstname"];
    $lname = $_POST["lastname"];
    $title = "NULL";
    $webmail = $_POST["webmail"];
    $url = $_POST["url"];
    $image = $_POST["image"];
    if($image == NULL)
    {
      $image = "NULL";
    }

    $theme = $_POST["theme"];

    for($i = 1; $i <= $coursecount; $i++)
    {
      $courses[$i] = $_POST["course" . (string)$i];
      if($courses[$i] == NULL)
      {
        $courses[$i] = "off";
      }
    }

    $file = fopen('./data/formdata.txt', 'w+');   // open txt file
    ftruncate($file, 0);                          // clear file
    $content = $fname . PHP_EOL . $lname . PHP_EOL . $title . PHP_EOL . $webmail . PHP_EOL. $image. PHP_EOL;

    for($i = 1; $i <= $coursecount; $i++)
    {
      $content .= $courses[$i] . PHP_EOL;
    }
    $content .= $theme . PHP_EOL;

    fwrite($file , $content);             // write to file
    fclose($file );                       // close file

    header("Location: main.html"); /* Redirect browser */
    exit();

?>
