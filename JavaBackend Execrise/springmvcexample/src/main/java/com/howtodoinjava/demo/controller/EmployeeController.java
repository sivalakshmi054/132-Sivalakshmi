package com.howtodoinjava.demo.controller;
//http://localhost:8080/springmvcexample/employee-module-1/getAllEmployees
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.howtodoinjava.demo.configuration.PropertyFileConfiguration;
import com.howtodoinjava.demo.model.EmployeeVO;
import com.howtodoinjava.demo.service.EmployeeManager;

@Controller
@RequestMapping("/employee-module-1")
public class EmployeeController 
{
	@Autowired
	EmployeeManager employeeManager;
	
	@Autowired
	PropertyFileConfiguration propertyFileConfiguration;

	@RequestMapping(value = "/getAllEmployees", method = RequestMethod.GET)
	public String getAllEmployees(Model model)
	{
		//System.out.println(propertyFileConfiguration.getTestProperty());
		List<EmployeeVO> empList=employeeManager.getAllEmployees();
		model.addAttribute("employees",empList );
		model.addAttribute("prop",propertyFileConfiguration.getTestProperty());
		model.addAttribute("name","JAYANTA");
		model.addAttribute("title","DAS");
		return "employeesListDisplay";
	}
	
	
	@RequestMapping(value = "/getOneEmployee", method = RequestMethod.GET)
	public String getOneEmploye(Model model)
	{
		 
		List<EmployeeVO> empList=employeeManager.getAllEmployees();
		model.addAttribute("employees",empList );
		 
		return "employeesListDisplay2";
	}
}