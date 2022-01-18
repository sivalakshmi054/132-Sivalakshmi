<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ page session="false"%>
<html>
<head>
<title>Home</title>
</head>
<body>

<table border="1">
		<tr>
			<th>Id</th>
			<th>Name</th>
			<th>Age</th>
			<th>Update</th>
			<th>Delete</th>
		</tr>
		<c:forEach items="${uList}" var="usr">
			<tr>
				<td>${usr.id}</td>
				<td>${usr.userName}</td>
				<td>${usr.userAge}</td>
				<td><a href="/spring_mvc_hibernate/update/${usr.id}">Update</a></td>
				<td><a href="/spring_mvc_hibernate/delete/${usr.id}">Delete</a></td>
			</tr>
		</c:forEach>
	</table>

</body>
</html>