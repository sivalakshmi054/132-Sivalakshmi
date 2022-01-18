<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>

<html>
<head>
	<title>Spring MVC Hello World</title>
</head>

<body>
	<h2>All Companies in System--created by ${name} </h2>
	${prop}
	<table border="1">
		<tr>
			<th>Company Id</th>
			<th> Name</th>
		
		</tr>
		<c:forEach items="${companies}" var="company">
			<tr>
				<td>${company.id}</td>
				<td>${company.firstName}</td>
			</tr>
		</c:forEach>
	</table>

</body>
</html>