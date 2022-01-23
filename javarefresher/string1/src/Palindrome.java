import java.util.Scanner;

public class Palindrome {

	public static void main(String[] args) {
	
		static boolean isPalindromeA(String str)
	    {
	        
			int len=str.length();
			char arr[]=new char[len];
			int k=0;
			for(int j=len-1 ;j>=0;j--)
			{
				arr[k]=str.charAt(j);
				k++;
				
			}
			String str2=new String(arr);
			System.out.println(str2);
			if(str.equalsIgnoreCase(str2))
			{
				return true;
			}
			    	
	    	return false;
	    }
		
		 
	    static boolean isPalindrome(String str)
	    {
	    	//check if str is palindrome then return true else return false
	    	StringBuilder sb = new StringBuilder(str);
	    	String str2=sb.reverse().toString();
	    	
	    	if(str.equalsIgnoreCase(str))
	    	{
	    		return true;
	    	}
	    	
	    	return false;
	    }
	}
