package com.kb.client;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import com.kb.dao.UserDao;
import com.kb.model.User;
import com.kb.service.UserService;

public class UserClient {
	public static void main(String[] args) {
		UserService userService = new UserService();
		UserDao userDao = new UserDao();
		userService.setUserDao(userDao);

		// Add new user - Create of CRUD
		User user1 = new User();
		user1.setFirstName("John");
		user1.setLastName("JC");
		try {
			Date dob = new SimpleDateFormat("yyyy-MM-dd").parse("1995-01-01");
			user1.setDob(dob);
		} catch (ParseException e) {
			e.printStackTrace();
		}
		user1.setEmail("john@sample.com");
		user1.setAge(26);
		User user2 = new User();
		user2.setFirstName("Robin");
		user2.setLastName("RC");
		try {
			Date dob = new SimpleDateFormat("yyyy-MM-dd").parse("1975-01-01");
			user2.setDob(dob);
			user2.setAge(46);
		} catch (ParseException e) {
			e.printStackTrace();
		}
		user2.setEmail("robin@sample.com");
		
		userService.addUser(user1);
		userService.addUser(user2);

		// Get all users - Read of CRUD
		for (User retrivedUser : userService.getAllUsers()) {
			System.out.println(retrivedUser.getFirstName());
			System.out.println(retrivedUser.getLastName());
			System.out.println(retrivedUser.getEmail());
			System.out.println(retrivedUser.getDob());
		}
		
		// Get user by id - Read of CRUD
		User retrivedUser = userService.getUserById(1);
		System.out.println(retrivedUser.getFirstName());
		System.out.println(retrivedUser.getLastName());
		System.out.println(retrivedUser.getEmail());
		System.out.println(retrivedUser.getDob());

		// Update user - Update of CRUD
		user1.setEmail("johnUpdated@sample.com");
		user1.setId(1);
		userService.updateUser(user1);
		
		
		List<User> listOnFirstName = userService.findUserByFirstName("John");
		
		for (User retrivedUser2 : listOnFirstName) {
			System.out.println(retrivedUser2.getFirstName());
			System.out.println(retrivedUser2.getLastName());
			System.out.println(retrivedUser2.getEmail());
			System.out.println(retrivedUser2.getDob());
		}

		userService.listOnProjection();
		
		userService.getUserByMaxAge();

		// Delete user - Delete of CRUD
		userService.deleteUser(1);
	}
}
