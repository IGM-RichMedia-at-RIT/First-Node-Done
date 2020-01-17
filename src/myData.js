//This file is being used to demonstrate exporting things from files. By default,
//each file is an island, and all things defined in them is "private" (ie othe files
//cannot access it). At the bottom we will show how to make things "public".

//First we create a message, and then create a function that can print that message
//out. Remember, by default this function is "private".
const message = 'hello other file';

const getMessage = () => {
  console.log(message);
  return message;
}

//To make the "getMessage" function "public", we need to export it from the file.
//module.exports is an object that we define. When another file uses require() to
//load in a file, the require() function will return the object stored in module.exports.
//This is why our myData variable in server.js contains a function called getMessage.
module.exports = {
  getMessage
}