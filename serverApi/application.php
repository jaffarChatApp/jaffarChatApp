<?php

    function getUserList($connection){
        
        //$q=json_decode($data);
		//$query="SELECT email,name,image from user where email like '$q->query%' or name like '$q->query%'";
        
		//$query="SELECT * FROM newuserlist"; //where userId != '"+$q->userId+"'";
		
		$query="SELECT * FROM `newuserlist`";
		
        $result=getJsonData($query,$connection);
				
		echo json_encode(array("userData"=>$result,"success"=>true,"msg"=>"Success"));
				
    }

    function getJsonData($sqlQuery,$connection)
	{
		$sqldata = $sqlQuery;
		$result = mysqli_query($connection,$sqldata);
        //echo "Test", $result;
		$josndata=array();
		if (mysqli_num_rows($result) > 0) 
		{
				while($row = mysqli_fetch_assoc($result)) 
				{
					$jsondata[]=$row;
				}
		}
		else
		{
				$jsondata =array();
		}
		return $jsondata;
	}

?>
