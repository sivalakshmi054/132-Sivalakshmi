package com.howtodoinjava.demo.controller;

import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.Mapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import com.howtodoinjava.demo.model.Student;

@Controller
@RequestMapping("/students")
public class StudentController {

	@RequestMapping(value = "/getAllStudents", method = RequestMethod.GET)
	public ModelAndView getAllEmployees()
	{
		//System.out.println(propertyFileConfiguration.getTestProperty());
		  return new ModelAndView("studentreg", "student", new Student());
		
		//return "studentreg";
	}
	
	
	@RequestMapping(value = "/getAllStudents1", method = RequestMethod.GET)
	public String getAllEmployees_new(Model m)
	{
		//System.out.println(propertyFileConfiguration.getTestProperty());
		//  return new ModelAndView("studentreg", "student", new Student());
		
		m.addAttribute("studentreg",new Student());
		
		return "studentreg";
	}
	
	
 
	
	 
	@RequestMapping(value = "/showerror", method = RequestMethod.GET)
	public String showerror(Model m)
	{
		//System.out.println(propertyFileConfiguration.getTestProperty());
		//  return new ModelAndView("studentreg", "student", new Student());
		
		m.addAttribute("studentreg",new Student());
		
		return "studentreg";
	}
	
	
	@RequestMapping(value = "/showdashboard", method = RequestMethod.GET)
	public String showDashBoard(Model m)
	{
		//System.out.println(propertyFileConfiguration.getTestProperty());
		//  return new ModelAndView("studentreg", "student", new Student());
		
		m.addAttribute("studentreg",new Student());
		
		return "studentreg";
	}
	
	
	
	
	@RequestMapping(value = "/addStudent", method = RequestMethod.POST)
	   public String addStudent(@ModelAttribute("student")Student student, 
	   ModelMap model) {
	      model.addAttribute("name1", student.getName());
	      model.addAttribute("age1", student.getAge());
	      model.addAttribute("id", student.getId());
	      
	      
	      return "studentresults";
	   }
	
}
