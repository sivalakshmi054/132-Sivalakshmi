package com.marticus.dao;

	import javax.persistence.Column;
	import javax.persistence.Entity;
	import javax.persistence.GeneratedValue;
	import javax.persistence.Id;
	import javax.persistence.Table;

	@Entity
	@Table(name = "COACHINGCENTER")
	public class CoachingCenter {

	private long ccId;
	private String ccType;
	private String ccName;

	public CoachingCenter() {
	}

	public CoachingCenter(String ccType, String ccName) {
	this.ccType = ccType;
	this.ccName = ccName;
	}

	@Id
	@GeneratedValue
	@Column(name = "CC_ID")
	public long getccId() {
	return this.ccId;
	}

	public void setccId(long ccId) {
	this.ccId = ccId;
	}

	@Column(name = "CC_TYPE", nullable = false, length=10)
	public String getccType() {
	return this.ccType;
	}

	public void setccType(String ccType) {
	this.ccType = ccType;
	}

	@Column(name = "CC_NAME", nullable = false, length=15)
	public String getccName() {
	return this.ccName;
	}

	public void setccName(String ccName) {
	this.ccName = ccName;
	}

	}
	


