package com.marticus.aspect;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.After;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;



@Aspect
public class ReservationAspect<JoinPoint>{
	@Before("execution(* com.marticus.Reservation.bo.ReservationBolmpl.checkIn(..))")
	public void checkId(JoinPoint joinPoint) {
		System.out.println("Checking In");
    }
	@After("execution(* com.marticus.Reservation.bo.ReservationBolmpl.checkIn(..))")
	public void checkVaccCert(JoinPoint joinpoint) {
		System.out.println("Checked In");
		System.out.println("Checking Room Status");
		System.out.println("Room status Checked Successfull!!");
	}
	@Around("execution(* com.marticus.Reservation.bo.ReservationBolmpl.checkOut(..))")
	public void logAround(ProceedingJoinPoint joinPoint) throws Throwable {
		//System.out.println("Checked Out");
		joinPoint.proceed();
		System.out.println("Checked Out");
		
		}
	
}