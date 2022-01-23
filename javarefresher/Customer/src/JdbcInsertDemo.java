


import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.Scanner;

/**
 * A sample program that demonstrates how to execute SQL INSERT statement
 * using JDBC. 
 * @author www.codejava.net
 *
 */
public class JdbcInsertDemo {

	public static void main(String[] args) {
		
		boolean flag=true;
		
		do {
			Scanner sc= new Scanner(System.in);
			System.out.println("Please enter patient_id:");
			int patient_id=sc.nextInt();
			System.out.println("Please enter patient_name:");
			String patient_name=sc.nextLine();
			System.out.println("Please enter patient_disease:");
			String patient_disease=sc.nextLine();
			System.out.println("Please enter patient_age:");
			int patient_age=sc.nextInt();
			System.out.println("please enter bed_allocation");
			String bed_allocation=sc.nextLine();
			insertData(patient_id,patient_name,patient_disease,patient_age,bed_allocation);
			System.out.println("Do you want to enter more data ? (Y/N)");
			String input=sc.nextLine();
			if(input.equalsIgnoreCase("N"))
			{
				flag=false;
			}
			 
			
		}while(flag);
		
		System.out.println("program ends");



}


public static void insertData(int patient_id, String patient_name, String patient_disease, int patient_age, String bed_allocation) {
	
	// TODO Auto-generated method stub
	String dbURL = "jdbc:mysql://localhost:3306/training";
	String username = "root";
	String password = "Diksheek@26";
	
	try (Connection conn = DriverManager.getConnection(dbURL, username, password)) {
		
		String sql = "INSERT INTO patient (patient_id,patient_name,patient_disease,patient_age,bed_allocation) VALUES (?, ?, ?, ?, ? )";
		
		PreparedStatement statement = conn.prepareStatement(sql);
		statement.setInt(1, patient_id);
		statement.setString(2, patient_name);
		statement.setString(3, patient_disease);
		statement.setInt(4, patient_age);
		statement.setString(5, bed_allocation);
		
		int rowsInserted = statement.executeUpdate();
		if (rowsInserted > 0) {
			System.out.println("A new user was inserted successfully!");
		}

		
	} catch (SQLException ex) {
		ex.printStackTrace();
	}		
	
	
}
}
