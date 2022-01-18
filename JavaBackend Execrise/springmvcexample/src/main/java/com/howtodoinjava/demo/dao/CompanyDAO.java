package com.howtodoinjava.demo.dao;

import java.util.List;

import com.howtodoinjava.demo.model.CompanyVO;
import com.howtodoinjava.demo.model.EmployeeVO;

public interface CompanyDAO 
{
	public List<CompanyVO> getAllCompanies();
}