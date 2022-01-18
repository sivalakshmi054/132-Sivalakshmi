package com.marticus.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

 

@Entity
public class Users {
	
	public int getId() {
		return Id;
	}

	public void setId(int id) {
		Id = id;
	}

	@Id
	@GeneratedValue (strategy = GenerationType.IDENTITY)
	private int Id;
	private String userName;
	private String userAge;
	public String getUserAge() {
		return userAge;
	}

	public void setUserAge(String userAge) {
		this.userAge = userAge;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}
}
