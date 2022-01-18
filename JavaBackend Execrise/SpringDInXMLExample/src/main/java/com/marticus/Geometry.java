package com.marticus;

public class Geometry {
	
	 private Shape shape;
	 
	 
	 public Geometry(Shape shape) {
	      this.shape = shape;
	   }

	   public void drawShape() {
	      shape.draw();
	   }

}
