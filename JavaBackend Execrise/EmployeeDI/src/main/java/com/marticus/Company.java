package com.marticus;

public class Company {

	private Employee emp;

	public Employee getEmp() {
		return emp;
	}

	public void setEmp(Employee emp) {
		this.emp = emp;
	}
	
 public void showEmp()
 {
	
	 emp.showEmpType();
	 
 }
	
}
