package com.marticus.controller;

import java.text.DateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.List;
import java.util.Locale;

import org.hibernate.Session;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

 
import com.marticus.model.Users;
import com.marticus.utility.*;
@Controller
public class HomeController {

	/**
	 * Simply selects the home view to render by returning its name.
	 */
	@RequestMapping(value = "/", method = RequestMethod.GET)
	public String home(Locale locale, Model model) {
//		System.out.println("Home Page Requested, locale = " + locale);
//		Date date = new Date();
//		DateFormat dateFormat = DateFormat.getDateTimeInstance(DateFormat.LONG, DateFormat.LONG, locale);
//
//		String formattedDate = dateFormat.format(date);
//
//		model.addAttribute("serverTime", formattedDate);

		//return "home";
		return "redirect:/userlist";
	}

	@RequestMapping(value = "/user", method = RequestMethod.POST)
	public String addUser(@Validated Users user, Model model) {
	 
		Session session = HibernateUtil.getSessionFactory().openSession();
		session.beginTransaction();
		session.save(user);
		session.getTransaction().commit();
		session.close();	
		model.addAttribute("userName", user.getUserName());
		model.addAttribute("userAge", user.getUserAge());
		return "redirect:/userlist";
	}
	
	@RequestMapping(value = "/updateuser", method = RequestMethod.POST)
	public String updateUsersData(@Validated Users user, Model model) {
		 
		Session session = HibernateUtil.getSessionFactory().openSession();
		session.beginTransaction();
		session.save(user);
		session.getTransaction().commit();
		session.close();	
		model.addAttribute("userName", user.getUserName());
		model.addAttribute("userAge", user.getUserAge());
		return "redirect:/userlist";
	}
	
	@RequestMapping(value="/update/{id}", method=RequestMethod.GET)
	public String updateUserForDisplay(@PathVariable("id") int id, Model model) throws Exception
    {
		Session session = HibernateUtil.getSessionFactory().openSession();
		session.beginTransaction();
		Users u= new Users();
		u.setId(id);		
		session.load(u, new Integer(1));
		model.addAttribute("users", u);		 
		session.getTransaction().commit();
		session.close();		
    	return "update";
    }
     
	
	@RequestMapping(value="/delete/{id}", method=RequestMethod.GET)
	public String deleteUser(@PathVariable("id") int id, Model model) throws Exception
    {
		Session session = HibernateUtil.getSessionFactory().openSession();
		session.beginTransaction();
		Users u= new Users();
		u.setId(id);		
		session.load(u, new Integer(1));		
		session.delete(u);
		session.getTransaction().commit();
		session.close();		
		return "redirect:/userlist";
    }
     
	@RequestMapping(value = "/userlist", method = RequestMethod.GET)
	public String usersList(Model model) {
		 //HQL - Hibenate Query Language
		Session session = HibernateUtil.getSessionFactory().openSession();
		session.beginTransaction();
		//select * from Users -- equivalent SQL
		List Users =session.createQuery("From Users").list();
		ArrayList <Users> uList = new ArrayList<Users>();
		for (Iterator iterator2 = Users.iterator(); iterator2.hasNext();){
            Users u = (Users) iterator2.next(); 
            
            uList.add(u);
            System.out.println("User: " + u.getId()); 
         }
		model.addAttribute("uList",uList );
//		List<EmployeeVO> empList=employeeManager.getAllEmployees();
//		model.addAttribute("employees",empList );
//		<c:forEach items="${uList}" var="user">
//		<td>${user.name}</td>
//
//		
//		/c:forEach>

		
//		model.addAttribute("userName", user.getUserName());
//		model.addAttribute("userAge", user.getUserAge());
		return "displist";
	}
	
	
	
	}
