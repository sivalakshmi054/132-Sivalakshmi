package com.marticus.core;

	import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import com.marticus.bo.Reservation;

	public class ReserveApp {
		
		public static void main(String[] args) throws Exception{
			ApplicationContext appContext = new ClassPathXmlApplicationContext("Reserve.xml");
			
			Reservation rb = (Reservation) appContext.getBean("Reservation");
			rb.checkIn();
			rb.checkOut();
			
		}
		     

	}


