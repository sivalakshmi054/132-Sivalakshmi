package com.marticus.aspect;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.After;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;

@Aspect
public class LoginAspect {

	@Before("execution(* com.marticus.auth.Authenticate.login(..))")
	public void checkIP()
	{
		
		System.out.println("IP is OK");
		
	}
	@After("execution(* com.marticus.auth.Authenticate.logout(..))")
	public void ipCheckPostLogin()
	{
		
		System.out.println("IP Check Post Login is OK");
		
	}
	
	@Around("execution(* com.marticus.auth.Authenticate.forgotPassword(..))")
	public void logAround(ProceedingJoinPoint joinPoint) throws Throwable {

		System.out.println("logAround() is running!");
//		System.out.println("hijacked method : " + joinPoint.getSignature().getName());
//		System.out.println("hijacked arguments : " + Arrays.toString(joinPoint.getArgs()));
//		
		System.out.println("Around before is running!");
		joinPoint.proceed();
		System.out.println("Around after is running!");
		
		System.out.println("******");

	}
}
