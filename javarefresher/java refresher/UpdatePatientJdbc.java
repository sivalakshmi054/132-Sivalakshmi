
import java.sql.Connection;

import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;


public class UpdatePatientJdbc {

	
		
		/**
		 * A sample program that demonstrates how to execute SQL UPDATE statement
		 * using JDBC.
		 * @author www.codejava.net
		 * @param <Connection>
		 *
		 */
		

			public static void main(String[] args) {
				String dbURL = "jdbc:mysql://localhost:3306/hospital";
				String username = "root";
				String password = "Diksheek@26";

				try (Connection conn = DriverManager.getConnection(dbURL, username, password)) {

					String sql = "UPDATE SET patient_name=?, patient_disease=?, patient_age=?, patient_gender=?,allocating_bed=?,bed_number=? WHERE patient_id=?";

					PreparedStatement statement = conn.prepareStatement(sql);
					statement.setString(1, "valli");
					statement.setString(2, "ulcer");
					statement.setInt(3, 35);
					statement.setString(4, "yes");
                    statement.setInt(5, 118);					
					

					int rowsUpdated = statement.executeUpdate();
					if (rowsUpdated > 0) {
						System.out.println("An existing user was updated successfully!");
					}


				} catch (SQLException ex) {
					ex.printStackTrace();
				}
			}
		
		// TODO Auto-generated method stub

	}


