package com.howtodoinjava.demo.dao;

import java.util.ArrayList;
import java.util.List;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Repository;

import com.howtodoinjava.demo.model.CompanyVO;
import com.howtodoinjava.demo.model.EmployeeVO;
import com.howtodoinjava.demo.service.Company;

@Repository // else u can also use @Component
@Scope("singleton")
public class CompanyDAOImpl implements CompanyDAO {

	public List<CompanyVO> getAllCompanies() 
	{
		List<CompanyVO> companies = new ArrayList<CompanyVO>();
		
		CompanyVO company1=new CompanyVO();
		company1.setName("IBM");
		companies.add(company1);
		
		CompanyVO company2=new CompanyVO();
		company2.setName("Cognizant");
		companies.add(company2);
		
		CompanyVO company3=new CompanyVO();
		company3.setName("TCS");
		companies.add(company3);
		
		return companies;
		
	
	}

	
}