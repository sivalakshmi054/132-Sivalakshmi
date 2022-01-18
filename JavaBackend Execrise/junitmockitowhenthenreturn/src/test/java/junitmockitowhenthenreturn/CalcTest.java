package junitmockitowhenthenreturn;

import static org.junit.Assert.*;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;
import static org.junit.Assert.*;
import java.util.Arrays;

import org.junit.After;
import org.junit.AfterClass;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.junit.MockitoJUnitRunner;
@RunWith(MockitoJUnitRunner.class)
public class CalcTest {
	
	static Calculator mockCalcObject;
	static int a,b;
	
	 
	@BeforeClass
	public static void init() {
//		a=3;
//		b=2;
		 
		// set EmployeeDAO mock object
		mockCalcObject = mock(Calculator.class);
		
		//when(mockCalcObject.addAges(19,1)).thenReturn(20);
		
		 
	}
 
	 
	@Test
	public void addTest() {
		a=19;
		b=2;
				
//		assertSame(b1, b2);
//		assertSame(mockCalcObject.add(a, b)==5);
		assertEquals(mockCalcObject.add(a, b),20);
		
	}
	 
	
	
	}
	
	 
 
