package com.kb.dao;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import javax.persistence.TypedQuery;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.hibernate.criterion.Projection;
import org.hibernate.criterion.ProjectionList;
import org.hibernate.criterion.Projections;
import org.hibernate.query.Query;

import com.kb.model.User;
import com.kb.util.HibernateUtil;

public class UserDao {
	
	//Create of CRUD
	 public void addUser(User user) {
	        Transaction trns = null;
	        Session session = HibernateUtil.getSessionFactory().openSession();
	        try {
	            trns = session.beginTransaction();
	            session.save(user);
	            session.getTransaction().commit();
	        } catch (RuntimeException e) {
	            if (trns != null) {
	                trns.rollback();
	            }
	            e.printStackTrace();
	        } finally {
	            session.close();
	        }
	    }
	 
	 //Read of CRUD
	@SuppressWarnings("unchecked")
	public List<User> getAllUsers() {
	        List<User> users = new ArrayList<User>();
	        Session session = HibernateUtil.getSessionFactory().openSession();
	        try {
	            users = session.createQuery("from User").getResultList();
	        } catch (RuntimeException e) {
	            e.printStackTrace();
	        } finally {
	            session.close();
	        }
	        return users;
	    }
	 
	 //Read of CRUD
	@SuppressWarnings("unchecked")
	public List<User> findUserByFirstName(String name) {
	        List<User> users = new ArrayList<User>();
	        Session session = HibernateUtil.getSessionFactory().openSession();
	        try {
	        	 //Hibernate Named Query    
	            TypedQuery<User> query = session.getNamedQuery("findUserByFirstName");    
	             query.setParameter("firstName",name);   
	                     
	             users=query.getResultList();   
	        } catch (RuntimeException e) {
	            e.printStackTrace();
	        } finally {
	            session.close();
	        }
	        return users;
	    }

	//Read of CRUD
	    public User getUserById(int userid) {
	        User user = null;
	        Session session = HibernateUtil.getSessionFactory().openSession();
	        try {
	            String hqlQuery = "from User where id = :id";
	            @SuppressWarnings("rawtypes")
				Query query = session.createQuery(hqlQuery);
	            query.setParameter("id", userid);
	            user = (User) query.getSingleResult();
	        } catch (RuntimeException e) {
	            e.printStackTrace();
	        } finally {
	            session.close();
	        }
	        return user;
	    }
	    
	  //Update of CRUD
	    public void updateUser(User user) {
	        Transaction trns = null;
	        Session session = HibernateUtil.getSessionFactory().openSession();
	        try {
	            trns = session.beginTransaction();
	            session.update(user);
	            session.getTransaction().commit();
	        } catch (RuntimeException e) {
	            if (trns != null) {
	                trns.rollback();
	            }
	            e.printStackTrace();
	        } finally {
	            session.close();
	        }
	    }

	    //Delete of CRUD
	    public void deleteUser(int userid) {
	        Transaction trns = null;
	        Session session = HibernateUtil.getSessionFactory().openSession();
	        try {
	            trns = session.beginTransaction();
	            User user = (User) session.load(User.class, new Integer(userid));
	            session.delete(user);
	            session.getTransaction().commit();
	        } catch (RuntimeException e) {
	            if (trns != null) {
	                trns.rollback();
	            }
	            e.printStackTrace();
	        } finally {
	            session.close();
	        }
	    }

		@SuppressWarnings({ "unchecked", "deprecation" })
		public void listOnProjection() {
			List<?> user = null;
	        Session session = HibernateUtil.getSessionFactory().openSession();
	        try {
	        	Criteria criteria = session.createCriteria(User.class); 
	        	Projection projection = Projections.property("firstName"); 
	        	Projection projection2 = Projections.property("lastName"); 
	        	Projection projection3 = Projections.property("email"); 
	        	ProjectionList pList = Projections.projectionList(); 
	        	pList.add(projection); 
	        	pList.add(projection2); 
	        	pList.add(projection3); 
	        	criteria.setProjection(pList); 
	        	user = criteria.list();
	        	
	        	Iterator<?> it2 = user.iterator();

	            while (it2.hasNext()) {
	                Object[] obj = (Object[]) it2.next();
	                System.out.println("firstName : " + obj[0]+" lastName : "+obj[1]+" email : "+obj[2]);
	            }
	            
	        } catch (RuntimeException e) {
	            e.printStackTrace();
	        } finally {
	            session.close();
	        }
	    }

		//Read of CRUD
		    public void getUserByMaxAge() {
		        Session session = HibernateUtil.getSessionFactory().openSession();
		        try {
		            String hqlQuery = "SELECT MAX(age) FROM User";
		            @SuppressWarnings("rawtypes")
					Query query = session.createQuery(hqlQuery);
		            Object maxAge = query.getSingleResult();
		            
		            System.out.println("Maximum age of User -> " + maxAge);
		            
		        } catch (RuntimeException e) {
		            e.printStackTrace();
		        } finally {
		            session.close();
		        }
		    }

	    
}
