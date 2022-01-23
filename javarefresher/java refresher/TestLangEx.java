tpackage com.marticus.train.exception;

public class TestLangEx {

	public static void main(String[] args)   {
		// TODO Auto-generated method stub
		try {
		validateLanguage("C++");
		}
		catch(InvalidLanguageException ex)
		{
			
			ex.printStackTrace();
		}
		

	}
	
	public static void validateLanguage(String langName) throws InvalidLanguageException
	{
		
		if(langName!="Java")
		{
				throw new InvalidLanguageException("Invalid Language-"+langName);
		}
		else
		{
			System.out.println("Language is Valid");
			
		}
		
	}

}
