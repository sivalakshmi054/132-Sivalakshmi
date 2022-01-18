package com.marticus;

public class SingletonNew {

	private ProtoNew protov;

	public ProtoNew getProtov() {
		return protov;
	}

	public void setProtov(ProtoNew protov) {
		this.protov = protov;
	}

	public SingletonNew() {
		System.out.println("Inside Singleton New");
	}
	
	
	
}
