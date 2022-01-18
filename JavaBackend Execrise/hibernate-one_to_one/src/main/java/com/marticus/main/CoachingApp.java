package com.marticus.main;

import java.util.HashSet;
import java.util.Set;

import javax.transaction.Transaction;

import org.hibernate.HibernateException;
import org.hibernate.Session;

import com.marticus.dao.CoachingCenter;
import com.marticus.dao.Student2;
import com.marticus.util.HibernateUtil;

public class CoachingApp 
{

	public static void main(String[] args) {
		Session session = HibernateUtil.getSessionFactory().openSession();
			Transaction transaction = null;
			
		try {
			
			transaction =  session.beginTransaction();
            Set<CoachingCenter> ccName = new HashSet<CoachingCenter>();
			ccName.add(new CoachingCenter("PHYSICS","1212"));
			ccName.add(new CoachingCenter("CHEMISTRY","1215"));
			ccName.add(new CoachingCenter("MATHS","1215"));
			
			Student2 s2 = new Student2("RON", ccName);
			session.save(s2);
			

								
			transaction.commit();
		} catch (HibernateException e) 
		{
			transaction.rollback();
			e.printStackTrace();
		} finally 
		{
			session.close();
		}

	}
}
