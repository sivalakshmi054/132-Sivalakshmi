package com.marticus.core;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import com.marticus.reservation.bo.ReservationBo;

  public class ReservationApp 
  {
	   public static void main(String[] args) throws Exception 
	    {
			ApplicationContext appContext = new ClassPathXmlApplicationContext("Spring-Reservation.xml");
			
			ReservationBo rr = (ReservationBo) appContext.getBean("reservationBo");
			rr.checkIn();
			rr.checkOut();
			
		}
		     

	
	}
