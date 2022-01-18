package com.marticus.dao;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name = "STUDENT2")
public class Student2 {

private long studentId;
private String studentName;
private Set<CoachingCenter> studentccName = new HashSet<CoachingCenter>(0);

public Student2() {
}

public Student2(String studentName, Set<CoachingCenter> studentccName) {
this.studentName = studentName;
this.studentccName = studentccName;
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

@OneToMany(cascade = CascadeType.ALL)
@JoinTable(name = "STUDENT_CENTER", joinColumns = { @JoinColumn(name = "STUDENT_ID") }, inverseJoinColumns = { @JoinColumn(name = "CC_ID") })
public Set<CoachingCenter> getStudentccName() {
return this.studentccName;
}

public void setStudentccName(Set<CoachingCenter> studentccName) {
this.studentccName = studentccName;
}

}
