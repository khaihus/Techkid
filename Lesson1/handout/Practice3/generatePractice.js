'use strict'
//Search func: return index of target
function searchArr(input, target) {
  for (var i = 0; i < input.length; i++) {
    if (input[i] == target) {
      return i;
    }
  }
  return -1;
}

function generate(testLengthArray){
  var arrResult = [];
  
  var check,searchResult,target;
  for (var i = 0; i < testLengthArray.length; i++) {
    check = testLengthArray[i];
    
    var arrInput = [];
    //generate integer number randomly to new input array 
    for (var j = 0; j < check; j++) {
      arrInput.push(Math.floor((Math.random()*100)-100)); 
    }
    
    if (i == 1) {
      target = null;
    } else if (i == 2) {
      target = arrInput[0];
    } else if (i == 3) {
      target = arrInput[arrInput.length - 1];
    } else {
      target = Math.floor((Math.random()*100)-100);
    }
     
    searchResult = searchArr(arrInput, target);

    var object = {"input": arrInput, "target": target, "output": searchResult};
    arrResult.push(object);
  }
  return arrResult;
  // return Array.from({length : testLengthArray.length})
  //   .map(item => ({
  //     input: Array.from({length: item}).map(item => []),
  //     target: 0,
  //     output: -1
  //   })
  // ); // Remove this line and change to your own algorithm
}




module.exports = generate
