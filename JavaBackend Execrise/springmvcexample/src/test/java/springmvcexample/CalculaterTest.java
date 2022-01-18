package springmvcexample;

import static org.junit.Assert.*;

import org.junit.After;
import org.junit.AfterClass;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;

import springmvc.utility.Calculator;

public class CalculaterTest {

	
	@Test
	public void testadd() {
		Calculator c= new Calculator();
				assertTrue(c.add(2,3)==5);
	}
	
	@Test
	public void testsub() {
		Calculator c= new Calculator();
				assertTrue(c.sub(2,3)==5);

}
}
