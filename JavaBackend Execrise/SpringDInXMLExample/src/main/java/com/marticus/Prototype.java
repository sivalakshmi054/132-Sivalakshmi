package com.marticus;

public class Prototype {

	private String message;

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}
	
	 public Prototype getPrototypeBean()
     {
            return this;
     }
	
	
}
