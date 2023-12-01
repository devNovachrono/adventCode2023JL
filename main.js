import { calDoc } from './calibrationDoc.js';

let digitNames = [
    "zero",
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine"
]

let calDocArr = calDoc.split("\n");

function getDigits(str) {
    var allMatches = [];
    for (var i = 1; i < digitNames.length; i++)
    {
        let digitName = digitNames[i];
        let charMatches = str.matchAll(new RegExp("(" + digitName + "|" + i + ")", 'g'));
        for (var match of charMatches)
        {
            
            allMatches[match["index"]] = i + "";
        }
    }
    return allMatches.filter(function (e) {
        return e != null;
    });
}

function getCalculation()
{
    var result = 0;
    calDocArr.forEach(element => {
        let digits = getDigits(element);
        let firstNum = digits[0];
        let lastNum = digits[digits.length - 1];
        result += parseInt(firstNum + lastNum);
    });
    return result;
}

var day1 = getCalculation();
console.log("Day 1: " + day1);