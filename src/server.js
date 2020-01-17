//These two lines are importing the data exported by "module.exports" at the bottom of
//their respective files. I recommend reading through those two files before reading
//through this one.
const myData = require('./myData.js');
const Polygon = require('./Polygon.js');

//If our "require" statement attempts to load something that is not a file path, it will
//look in two places. The first is the "node modules" folder. This is where all external
//libraries installed by npm are stored. This is the case for the "underscore" library.
//The other place it will look is the built in libraries that come with node. This is
//where the "http" library comes from.
const _ = require('underscore');
const http = require('http');

//We can define a function using the ES6 arrow function syntax. Older syntax will work as
//well, but is not recommended. Here we are declaring a function called helloWorld, with no
//parameters.
const helloWorld = () => {
  //Console.log will print to our powershell window, since that is our "console". Remember,
  //this is not running in the browser so we cannot access it through the browsers console.
  console.log('Hello World');
};

//We can call that function as we normally would.
helloWorld();

//The getMessage function, however, exists in the myData file. Since that file exports it
//in it's module.exports, we have access to it. Line 4 in this file imports all the exported
//content from myData.js, and stores it in a variable called myData. We can access the function
//through that variable.
myData.getMessage();

//Similar to myData, the Polygon class is defined in the Polygon.js file and is imported into
//this file on line 5. Since the entirety of module.exports from ./Polygon.js is equal to the
//polygon class, we can use the Polygon variable as the class in this file to construct new polygons.
const myPoly = new Polygon(10, 15);
console.dir(myPoly.height);


//There is some basic functionality that many languages have that JavaScript still lacks. One of
//those is the built in ability to determine if an array contains a specific element. We could
//program it ourselves, but some things are very time consuming to do and have often been solved
//many times before. This is where npm comes in. The node package manager allows us to easily
//install and use packages from npmjs.org. In this case, we have installed the underscore library
//by using 'npm install underscore' in powershell. We have also imported the library to this file
//on line 12. We can use it's "contains" function to determine if myArray contains the number 3.
const myArray = [1, 2, 3, 4, 5];
const found = _.contains(myArray, 3);
console.log(found);


//Now that we have done some work investigating how node works at a basic "programming" level, we
//can start using it to build web servers. Thanks to the http library (imported to this file on
//line 13), this is very straightforward.

//First thing we need is a port in which our server can run. A port is essentially a mailbox where
//a program can send and recieve internet traffic. The following line will first check to see if
//the PORT or NODE_PORT environment variables have been set. If they have not, we will instead use
//port 3000. The PORT and NODE_PORT environment variables will be filled out by heroku if we deploy
//our server there. Port 3000 is the standard "development" port.
const port = process.env.PORT || process.env.NODE_PORT || 3000;

//At it's core, node is an event driven system. A main process runs, waiting for events to fire. When
//an event fires, it will use a thread pool to handle that event. For our basic server, we need a
//function that will get called any time a request comes in to our server. This function, called
//onRequest, will act as our "event handler" for those requests. The node http library defines a
//request handler as accepting a request and response object. These are prebuilt objects given to us
//by the http library. The request contains all the data from the users request to our server. The
//response object is our "interface" for sending data back to the user. Once response.end() has been
//called we can no longer write to or use this response object. The http standard enforces that only
//one response can ever be sent for a single request.
const onRequest = (request, response) => {
  
  //Once we have a request, we can investigate what the user is asking for. This basic demo just shows
  //that we can check the url to see what the user wants. In this case, we are checking for the favicon
  //request. The favicon is the small icon that goes in the web browser tab on a website. Most browsers
  //automatically make this request when you open a page.
  if(request.url === '/favicon.ico') {
    console.log('favicon request');
  }
  
  //For any response that comes into my server, I simply want to send back plain text. Normally this
  //would not be the case (most web servers send back html, css, javascript, media files, etc) but
  //for simplicity, no matter what url our user goes to, we will send them plain text.
  
  //The first thing I have to do to my response is set up the "meta data". This is data the browser
  //will use, but that the user will not see. The writeHead function takes two parameters. The first
  //is the http status code. There are a number of these (200 = success, 404 = not found, etc). The
  //second parameter is an object of all "headers" we want to set. Headers are just specifically
  //formatted meta data. In this case, we are setting the "content-type" header (which tells the
  //browser how to interpret the data it recieves from us) to "text/plain" which is the MIME type for
  //plain text.
  response.writeHead(200, {'Content-Type': 'text/plain'});
  
  //We told the browser that we would send it plain text, so we want to write some text to the response
  //body. In this case, we can write the text "Hey there". This is the text that the browser will then
  //display to the user.
  response.write("Hey there");
  
  //Finally when we are finished filling out our response, we can tell node that we are done with it,
  //and that it can send it back to the user. Once we call response.end(), we can no longer edit or
  //send responses to the user for this request. We are done.
  response.end();
}


//Once we have that onrequest function setup, and we have a port for our server to run on, we can
//have the http library create an http server that uses that information. This line will start up
//an http server that checks the port number defined in the port variable for requests. When a request
//shows up (ie someone goes to localhost:3000, or connects to our heroku app), it will get sent into
//the onRequest function to be handled.
http.createServer(onRequest).listen(port);


//At this point we have written all the code for our very basic http server. If you open powershell,
//run 'npm install', then 'npm start', and then navigate to 'localhost:3000' in your web browser, you
//should see "Hey there" displayed in the browser.