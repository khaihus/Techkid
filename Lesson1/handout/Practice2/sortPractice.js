'use strict'

function sort(input) {
  var temp;
  var j;
  

  for (var i = 1; i < input.length; i++) {
    temp = input[i];
    j = i;
    while (j > 0 && input[j - 1] > temp) {
        input[j] = input[j - 1];
        j--;
    }
    input[j] = temp;
}
  return input 
}

module.exports = sort
