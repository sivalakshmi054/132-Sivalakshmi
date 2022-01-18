package com.marticus.employee.entity;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class RestData {
	
	private String activity;
	private String type;
	private int participants;
	private float price;
	private String link;
	private String key;
	private float accessibility;

//	private String name;
//	private int age;
//	private int count;
}

//{"name":"meelad","age":28,"count":21}
//{"activity":"Learn about the Golden Ratio",
//	"type":"education",
//	"participants":1,
//	"price":0.1,
//	"link":"https://en.wikipedia.org/wiki/Golden_ratio",
//	"key":"2095681",
//	"accessibility":0.2}