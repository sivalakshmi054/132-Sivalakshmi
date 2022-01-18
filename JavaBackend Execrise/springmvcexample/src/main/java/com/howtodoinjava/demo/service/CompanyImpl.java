package com.howtodoinjava.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import com.howtodoinjava.demo.dao.CompanyDAO;
import com.howtodoinjava.demo.dao.EmployeeDAO;
import com.howtodoinjava.demo.model.CompanyVO;
import com.howtodoinjava.demo.model.EmployeeVO;

@Service  // else u can also use @Component
@Scope("singleton")
public class CompanyImpl implements Company {

	@Autowired
	CompanyDAO CompanyDAO;
	
	public CompanyImpl(CompanyDAO companyDAO1) {
		this.CompanyDAO = companyDAO1;
	}

	public CompanyImpl() {
		
	}

	public void setCompanyDAO(CompanyDAO companyDAO1) {
		this.CompanyDAO = companyDAO1;
	}

	public List<CompanyVO> getAllCompanies() 
	{
		return CompanyDAO.getAllCompanies();
	}

}
