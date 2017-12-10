<?php
      echo $_POST["fullname"];
      exec("python ./research.py " . $_POST["fullname"]);
?>
