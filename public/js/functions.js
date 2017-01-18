//writing the class needed in test-functions.js
"use strict";
class Functions {
    getRandomNumber(){
        return new Promise(
            (resolve) => {
                resolve(Math.round(Math.random() * 7));
            }
        )
    }

    returnMyName(name) {
        return new Promise(
            (resolve) => {
                resolve(name);
            }
        )
    }

    truthyFunction() {
        return "truth";
    }

    diffBetweenNumbers(num1, num2) {
        return new Promise (
            (resolve) => {
                resolve(num1-num2);
            }
        )
    }

    compareNumbers(num1,num2) {
        if(num1>num2){
            return num1;
        } else {
            return num2;
        }
    }

    searchForTheNeedle(array1,numnToBeFound) {
        for(let i=0; i<array1.length; i++){
            if(array1[i]==numnToBeFound){
                return "num was found";
            }
        }
    }

    isAnObject(objToBeChecked){ 
        return objToBeChecked;
    }
}

//this exports the class to whichever file it needs it
module.exports = Functions;