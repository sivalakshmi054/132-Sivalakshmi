package com.javatpoint;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

public class Employee {

	@NotNull 
	private String name;
	@Size(min=3,max=4 ,message="data required")
	private String pass;
	
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	@NotNull 
	private String email;
	
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getPass() {
		return pass;
	}
	public void setPass(String pass) {
		this.pass = pass;
	}
}
