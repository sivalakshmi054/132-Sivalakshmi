package com.marticus;

public abstract class Singleton {

	//private Prototype prototype;
	public abstract Prototype getPrototypeBean();     
	public Singleton()
    {
        System.out.println("Singleton Bean Instantiated !!");
    }
//	public Prototype getPrototype() {
//		return prototype;
//	}
//
//	public void setPrototype(Prototype prototype) {
//		this.prototype = prototype;
//	}
	
	
	
}
