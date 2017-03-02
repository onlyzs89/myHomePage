<?php
	if( isset($_POST['name']) && isset($_POST['email']) && isset($_POST['inquery']) ){
		mb_language("Japanese");
		mb_internal_encoding("UTF-8");
		$name	 = $_POST['name'];
		$email	 = $_POST['email'];
		$inquery = $_POST['inquery'];
		
		$to      = 'onlyzs1023@gmail.com';
		$subject = 'Inquery from HP';
		$message = $inquery . "\r\n\r\n" . $name . "\r\n" . $email;
		$headers = 'From: ' . $email . "\r\n";

		mb_send_mail($to, $subject, $message, $headers);
	}else{
		header( 'HTTP/1.0 403 Forbidden' );
		die( '<h2>Access Forbidden!</h2>' );
	}
