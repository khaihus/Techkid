'use strict'

function search(input, target) {
  for(let i = 0; i<input.length;i++){
    if(input[i] == target){
      return i;
    }
  }
  return -1;
}

module.exports = search
