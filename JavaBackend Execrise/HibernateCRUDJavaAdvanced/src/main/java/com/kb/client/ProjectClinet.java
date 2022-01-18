package com.kb.client;

import java.util.Iterator;
import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Projection;
import org.hibernate.criterion.ProjectionList;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;

import com.kb.model.User;
import com.kb.util.HibernateUtil;

public class ProjectClinet {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		List<User> user = null;
		 Session session = HibernateUtil.getSessionFactory().openSession();
		try {
			
			session.beginTransaction();
			
        	Criteria criteria = session.createCriteria(User.class); 
        	Projection projection = Projections.property("firstName"); 
        	Projection projection2 = Projections.property("lastName"); 
        	Projection projection3 = Projections.property("email"); 
        	ProjectionList pList = Projections.projectionList(); 
        	pList.add(projection); 
        	pList.add(projection2); 
        	pList.add(projection3); 
        	criteria.add(Restrictions.like("firstName","John%",MatchMode.ANYWHERE));
        	criteria.setProjection(pList); 
        	user = criteria.list();
        	//user.stream().forEach(c->System.out.println(c.toString()));
        	
        	 
        	
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

}
