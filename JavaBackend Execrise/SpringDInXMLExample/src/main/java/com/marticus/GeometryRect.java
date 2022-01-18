package com.marticus;

public class GeometryRect {

	 private Shape shape;

	public Shape getShape() {
		return shape;
	}

	public void setShape(Shape shape) {
		this.shape = shape;
	}
	
	 public void drawShape() {
	      shape.draw();
	   }
	
}
