<?php
/*
 * CS class status app - homepage status.
 * Saleem Bhatti, Sep 2018.
 */

print <<<START
<!DOCTYPE html>
<html>

<head>
  <link rel="stylesheet" href="csclass.css" />
  <title>2018 Class List for CS2003</title>
</head>

<body>

<h1>2018 Class List for CS2003</h1>
START;
error_reporting(E_ERROR | E_PARSE); /* stop warning messages in output */

function check_uri($u) {
  $result = get_headers($u);
  return strpos($result[0], "200") === false ? false : true;
}

$class_file = "cs2003_class.txt"; // insecure!

if (!file_exists($class_file)) {
  exit("Error at server -- sorry!\n"); // script exits.
}

$file = fopen($class_file, "r");

echo "<csclass>\n";

echo "  <student>\n";
echo "    <uid class=\"columnheading\">UID</uid>\n";
echo "    <surname class=\"columnheading\">Surname</surname>\n";
echo "    <firstname class=\"columnheading\">Firstname</firstname>\n";
echo "    <homepage>Homepage</homepage>\n";
echo "  </student>\n\n";

while (($row = fgetcsv($file, 256)) != false) {
  $uid = $row[0]; $lastname = $row[1]; $firstnames = $row[2];
  $homepage = "https://{$uid}.host.cs.st-andrews.ac.uk/";
  $homepage_status = check_uri($homepage) ? "true" : "false";
  echo "  <student>\n";
  echo "    <uid> {$uid} </uid>\n";
  echo "    <lastname> {$lastname} </lastname>\n";
  echo "    <firstnames> {$firstnames} </firstnames>\n";
  echo "    <homepage status=\"{$homepage_status}\"> <a href=\"{$homepage}\">homepage</a> </homepage>\n";
  echo "  </student>\n\n";
}
fclose($file);
echo "</csclass>\n";

print <<<FINISH

</body>
</html>

FINISH;
?>
