<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>

<html>
<head>
	<title>Spring MVC Hello World</title>
</head>

<body>
	<h2>All Employees in System--created by</h2>
 
	<table border="1">
		<tr>
			<th>Employee Id</th>
			<th>First Name</th>
		 
		</tr>
		<c:forEach items="${employees}" var="employee">
			<tr>
				<td>${employee.id}</td>
				<td>${employee.firstName}</td>
				 
			</tr>
		</c:forEach>
	</table>

</body>
</html>