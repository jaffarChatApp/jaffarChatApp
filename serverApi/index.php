<?php
	header("Access-Control-Allow-Origin: *");
	include("db_connect.php");
	include("application.php");
	//include("user.php");
	//include("admin.php");
	session_start();
	
	$function= $_REQUEST['function'];
	//$data=$_REQUEST["data"];
	
	switch ($function){
		case "getUsers":
			getUserList($connection);
			//getUserList($_REQUEST["data"],$connection);
			break;
		
		default:
			echo json_encode(array("msg"=>"No such function exist","success"=>false));
	}	
?>
