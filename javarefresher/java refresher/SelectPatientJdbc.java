 


import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

/**
 * A sample program that demonstrates how to execute SQL SELECT statement
 * using JDBC. 
 * @author www.codejava.net
 *
 */
public class SelectPatientJdbc {

	public static void main(String[] args) {
		String dbURL = "jdbc:mysql://localhost:3306/hospital";
		String username = "root";
		String password = "Diksheek@26";
		
		try (Connection conn = DriverManager.getConnection(dbURL, username, password)) {
			
			String sql = "SELECT * FROM patient ";
			
			Statement statement = conn.createStatement();
			ResultSet result = statement.executeQuery(sql);
			
			int count = 0;
			
			while (result.next()){
				String patient_id = result.getString(2);
				String patient_name = result.getString(3);
				String patient_disease = result.getString("patient_disease");
				String patient_age = result.getString("patient_age");
				String patient_gender=result.getString("patient_gender");
				
				String output = "patient Id: %s - %s - %s - %s -%s";
				System.out.println(String.format(output, ++count, patient_id, patient_name, patient_disease, patient_age));
			}
			
		} catch (SQLException ex) {
			ex.printStackTrace();
		}		
	}



	}


