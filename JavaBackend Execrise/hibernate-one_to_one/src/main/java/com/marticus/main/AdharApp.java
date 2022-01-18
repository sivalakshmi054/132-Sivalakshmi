package com.marticus.main;

import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.Transaction;

import com.marticus.dao.Address;
import com.marticus.dao.Adhar;
import com.marticus.dao.Person;
import com.marticus.dao.Student;
import com.marticus.util.HibernateUtil;

public class AdharApp 
{
	public static void main(String[] args) 
	{
		Session session = HibernateUtil.getSessionFactory().openSession();
		Transaction transaction = null;
		try {
			transaction = session.beginTransaction();
			Adhar adhar1 = new Adhar("2356748395");
			Adhar adhar2 = new Adhar("3456748394");
			Person person1 = new Person("siva");
			Person person2 = new Person("Lucky");
			session.save(person1);
			session.save(person2);
			transaction.commit();
		} catch (HibernateException e) 
		{
			transaction.rollback();
			e.printStackTrace();
		} finally {
			session.close();
		}

	}

}



