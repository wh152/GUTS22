<?php
/*
 * CS class status app - basic HTML and table of class members.
 * Saleem Bhatti, Sep 2018.
 */

print <<<START
<!DOCTYPE html>
<html>

<head>
 <title>2018 Class List for CS2003</title>
</head>

<body>

<h1>2018 Class List for CS2003</h1>
START;

$class_file = "cs2003_class.txt"; // insecure!

if (!file_exists($class_file)) {
  exit("Error at server -- sorry!\n"); // script exits.
}

$file = fopen($class_file, "r");
echo "<table>\n";
while (($row = fgetcsv($file, 256)) != false) {
  $uid = $row[0]; $lastname = $row[1]; $firstnames = $row[2];
  echo "<tr> <td> {$uid} </td> <td> {$lastname} </td> <td> {$firstnames} </td> </tr>\n";
}
fclose($file);
echo "</table>\n";

print <<<FINISH

</body>
</html>

FINISH;
?>
