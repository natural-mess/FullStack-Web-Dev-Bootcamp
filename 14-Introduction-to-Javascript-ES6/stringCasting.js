var myName = prompt("What is your name?");
var firstChar = myName.slice(0,1).toUpperCase();
alert(firstChar + myName.slice(1,myName.length).toLowerCase());