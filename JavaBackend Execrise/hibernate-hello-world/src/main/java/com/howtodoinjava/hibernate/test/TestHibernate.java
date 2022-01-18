
package com.howtodoinjava.hibernate.test;

import org.hibernate.Session;
import com.howtodoinjava.hibernate.test.dto.*;
import com.howtodoinjava.hibernate.test.*; 

public class TestHibernate {
	
	public static void main(String[] args) {
		Session session = com.howtodoinjava.hibernate.test.HibernateUtil.getSessionFactory().openSession();
		session.beginTransaction();
       
//		//Add new Employee object
//		EmployeeEntity emp = new EmployeeEntity();
//		emp.setEmail("demo-user@mail.com");
//		emp.setFirstName("demo");
//		emp.setLastName("user");
		
		Student s= new Student();
		s.setStudent_id("S101");
		s.setStudent_name("Jayanta");
		session.save(s);
		
		session.getTransaction().commit();
		HibernateUtil.shutdown();
	}

}
