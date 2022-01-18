package com.marticus;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

@Component("Third")
@Scope("prototype")
public class Third 
{

		public void sayHello()
		{
			
			System.out.println("Saying Hello from Third!!!");
			
		}
		
	}



