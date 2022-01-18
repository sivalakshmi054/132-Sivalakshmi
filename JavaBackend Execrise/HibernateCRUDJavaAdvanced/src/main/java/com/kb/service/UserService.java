package com.kb.service;

import java.util.List;

import com.kb.dao.UserDao;
import com.kb.model.User;

public class UserService {

	private UserDao userDao;
	
	//Create of CRUD
	 public void addUser(User user) {
		 userDao.addUser(user);
		 }
	 
	 //Read of CRUD
	public List<User> getAllUsers() {
		return userDao.getAllUsers();
	}

	//Read of CRUD
	    public User getUserById(int userid) {
	    	return userDao.getUserById(userid);
	    }
	    
	  //Update of CRUD
	    public void updateUser(User user) {
	    	userDao.updateUser(user);
	    }

	    //Delete of CRUD
	    public void deleteUser(int userid) {
	    	userDao.deleteUser(userid);
	    }

		public UserDao getUserDao() {
			return userDao;
		}

		public void setUserDao(UserDao userDao) {
			this.userDao = userDao;
		}
		
		//Read of CRUD
		public List<User> findUserByFirstName(String name) {
			return userDao.findUserByFirstName(name);
		}

		public void listOnProjection() {
			 userDao.listOnProjection();
		}

		public void getUserByMaxAge() {
			 userDao.getUserByMaxAge();
		}
}
