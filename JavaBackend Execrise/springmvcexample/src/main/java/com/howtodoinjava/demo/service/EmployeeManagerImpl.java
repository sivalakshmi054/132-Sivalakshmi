package com.howtodoinjava.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import com.howtodoinjava.demo.dao.EmployeeDAO;
import com.howtodoinjava.demo.model.EmployeeVO;

@Service  // else u can also use @Component
@Scope("singleton")
public class EmployeeManagerImpl implements EmployeeManager {

	@Autowired
	EmployeeDAO employeeDAO;
	
	public EmployeeManagerImpl(EmployeeDAO employeeDAO2) {
		this.employeeDAO = employeeDAO2;
	}

	public EmployeeManagerImpl() {
		
	}

	public void setEmployeeDAO(EmployeeDAO employeeDAO) {
		this.employeeDAO = employeeDAO;
	}

	public List<EmployeeVO> getAllEmployees() 
	{
		return employeeDAO.getAllEmployees();
	}

}
