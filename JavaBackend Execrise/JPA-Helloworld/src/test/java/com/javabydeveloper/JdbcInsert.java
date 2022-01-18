package com.javabydeveloper;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.time.LocalDateTime;

public class JdbcInsert {

	private static final String SQL = "INSERT INTO USER "
			+ "(ID, USER_NAME, PASSWORD, EMAIL, CREATED_TIME, UPDATED_TIME, DOB, USER_TYPE)"
			+ " VALUES (?,?,?,?,?,?,?,?)";

	public static void main(String[] args) {

		try (Connection conn = DriverManager.getConnection("jdbc:mysql://127.0.0.1:3306/jpa_jbd", "root", "password");
				PreparedStatement ps = conn.prepareStatement(SQL)) {

			ps.setInt(1, 1);
			ps.setString(2, "peterm");
			ps.setString(3, "password");
			ps.setString(4, "peterm@email.com");
			ps.setTimestamp(5, Timestamp.valueOf(LocalDateTime.now()));
			ps.setTimestamp(6, null);
			ps.setTimestamp(7, Timestamp.valueOf(LocalDateTime.now()));
			ps.setString(8, "EMPLOYEE");

			int row = ps.executeUpdate();
			
		} catch (SQLException e) {
			e.printStackTrace();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
