<!DOCTYPE html>
<html>
<head>
<meta http-equiv="refresh" content="2"> <!-- reload every 2 seconds! -->
<title>CS2003 2020/21 Net2 Practical - Daily Messages Board</title>
</head>
<body>

<h1>CS2003 2020/21 Net2 Practical - Daily Messages Board</h1>

<small>
Please note: this PHP script is for demonstration purposes in the CS2003 Net2
coursework only -- it has very little checking of input so please use with
care!
</small>

<p>
<?php
$now = date("Y-m-d H-i-s");
$today = date("Y-m-d");
echo "Now it is - " . $now . ".<br />\n";
?>
</p>

<?php
// today's messages
$messages = array();
$todayDir = "./" . $today;
if (is_dir($todayDir))
{
  $dir = new DirectoryIterator("./" . $todayDir);
  foreach($dir as $f)
  {
    if (!$f->isDot() && !$f->isDir())
    { array_push($messages, $f->getFilename()); }
  }
  rsort($messages, SORT_STRING);
}
// all the days for which messages are available
$availableDays = array();
$dir = new DirectoryIterator("./");
foreach($dir as $f)
{
  if (!$f->isDot() && $f->isDir())
    { array_push($availableDays, $f->getFilename()); }
}
rsort($availableDays, SORT_STRING);
?>

<table border="1" width="600">
<?php
$lines = 0;
foreach ($messages as $f)
{
  // filename is the timestamp of creation of the message
  echo "<tr><td><em style='color: blue';>" . $f . "</em><br />";
  include($today . "/" . $f);
  echo "</td><tr>\n";
  $lines += 1;
}
if ($lines == 0)
  { echo "<em style='color: red';>No messages for today, yet.</em><br />"; }
?>
</table>

<p>
<?php
echo "Total number of Messages today is " . sizeof($messages) . ".";
?>
</p>

<br />
<hr />

<p>
Days for which messages have been recorded are listed below.
</p>

<table border="0" width="200">
<?php
foreach ($availableDays as $d)
{
  // dirname is the datestamp for creation of the message dir
  echo "<tr><td><em style='color: green';>" . $d . "</em><br />";
  echo "</td><tr>\n";
}
?>
</table>

<br />
<hr />

<small>
Based on code by <a href="https://saleem.host.cs.st-andrews.ac.uk/">Saleem Bhatti</a>.
</small>

</body>
</html>
