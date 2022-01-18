package com.marticus;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class SpringDependencyExample {

	public static void main(String[] args) {
		
		ApplicationContext appContext
			= new ClassPathXmlApplicationContext("classpath:applicationContext.xml");
		SingletonSolved s1= (SingletonSolved) appContext.getBean("singlenewsolved");
		
		 
		System.out.println(s1.getProtoBean());
		System.out.println(s1.getProtoBean());
//		SingletonNew s= (SingletonNew) appContext.getBean("singlenew");
//		System.out.println(s.getProtov());
//		System.out.println(s.getProtov());
//		Singleton s= (Singleton) appContext.getBean("single");
//		System.out.println(s.getPrototypeBean());
//		System.out.println(s.getPrototypeBean());
//		System.out.println(s.getPrototype());
//		System.out.println(s.getPrototype());
//		Geometry geometryBean1=(Geometry)appContext.getBean("geometry");
//		geometryBean1.drawShape();
//		System.out.println(geometryBean1);
//		
//		Geometry geometryBean11=(Geometry)appContext.getBean("geometry");
//		geometryBean11.drawShape();
//		System.out.println(geometryBean11);
//		
//		
		
//		
//		GeometryRect geometryBean1=(GeometryRect)appContext.getBean("geometry1");
//		geometryBean1.drawShape();
//		
//		System.out.println(geometryBean1);
//		
//		GeometryRect geometryBean11=(GeometryRect)appContext.getBean("geometry1");
//		geometryBean11.drawShape();
		
		//System.out.println(geometryBean11);
//		GeometryRect geometryRectBean=(GeometryRect)appContext.getBean("geometry1");
//		geometryRectBean.drawShape();
//		System.out.println(geometryRectBean);
//		
//		GeometryRect geometryRectBean11=(GeometryRect)appContext.getBean("geometry1");
//		System.out.println(geometryRectBean11);
//		
//		if(geometryRectBean!=geometryRectBean11)
//		{
//			System.out.println("Not same bean");
//			
//		}
		
		
		 
	}

}
