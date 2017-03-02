<?php
	ini_set('display_errors',1);
	
	if( isset($_POST['msg-cotent']) ){ // save new msg
		$content = $_POST['msg-cotent'];
		$mysqli = mysqli_connect('localhost', 'xxxxx', 'xxxxx', 'xxxxx');
		
		if ($mysqli->connect_error) {
			die(header('HTTP/1.1 500 Internal Server Error'));
		} else {
			header('Content-type: application/json');
			$mysqli->set_charset("utf8");
		}
		
		if (isset($_SERVER["REMOTE_ADDR"])) $ip_addr = $_SERVER["REMOTE_ADDR"];
		if (isset($_SERVER["HTTP_USER_AGENT"])) $user_agent = $_SERVER["HTTP_USER_AGENT"];

		$insert_sql = "INSERT INTO msg (content, ip_addr, user_agent) VALUES ('" . $content . "','" . $ip_addr . "','" . $user_agent . "');";
		$mysqli->query($insert_sql);
		echo json_encode("Updated!");
		
		$mysqli->close();
		
	}else if (isset($_POST['request-msg']) && $_POST['request-msg']="true"){ //get msg
		$mysqli = mysqli_connect('xxxxx', 'xxxxx', 'xxxxxx', 'xxxxx');
		
		if ($mysqli->connect_error) {
			die(header('HTTP/1.1 500 Internal Server Error'));
		} else {
			header('Content-type: application/json');
			$mysqli->set_charset("utf8");
		}
		
		$content_arr =[];
		$select_sql = "SELECT content FROM msg ORDER BY access_time DESC LIMIT 50;";
		if ($result = $mysqli->query($select_sql)) {
			while ($row = $result->fetch_assoc()) {
				$content_arr[] = $row["content"];
			}

			$result->close();
		}
		
		$content = json_encode(array("content"=>$content_arr));
		echo $content;
		
		$mysqli->close();
	}else{
		header( 'HTTP/1.0 403 Forbidden' );
		die( '<h2>Access Forbidden!</h2>' );
	}