package com.collections;

import java.util.HashMap;

public class Hashmap {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		HashMap<Integer,String>student=new HashMap<>();
		student.put(21,"sam");
		student.put(23,"tom");
		student.put(24,"lilly");
		student.put(21,"dicy");
		if(student.containsKey("tom"))
		{
		System.out.println("21");
		}
		
	}
}

	


