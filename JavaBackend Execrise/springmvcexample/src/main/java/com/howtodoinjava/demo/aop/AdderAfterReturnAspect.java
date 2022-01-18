package com.howtodoinjava.demo.aop;

public class AdderAfterReturnAspect {

	 public void afterReturn(Object returnValue) throws Throwable {
	        System.out.println("value return was "+  returnValue);
	    }
}
