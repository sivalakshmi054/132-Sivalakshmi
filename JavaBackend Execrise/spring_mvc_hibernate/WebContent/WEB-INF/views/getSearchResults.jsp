<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ page session="false"%>
<html>
<head>
<title>Home</title>
</head>
<body>
	<h1>Hello world!</h1>

	<P>The time on the server is ${serverTime}.</p>

	<form >
		<p> User Id : ${userId}</p><br>
		<p> User Name :${userName}</p>
		<p> User Email:${userEmail}
		
		 
	</form>
</body>
</html>