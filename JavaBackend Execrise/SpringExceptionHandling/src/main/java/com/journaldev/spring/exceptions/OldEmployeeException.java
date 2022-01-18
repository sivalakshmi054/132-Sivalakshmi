package com.journaldev.spring.exceptions;

public class OldEmployeeException extends Exception {
	
	
	public OldEmployeeException(int id){
		super("Old EmployeeNotFoundException with id="+id);
	}

}
