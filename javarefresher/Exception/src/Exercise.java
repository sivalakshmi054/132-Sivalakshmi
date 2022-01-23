

	public class Exercise {

		
		
	private static void InvalidCarModel(String string) {
				// TODO Auto-generated method stubtr
		try {
			validateCar("benz");
		
	
	
				
			}
	public static void validateCar(String CarName) throws InvalidCarModelException
	{
		
		if(CarName!="Innova")
		{
				throw new InvalidCarModelException("Invalid Car-"+CarName);
		}
		else
		{
			System.out.println("Car is Valid");
			
		}
		
	




		

	}

}
