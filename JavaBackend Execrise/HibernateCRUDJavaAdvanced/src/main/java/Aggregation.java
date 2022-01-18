import org.hibernate.Session;
import org.hibernate.query.Query;

import com.kb.util.HibernateUtil;

public class Aggregation {

	public static void main(String[] args)
	{
		
		   Session session = HibernateUtil.getSessionFactory().openSession();
	        try {
	            String hqlQuery = "SELECT MIN(age) FROM User";
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
