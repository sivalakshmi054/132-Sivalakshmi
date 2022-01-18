package com.marticus;

public class MyBean {
	
	SampleBean sampleBean;

	public SampleBean getSampleBean() {
		return sampleBean;
	}

	public void setSampleBean(SampleBean sampleBean) {
		this.sampleBean = sampleBean;
	}
	
	public void showBean()
	{
		sampleBean.binHello();
		
	}
	

}
