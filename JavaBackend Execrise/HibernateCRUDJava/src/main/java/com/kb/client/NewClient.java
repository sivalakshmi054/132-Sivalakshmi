package com.kb.client;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Stream;

import javax.persistence.TypedQuery;

import org.hibernate.Session;

import com.kb.model.User;
import com.kb.util.HibernateUtil;

public class NewClient {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		Session session = HibernateUtil.getSessionFactory().openSession();
		try {
		  
		  session.beginTransaction();
		  User u1=new User();
		  u1.setAge(45);
		  u1.setEmail("a@b.com");
		  u1.setFirstName("Amir1");
		  
		  User u2=new User();
		  u2.setFirstName("Jakir1");
		  u2.setAge(21);
		  u2.setEmail("c@b.com");
		  session.save(u1);
		  session.save(u2);
		 // session.evict(u1);
		  
	      session.getTransaction().commit();       
	        
	      int i1=u1.getId();
	      int i2=u2.getId();
	      session.evict(u1);
	      System.out.println("U1 email="+u1.getEmail());
	     // session.is
	      
	      User ux= session.get(User.class, i1);
	      User ux1= session.get(User.class, i2);
	      
	      
	             
	        } catch (RuntimeException e) {
	            e.printStackTrace();
	        } finally {
	            session.close();
	        }
	        	   
	    	      
	    	      
	    	      
	    	      
	    	      
	    	      
	    	      
	    	      
	        	    
	}

}
