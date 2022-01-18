package com.kb.model;

public class Employee {

	/*
	 * EMPLOYEE
		ID (emp_id)  INT
		FIRST NAME VARCHAR(45) (emp_fname)
		LAST NAME (emp_lname)
		ADDRESS (emp_address)
		MAIL (emp_mail)
		PAN (emp_pan)
	 */
	int Id;
	String firstName;
	String lastName;
	String email;
	String address;
	String pan;
	
	
	public int getId() {
		return Id;
	}
	public void setId(int id) {
		Id = id;
	}
	public String getFirstName() {
		return firstName;
	}
	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}
	public String getLastName() {
		return lastName;
	}
	public void setLastName(String lastName) {
		this.lastName = lastName;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String getPan() {
		return pan;
	}
	public void setPan(String pan) {
		this.pan = pan;
	}
	
	
	

}
