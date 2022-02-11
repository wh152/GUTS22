<!DOCTYPE html>
<html>

<head>
  <meta charset="utf-8" />
  <title>HTML files in this directory</title>
</head>

<body>

<h1>HTML files in this directory</h1>
<?php

$files = scandir("./");
foreach ($files as $f) {
  if (preg_match("/.+\.html$/i", $f) === 1) {
    echo "<a href=\"{$f}\">{$f}</a><br />\n";
  }
}

?>

</body>
</html>
