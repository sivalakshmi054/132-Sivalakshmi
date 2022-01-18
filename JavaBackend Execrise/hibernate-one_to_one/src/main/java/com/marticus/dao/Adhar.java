package com.marticus.dao;

	import javax.persistence.Column;
	import javax.persistence.Entity;
	import javax.persistence.GeneratedValue;
	import javax.persistence.Id;
	import javax.persistence.Table;

	@Entity
	@Table(name = "ADHAR")
	public class Adhar 
	{

		private long adharId;
		private String adharnumber;

		public Adhar(String adharnumber) 
		{
			this.adharnumber=adharnumber;
		}

		@Id
		@GeneratedValue
		@Column(name = "ADHAR_ID")
		public long getAdharId() {
			return this.adharId;
		}

		public void setAdharId(long adharId) {
			this.adharId = adharId;
		}
		
		@Column(name = "ADHAR_NUMBER", nullable = false, length=250)
		public String getadharnumber() {
			return this.adharnumber=adharnumber;
		}

		public void setAdharNumber(String AdharNumber) {
			this.adharnumber = adharnumber;
		}

		
		

	}


