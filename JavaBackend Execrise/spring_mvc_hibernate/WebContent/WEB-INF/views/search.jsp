<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ page session="false"%>
<html>
<head>
<title>Search</title>
</head>
<body>

	<P>The time on the server is ${serverTime}.</p>

	<form action="getSearchResults" method="post">
	userId    : <input type="text" name="id">
	<input
			type="submit" value="search">
	</form>
</body>
</html>