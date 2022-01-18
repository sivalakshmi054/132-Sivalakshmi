package com.javabydeveloper.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Table(name="Teacher")
@Entity(name = "tech")
public class Teacher {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	 
	@Column(name = "TID")
	private Long teacherId;

	@Column(name = "TNAME")
	private String TeachertName;

	@Column(name = "TSUBJECT")
	private String subject;

	@Column(name = "TDEGREE")
	private String degree;
	


	public Long getTeacherId() {
		return teacherId;
	}



	public void setTeacherId(Long teacherId) {
		this.teacherId = teacherId;
	}



	public String getTeachertName() {
		return TeachertName;
	}



	public void setTeachertName(String teachertName) {
		TeachertName = teachertName;
	}



	public String getSubject() {
		return subject;
	}



	public void setSubject(String subject) {
		this.subject = subject;
	}



	public String getDegree() {
		return degree;
	}



	public void setDegree(String degree) {
		this.degree = degree;
	}



	@Override
	public String toString() {
		return "Teacher [teacherId=" + teacherId + ", TeachertName=" + TeachertName + ", subject=" + subject
				+ ", degree=" + degree + "]";
	}
	
}

