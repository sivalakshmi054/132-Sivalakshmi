package com.martricus.collections;

import java.util.Iterator;
import java.util.LinkedList;
import java.util.Queue;

public class QTest {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		
		Queue <String> bnkCustomers = new LinkedList<>();
		bnkCustomers.add("Cust1");
		bnkCustomers.add("Cust2");
		bnkCustomers.add("Cust3");
		bnkCustomers.add("Cust4");
		
	
		bnkCustomers.remove();
		bnkCustomers.remove();
		bnkCustomers.poll();
		bnkCustomers.poll();
		if(!bnkCustomers.isEmpty())
		{
			System.out.println(bnkCustomers.remove());
		}
		
		Iterator<String> it = bnkCustomers.iterator();
		while (it.hasNext())
		{
			System.out.println(it.next());
			
		}
		

	}

}
