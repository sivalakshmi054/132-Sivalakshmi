package com.howtodoinjava.demo.configuration;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.context.support.PropertySourcesPlaceholderConfigurer;

@Configuration
@PropertySource("classpath:foo.properties")
public class PropertyFileConfiguration {

	@Value( "${test.key}" )
	private String testProperty;

	public String getTestProperty() {
		return testProperty;
	}

	public void setTestProperty(String testProperty) {
		this.testProperty = testProperty;
	}
	
	
	@Bean
	public static PropertySourcesPlaceholderConfigurer propertyConfigInDev() {
		return new PropertySourcesPlaceholderConfigurer();
	}
	
}
