package com.martricus.collections;

import java.util.ArrayList;

public class ArrayListNew {

	public static void main(String args[])
	{ 
		ArrayList <User> uList= new ArrayList<User>();
		
		User u= new User("Jayanta",21);
		User u1= new User("Amit",22);
		User u3= new User("Sadhna",25);
		
		uList.add(u);
		uList.add(u1);
		uList.add(u3);
		
//	   for(User u11: uList)
//	   {
//		   System.out.println("Name="+u11.getName());
//		   System.out.println("Age="+u11.getAge());
//		   
//	   }
		
	   ArrayList <User> uListNew= new ArrayList<User>();
		
	    User u21= new User("Jayanta New",21);
		User u22= new User("Amit New",22);
		User u23= new User("Sadhna New",25);
		uListNew.add(u21);
		uListNew.add(u22);
		uListNew.add(u23);
		
		uList.addAll(uListNew);
		
			for(User u11: uList)
		   {
			   System.out.println("Name="+u11.getName());
			   System.out.println("Age="+u11.getAge());
			   
		   }
			
	}
}
