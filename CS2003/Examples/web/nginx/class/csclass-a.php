<?php
/*
 * CS class status app - basic reading of class file (CSV).
 * Saleem Bhatti, Sep 2018.
 */


$class_file = "cs2003_class.txt"; // insecure!

if (!file_exists($class_file)) {
  die("File not found for read - {$class_file}\n"); // script exits.
}

$file = fopen($class_file, "r");
while (($row = fgetcsv($file, 256)) != false) {
  $uid = $row[0]; $lastname = $row[1]; $firstnames = $row[2];
  echo "{$uid} {$lastname} {$firstnames}\n";
}
fclose($file);

?>
