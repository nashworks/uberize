<? //start of database connection
$dbhost = 'localhost';//database host?
$dbuser = 'XXX';//database username?
$dbpass = 'XXX';//database password?
$dbname = 'XXX';//database name?
$dbtable = 'XXX';//database table?
$dbh = mysql_connect($dbhost,$dbuser,$dbpass);
mysql_select_db($dbname);
//end of database connection
$formname = (trim($_POST['formname'])!="")?addslashes(trim($_POST['formname'])):"";
$newData = "FAILED!";	
if ($formname=="uberForm") {
$dbqo = strtoupper((trim($_POST['dbqo'])!="")?addslashes(trim($_POST['dbqo'])):"INSERT");
$curData = (trim($_POST['curData'])!="")?addslashes(urldecode(trim($_POST['curData']))):"";
$id_to_update = (int)$_POST['id_to_update'];
$insertNames = "";
$insertValues = "";
$updateNamesValues = "";
$curDataArray = explode("&",$curData);
$maxNumber = count($curDataArray);
for($i=0;$i<$maxNumber;$i++) {
list($n,$v) = explode("=",$curDataArray[$i]);
if ($dbqo=="INSERT") {
$insertNames .= $n.",";
$insertValues .= "'".$v."',";
} else if ($dbqo=="UPDATE") {
$insertNamesValues .= $n."='".$v."',";
}}
if ($insertNames!="") $insertNames = substr($insertNames,0,-1);
if ($insertValues!="") $insertValues = substr($insertValues,0,-1);
if ($updateNamesValues!="") $updateNamesValues = substr($updateNamesValues,0,-1);
if ($dbqo=="INSERT"&&$insertNames!=""&&$insertValues!="") {
//uncomment line below after setting up your database connection above
//$insertRow = mysql_query("INSERT INTO ".$dbtable." (".$insertNames.") VALUES (".$insertValues.")") or die(mysql_error());
$newData = "SUCCESS!";
} else if ($dbqo=="UPDATE"&&$updateNamesValues!=""&&$id_to_update>0) {
//uncomment line below after setting up your database connection above
//$updateRow = mysql_query("UPDATE ".$dbtable." SET ".$updateNamesValues." WHERE id='".$id_to_update."'") or die(mysql_error());
$newData = "SUCCESS!";
}
}
echo $newData;?>