<?php

	$servername = "http://192.168.1.80/";
	$username = "root";//"ilmuxicz_lgadmin" root;
	$password = "pass";//"P@ssw0rd" Zyx1Stu2Mno;
	$dbname = "nodered";//"ilmuxicz_test_tracker ilmuxicz_tracker " timetracker;
	
	$GLOBALS['connection']=mysqli_connect($servername, $username, $password, $dbname);
	
	if (!$connection) {
    		die("Connection failed: " . mysqli_connect_error());
	}
?>


    <?php

	$servername = "localhost";
	//$port = 8000;
	$username = "root";//"ilmuxicz_lgadmin" root;
	$password = "pass";//"P@ssw0rd" Zyx1Stu2Mno;
	$dbname = "nodered";//"ilmuxicz_test_tracker ilmuxicz_tracker " timetracker;
	
	
	//$GLOBALS['connection']=mysqli_connect($servername.':'.$port, $username, $password, $dbname);
	$GLOBALS['connection']=mysqli_connect($servername, $username, $password, $dbname);
	
	if (!$connection) {
    		die("Connection failed: " . mysqli_connect_error());
	}
?>
