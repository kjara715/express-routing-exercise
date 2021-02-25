const express = require('express');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

function mean(string){
    let numArray = string.split(",")
    let sum = 0;
    for(let num of numArray){
        num=parseInt(num)
        sum += num
    }
    
    let mean = sum / numArray.length
    return mean    
}


function mode(string) {
    let frequency = {}; // array of frequency.
    let maxFreq = 0; // holds the max frequency.
    let modes = [];
    let numArray = string.split(",")
  
    for (let i in numArray) {
      frequency[numArray[i]] = (frequency[numArray[i]] || 0) + 1; // increment frequency.
  
      if (frequency[numArray[i]] > maxFreq) { // is this frequency > max so far ?
        maxFreq = frequency[numArray[i]]; // update max.
      }
    }
  
    for (let i in frequency) {
      if (frequency[i] == maxFreq) {
        modes.push(i);
      }
    }
  
    return modes;
  }

//   function median(string) {

//     let numArray = string.split(",")

//     numArray.sort( function(a,b) {return a - b;} );

//     let half = Math.floor(numArray.length/2);

//     if(numArray.length % 2)
//         return numArray[half];
//     else
//         return (numArray[half-1] + numArray[half]) / 2.0;
// }


function median(string) {
    let numArray = string.split(",")
    const mid = Math.floor(numArray.length / 2),
    nums = [...numArray].sort((a, b) => a - b);
    return numArray.length % 2 !== 0 ? parseInt(nums[mid]) : (parseInt(nums[mid - 1]) + parseInt(nums[mid])) / 2;
  };

app.get('/mean', function(req, res) {
    console.log(req.query)
    console.log(req.query.nums)
    let avg = mean(req.query.nums)
    // res.send("The mean is:"  + mean(req.query.nums))

    return res.json({
        operation: "mean",
        value: avg
    })
    // return res.status(404).json('Whoops! Nothing here!');
  });

app.get('/median', function(req, res) {


    let med= median(req.query.nums)
    // res.send("The mean is:"  + mean(req.query.nums))

    return res.json({
        operation: "median",
        value: med
    })
  });
  
  /** Sample of validating / error handling */
  
app.get('/mode', function(req, res) {

    let result=mode(req.query.nums)

    return res.json({
        operation: "mode",
        value: result
    })

});
  
  /** Start server on port 3000 */
  
app.listen(3000, function() {
    console.log('Server started on port 3000.');
  });