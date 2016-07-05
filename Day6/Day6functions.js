function average(numbers_list) {
    var sum = 0;
    for (var i = 0; i < numbers_list.length; i++) {
        sum += numbers_list[i];
    }
    var average = sum / numbers_list.length;
    return average;
}

function assignGrade(grade) {
    if (grade < 60) {
        return 'F';
    } else if (grade < 70) {
        return 'D';
    } else if(grade < 80) {
        return 'C';
    } else if(grade < 90) {
        return 'B';
    } else if(grade > 90) {
        return 'A';
    }
}

function pluralize(num, noun) {
    if(num > 1) {
        return num + " " + noun + "s";
    } else {
        return num + " " + noun;
    }
}

function longestWord(sentence) {
    var splitSentence = sentence.split(" ");
    var currLongestWord = " ";
    var currLongestLength = currLongestWord.length;
    for (var i = 0; i < splitSentence.length; i++) {
        var tempLength = splitSentence[i].length;
        if(tempLength > currLongestLength) {
            currLongestLength = tempLength;
            currLongestWord = splitSentence[i];
        }
    }
    return currLongestWord;
}

function palindrome(word) {
    var reverse = "";
    for (var i = word.length - 1; i >= 0; i--) {
        reverse = reverse + word.charAt(i);
    }

    if (word === reverse) {
        return "yes";
    } else {
        return "no";
    }
}

function letterCounter(phrase, letter) {
    var currCount = 0;
    for(var i = 0; i < phrase.length; i++) {
        if(phrase[i] === letter) {
            currCount++;
        }
    }
    return currCount;
}

function longestPalindrome(sentence) {
    var longest = longestWord(sentence);
    if (palindrome(longest) === "yes") {
        return longest + " is a palindrome";
    } else {
        return longest + " is not a palindrome";
    }
}

function areAnagrams (sentence1, sentence2) {
    var split1 = sentence1.split(" ");
    var word1 = "";
    for (var i = 0; i < split1.length; i++) {
        word1 = word1 + split1[i];
    }

    var split2 = sentence2.split(" ");
    var word2 = "";
    for (var i = 0; i < split2.length; i++) {
        word2 = word2 + split2[i];
    }

    if (word1.length !== word2.length) {
        return "no";
    } else {
        for (var i = 0; i < word2.length; i++) {
            if (letterCounter(word2, word2.charAt[i]) === letterCounter(word1, word2.charAt[i])) {
                return "yes";
                continue;
            } else {
                return "no";
                break;
            }
        }
    }
}