package springmvcexample;

import static org.junit.Assert.*;

import org.junit.After;
import org.junit.AfterClass;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;

public class SampleTest {

	@BeforeClass
	public static void setUpBeforeClass() throws Exception 
	{
		System.out.println("In before test class");
	}

	@AfterClass
	public static void tearDownAfterClass() throws Exception 
	{
		System.out.println("After test class");
	}

	@Before
	public void setUp() throws Exception 
	{
		System.out.println("In before annotation");
	}

	@After
	public void tearDown() throws Exception 
	{
		System.out.println("In after annotation");
	}

	@Test
	public void test() 
	{
		System.out.println("In the test class");
		fail("Not yet implemented");
	}
	
	


}
