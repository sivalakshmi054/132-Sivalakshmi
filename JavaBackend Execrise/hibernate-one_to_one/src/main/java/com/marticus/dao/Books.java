
	package com.marticus.dao;

	import javax.persistence.Column;
	import javax.persistence.Entity;
	import javax.persistence.GeneratedValue;
	import javax.persistence.Id;

	@Entity
	public class Books {

		private long bookId;
		private String bookName;
		
		@Id
		@GeneratedValue
		@Column(name = "BOOK_ID")
		public long getBookId() {
			return bookId;
		}
		public Books(String bookName) {
			 this.bookName=bookName;
		}
		public void setBookId(long bookId) {
			this.bookId = bookId;
		}
		
		@Column(name = "BOOK_NAME", nullable = false, length = 100)
		public String getBookName() {
			return bookName;
		}
		public void setBookName(String bookName) {
			this.bookName = bookName;
		}
		
			
	}



