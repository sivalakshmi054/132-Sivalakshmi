package com.marticus.employee.controller;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.marticus.employee.entity.UserEntity;
import com.marticus.employee.service.EmployeeService;

@RestController
@RequestMapping("/api/user")
public class RestUser {
	
	@Autowired
	EmployeeService employeeService;
	
	@PostMapping("/create")
	public ResponseEntity<String> createUser(@RequestBody UserEntity userEntity)
	{
		String response = employeeService.createUser(userEntity);
		
		return ResponseEntity.status(HttpStatus.CREATED).body(response);
		
	}
	
	@PutMapping("/update")
	public ResponseEntity<String> updateUser(@RequestBody UserEntity userEntity)
	{
		String response = employeeService.update(userEntity);
	
		return ResponseEntity.ok(response);
	}
	
	@DeleteMapping("/delete")
	public ResponseEntity<String> deleteUser(@RequestParam int id)
	{
		String response = employeeService.deleteUser(id);
		return ResponseEntity.ok(response);
	}
	
	@GetMapping("/users")
	public ResponseEntity<String> getUsers()
	{
		String response;
		response = employeeService.findAll();
		return ResponseEntity.ok(response);
	}
	
	@GetMapping("/id/{id}")
	public ResponseEntity<String> getUserById(@PathVariable int id)
	{
		String response = employeeService.findUsersById(id);
		return ResponseEntity.ok(response);
	}
	
	@GetMapping("/{userName}")
	public ResponseEntity<String> findUsersByUserName(@PathVariable String userName)
	{
		String response = employeeService.findUsersByUserName(userName);
		return ResponseEntity.ok(response);
	}
	

}
