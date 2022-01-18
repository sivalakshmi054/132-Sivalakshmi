package com.javabydeveloper;

	import java.util.List;

	import javax.persistence.EntityManager;
	import javax.persistence.EntityManagerFactory;
	import javax.persistence.EntityTransaction;
	import javax.persistence.Persistence;
	import javax.persistence.Query;

	import com.javabydeveloper.domain.Student;
	import com.javabydeveloper.domain.Teacher;

	/**
	 * JPA Hello world!
	 *
	 */
	public class TeacherApp {

		public static void main(String[] args) {

			EntityManagerFactory emf = null;
			EntityManager entityManager = null;
			EntityTransaction transaction = null;

			try {
				emf = Persistence.createEntityManagerFactory("jbd-pu");
				entityManager = emf.createEntityManager();
				transaction = entityManager.getTransaction();
				transaction.begin();

				Teacher teacher = new Teacher();
				teacher.setTeachertName("jayanta");
				teacher.setSubject("JAVA BACKEND");
				teacher.setDegree("PHD");

				entityManager.persist(teacher);

				transaction.commit();
			
				Query q = entityManager.createQuery("select s from tech s");

				List<Student> resultList = q.getResultList();
				System.out.println("num of sudents:" + resultList.size());
				for (Student next : resultList) {
					System.out.println("next student: " + next);
				}

			} catch (Exception e) {
				System.out.println(e);
				transaction.rollback();
			} finally {
				entityManager.close();
				emf.close();
			}
		}
	}

}
