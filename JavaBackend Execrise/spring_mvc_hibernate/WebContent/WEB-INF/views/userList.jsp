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

	<form  method="post">
		<c:forEach items="${uList}" var="user">
			<tr>
				<td>${user.id}</td>
				<td>${user.userName}</td>
				<td>${user.userEmail}</td>
				<td><a href='/spring_mvc_hibernate/updateList/${user.id}'>Update ${user.id}</a>  <a href=''>Delete</a></td>
			</tr>
			<br>
		</c:forEach>
		 <input
			type="submit" value="add">
	</form>
</body>
</html>