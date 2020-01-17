//This file is being used to demonstrate exporting things from files. By default,
//each file is an island, and all things defined in them is "private" (ie othe files
//cannot access it). At the bottom we will show how to make things "public".

//Here we are declaring an ES6 Polygon class. The polygon has a height and width, and
//a constructor for setting both of them.
class Polygon {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }
};


//Unline myData.js, we will only ever want to export one thing from this file (the polygon
//class). Instead of creating an object that CONTAINS the Polygon class, we can instead just
//make the module.exports object EQUAL to the Polygon class.
module.exports = Polygon;