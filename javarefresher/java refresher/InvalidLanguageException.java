package com.marticus.train.exception;

public class InvalidLanguageException extends Exception {

	public InvalidLanguageException(String str)
	{
		super(str);
		
	}
	
	
}
// create a custom exception class called InvalidCarModelException
// Create  a TestClass having main method and validateCarModel method accepting string
//inside validateCarModel check if the string passed is Volvo then OK else
// throw InvalidCarModelException call this validateCarModel from main