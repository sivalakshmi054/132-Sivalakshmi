package com.howtodoinjava.demo.controller;
//http://localhost:8085/springmvcexample/comp/getAllEmployees
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.howtodoinjava.demo.configuration.PropertyFileConfiguration;
import com.howtodoinjava.demo.model.CompanyVO;
import com.howtodoinjava.demo.model.EmployeeVO;
import com.howtodoinjava.demo.service.Company;
import com.howtodoinjava.demo.service.EmployeeManager;

@Controller
@RequestMapping("/Comp")
public class CompanyController 
{
	@Autowired
	Company company;

	@RequestMapping(value = "/getAllCompanies", method = RequestMethod.GET)
	public String getAllCompanies(Model model)
	{

		List<CompanyVO> compList=company.getAllCompanies();
		model.addAttribute("companies",compList );
		model.addAttribute("name","Siva");
		model.addAttribute("title","Human");
		return "CompanyList";
	}
	
	
	
	}
