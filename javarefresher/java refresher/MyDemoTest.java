package com.marticus.train.generics;

public class MyDemoTest {

	public static void main(String args[])
	{
		DemoClass<String> d1 = new DemoClass<String>();
		d1.set("Jayanta");
		System.out.println(d1.get());
		
		DemoClass<Integer> d11 = new DemoClass<Integer>();
		d11.set(14);
		System.out.println(d11.get());
		
		DemoClass2<String,Integer> d12 = new DemoClass2<String,Integer>("Jayanta",12);
		
		
	}
	 
	
	
}
