package com.howtodoinjava.demo.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Scope;

import com.howtodoinjava.demo.dao.EmployeeDAO;
import com.howtodoinjava.demo.dao.EmployeeDAOImpl;
import com.howtodoinjava.demo.service.EmployeeManager;
import com.howtodoinjava.demo.service.EmployeeManagerImpl;

@Configuration
public class ContextConfiguration {

	@Bean
	@Scope("singleton")
	public EmployeeManager employeeManager() {
		return new EmployeeManagerImpl(employeeDAO());
	}

	@Bean
	@Scope("singleton")
	public EmployeeDAO employeeDAO() {
		return new EmployeeDAOImpl() ;
	}
}
