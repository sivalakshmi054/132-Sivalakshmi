
	package com.marticus.dao;

	import java.util.HashSet;
	import java.util.Set;

	import javax.persistence.CascadeType;
	import javax.persistence.Column;
	import javax.persistence.Entity;
	import javax.persistence.FetchType;
	import javax.persistence.GeneratedValue;
	import javax.persistence.Id;
	import javax.persistence.JoinColumn;
	import javax.persistence.JoinTable;
	import javax.persistence.ManyToMany;
	import javax.persistence.OneToMany;
	import javax.persistence.Table;

	import org.hibernate.annotations.Fetch;

	@Entity
	@Table(name = "STUDENT")
	public class Student3 {

		private long studentId;
		private String studentName;
		private Set<Course> courses = new HashSet<Course>(0);

		public Student3() {
		}

		public Student3(String studentName) {
			this.studentName = studentName;
		}

		public Student3(String studentName, Set<Course> courses) {
			this.studentName = studentName;
			this.courses = courses;
		}

		@Id
		@GeneratedValue
		@Column(name = "STUDENT_ID")
		 
		public long getStudentId() {
			return this.studentId;
		}

		public void setStudentId(long studentId) {
			this.studentId = studentId;
		}

		@Column(name = "STUDENT_NAME", nullable = false, length = 100)
		public String getStudentName() {
			return this.studentName;
		}

		public void setStudentName(String studentName) {
			this.studentName = studentName;
		}

		@ManyToMany(cascade = CascadeType.ALL,fetch = FetchType.EAGER)
		@JoinTable(name = "STUDENT_COURSE", joinColumns = { @JoinColumn(name = "STUDENT_ID") }, inverseJoinColumns = { @JoinColumn(name = "COURSE_ID") })
		public Set<Course> getCourses() {
			return this.courses;
		}

		public void setCourses(Set<Course> courses) {
			this.courses = courses;
		}

	}


