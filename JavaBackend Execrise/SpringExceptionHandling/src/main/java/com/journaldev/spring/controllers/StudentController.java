package com.journaldev.spring.controllers;

import java.io.IOException;
import java.sql.SQLException;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.journaldev.spring.exceptions.EmployeeNotFoundException;
import com.journaldev.spring.exceptions.OldEmployeeException;
import com.journaldev.spring.model.Employee;

@Controller
public class StudentController {

	
	@RequestMapping(value="/stud/{id}", method=RequestMethod.GET)
	public String getStudent(@PathVariable("id") int id, Model model) throws Exception{
		 
		 throw new NumberFormatException("Number Format Exception");
		
	}
	
	
}
