// Return 'yes' if the sentence contains only unique characters, 'no' otherwise
function allUniqueCharacters(sentence) {
  	var combine = sentence.split(" ").join("");
  	for (var i = 0; i < combine.length; i++) {
  		for (var j = i + 1; j < combine.length; j++) {
  			if (combine[i] === combine[j]) {
  				return "no";
  			} else {
  				continue;
  			}
  		}
	}
	return "yes";
}

// One number 1-10 is missing. Return it!
function missingNum(numbers) {
	for (var i = 1; i <= 10; i++) {
		if (numbers.includes(i)) {
			continue;
		} else {
			return i;
		}
	}
}

// Return 'yes' if array1 and array2 are rotated versions of each other, 'no' otherwise
// e.g. [1,2,3,6,7,8] and [3,6,7,8,1,2] are rotated versions of each other
function areRotatedVersions(array1, array2) {
	var temp = array1.concat(array1);
	var combine = temp.join();
	var compare = array2.join();
	if (combine.includes(compare)) {
		return "yes";
	} else {
		return "no";
	}
}

// Return a string of the first n prime numbers, separated by commas
// e.g. "1,2,3,4"
function nPrimeNums(n) {
	// Assuming that n is >= 2
	var primes = [];
	var test = 1;
	while (primes.length < n) {
		if (isPrime(test)) {
			primes.push(test);
		}
		test++;
	}
	return primes.join(",");
}

var isPrime = function (number) {
	if (number === 1) {
		return false;
	} else if (number === 2) {
		return true;
	} else {
		for (var i = 2; i < number; i++) {
			if (number % i === 0) {
				return false;
			}
		}
		return true;
	}
}

// Return the output of running the function f twice
// e.g. doitTwice(function f() {return 1;}) === 2
function doItTwice(f) {
	var once = f();
	var twice = f();
	var result = once + twice;
	return result;
}

// Return an object that has the properties: first name, last name, age, email, and favorite color
function objectFun(first, last, age, email, color) {
	var person = new Object();
	person.first_name = first;
	person.last_name = last;
	person.age = age;
	person.email = email;
	person.fav_color = color;
	return person;
}

// Return the number of "children" obj has
function numChildren(obj) {
	return obj.children.length;
}

function greeting(name) {
	return "Hello, " + name + "!";
}

// Say hello! This function takes a function as a parameter (greet should be a function)
function sayHello(first, last, greet) {
	return greet(first + " " + last);
}