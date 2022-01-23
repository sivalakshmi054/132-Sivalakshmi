package com.marticus.core;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import com.marticus.auth.Authenticate;
import com.marticus.customer.bo.CustomerBo;

public class App {
	public static void main(String[] args) throws Exception {

		ApplicationContext appContext = new ClassPathXmlApplicationContext("Spring-Customer.xml");

//		CustomerBo customer = (CustomerBo) appContext.getBean("customerBo");
//		customer.addCustomer();
		Authenticate authCust = (Authenticate) appContext.getBean("auth");
//		authCust.login();
//		authCust.logout();
		authCust.forgotPassword();

	}
}