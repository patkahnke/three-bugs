// ! ! !
// Three Bugs

//Individual arrays storing each employee's name, number, salary, and rating
var arrayAtticus = ["Atticus", "2405", "47000", 3];
var arrayJem = ["Jem", "62347", "63500", 4];
var arrayBoo = ["Boo", "11435", "54000", 3];
var arrayScout = ["Scout", "6243", "74750", 5];

//Array of arrays storing all of the employees together
var array = [arrayAtticus, arrayJem, arrayBoo, arrayScout];
console.log(array); //Console.log, on first run-through, shows that only the
//Atticus array has been populated correctly. Rest of the arrays are showing NaN.
// First step in debugging, checking to see how the array was populated.
//It appears that it's populated by the for loop, looping through the "calculateSTI"
//function. But I think the function has the wrong array passed into it. It should receive array[i].
//YES!!! That fixed it.

//Create variables used to write to the DOM
var newEl, newText, position; //This looks weird to me...checking to see if it's OK

//Testing to make sure those variables are capable of holding stuff. Test showed
//that they are (they displayed zeros when asked to), so they must be ok. But at
//this point in the page they are undefined.
//newEl = 0;
//newText = 0;
//position = 0;
//console.log(newEl, newText, position);

//Capture the position of insertion into the DOM
position = document.getElementById('content');//Why 'content'? Looking into that...
//Looked at the html page, and I "suppose" it makes sense. Read about how
//getElementById works, and this looks like it's choosing which element to insert
//some stuff into. Good enough. It looks like it's only used for writing things to the DOM.

//Loop the array, extracting each array and writing information to the DOM
//Note that the information is not 'clean'
for(var i = 0; i < array.length; i++){
	array[i] = calculateSTI(array[i]);
 	newEl = document.createElement('li');//Per Antoinette's instructions, assuming
  //that these four lines are correct. They do appear to be properly displaying the
  //contents of the arrays on the page.
	newText = document.createTextNode(array[i]);
	newEl.appendChild(newText);
	position.appendChild(newEl);
}

//It appears that this function takes in an individual employee array and returns a
//new array. The first indix(zero) is the name, then the bonus, then the new base salary
//including bonus, then the base salary TIMES the bonus.
//I'm curious why we would need baseSalary * bonus. I'll follow up on that.
//OK - baseSalary * bonus makes sense
function calculateSTI(array){
  var newArray = []; //initialize a new array to hold the data, which will be
  //returned to "array"

  newArray[0] = array[0];

  var employeeNumber = array[1];//These references all check out
  var baseSalary = array[2];
  var reviewScore = array[3];
  //Hmmm... on the line below, the math will be base STI + year adjustment + income adjustment.
  //That seems shady. I'll check it out with console.logs.
  //Now that I fixed the getBaseSTI function, it seems like this is working, assuming
  //that .05 for a getYearAdjustment is correct.
  var bonus = getBaseSTI(reviewScore) + getYearAdjustment(employeeNumber) - getIncomeAdjustment(baseSalary);
  //console.log('bonus: ' + bonus);
  //console.log('STI: ' + getBaseSTI(reviewScore));
  //console.log('Year adjustment: ' + getYearAdjustment(employeeNumber));
  //console.log('income adjust: ' + getIncomeAdjustment(baseSalary));
  if(bonus > 0.13){
    bonus = 0.13;
  }

  //Math.round gets rid of the decimal points.
  newArray[1] = bonus;
  newArray[2] = Math.round(baseSalary * (1.0 + bonus));
  newArray[3] = Math.round(baseSalary * bonus);
  console.log(newArray[0] + " " + newArray[1] + " " + newArray[2] + " " + newArray[3]);
  return newArray;
}

function getBaseSTI(reviewScore){//The logic seems fine on this - it receives reviewScore
  //from the calling of the function when the var "bonus" is created
  var basePercent;
  switch(reviewScore){
    case 1:
      basePercent = 0;
      break;
    case 2:
      basePercent = 0;
      break;
    case 3:
      basePercent = 0.04;
      break;
    case 4:
      basePercent = 0.06;
      break;
    case 5:
      basePercent = 0.10;
      break;
  }
  return basePercent; //(basePercent - 1) I'll check to see if this is the right approach
  //It's not right - it yields a negative value. I'll experiment with just using
  //the basePercent straight up and adjusting the other math. That worked - at least
  //the console.logs look reasonable for STI. I'll still check the rest of the math.
}

function getYearAdjustment(employeeNumber){//This looks right, if the employee
  //adjustment really is 5%
  var yearAdjustment = 0;
  if(employeeNumber.length == 4){
    yearAdjustment = 0.05;
  }
  return yearAdjustment;
}

function getIncomeAdjustment(salary){//This looks right, but it's not returning a value
//according to the console.logs.
  var incomeAdjustment = 0;
  salary = parseInt(salary);
  if(salary > 65000){
    incomeAdjustment = 0.01;
  }
  //console.log('income adjust inside function: ' + incomeAdjustment)//OK, it's
  //working here, so why is that not transferring?
  //ACK!!! I just had my console.log set up wrong :(
  return incomeAdjustment;
}
