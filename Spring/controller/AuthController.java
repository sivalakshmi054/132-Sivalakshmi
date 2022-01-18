package com.marticus.employee.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PostMapping;

import com.marticus.employee.entity.UserEntity;
import com.marticus.employee.service.EmployeeService;

@Controller
public class AuthController {

	@Autowired
	EmployeeService employeeService;

	@PostMapping("/login")
	public String login(UserEntity user, Model model) {
		boolean isUserPresent = employeeService.authenticateUser(user);
	
		if (isUserPresent) {
			return "redirect:/emp/";
		}
		model.addAttribute("wrongpassword", "Username or Password is wrong");
		return "index";
	}

}
