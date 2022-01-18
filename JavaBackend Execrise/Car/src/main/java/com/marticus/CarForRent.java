package com.marticus;

public class CarForRent 
{
	public CarRental cfn;

	public CarRental getCfn() 
	{
		return cfn;
	}

	public void setCfn(CarRental cfn) 
	{
		this.cfn = cfn;
	}
	public void rentCar()
	{
		cfn.showRent();
	}

}
