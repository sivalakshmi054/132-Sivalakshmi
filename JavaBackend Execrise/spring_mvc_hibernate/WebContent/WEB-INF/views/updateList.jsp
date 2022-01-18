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
	<p><a href="/spring_mvc_hibernate/">AddUser</a></p>
	<p><a href="/spring_mvc_hibernate/getUsersList">UserList</a></p>

	<P>The time on the server is ${serverTime}.</p>

	<form action="/spring_mvc_hibernate/update/${id}"  method="POST">
			<tr>
				<td>userId    : <input type="text" name="id" disabled value="${userId}"></td>
				<td>userName   : <input type="text" name="userName" value="${userName}" ></td>
				<td>userEmail   : <input type="text" name="userEmail" value="${userEmail}"></td>
			</tr>
			</table>
			<input type=hidden id="id" name="Id" value="${userId }"/>
		
			
		 <input
			type="submit" value="Update">
	</form>
</body>
</html>