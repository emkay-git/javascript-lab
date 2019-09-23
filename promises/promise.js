/**
 * resolve and reject are callbacks.
 */
const myFirstPromise = new Promise(
    /**
     * this is function is called executor. 
     * it takes two callbacks, resolve for
     * success and reject for errors.
     */
    (resolve, reject) => { resolve(10); }
);



myFirstPromise.then((data) => console.log(data));

console.log(myFirstPromise);

/**
 * delayed promise
 */
const delayedPromise = new Promise((resolve, reject) => {
    setTimeout(() => resolve('1s over!!'), 1000);
});

delayedPromise.then((data) => console.log(data));


/**
 * multiple subscribers to promise
 */

delayedPromise.then((data) => console.log('2nd subscriber -> ', data));



/**
 * then, catch and finally
 * then -> to catch resolved data or catch rejected data
 * catch -> to catch rejected data
 * finally -> always run
 */

const resolvedPromise = new Promise((resolve, reject) => {
    setTimeout(() => resolve('I am resolve'), 1000);
});


resolvedPromise
    .then((data) => console.log(data))
    .finally(() => console.log('finally executed!!!'));



const rejectedPromise = new Promise((resolve, reject) => {
    reject('You are rejected');
});


rejectedPromise.then(
    (data) => console.log("I am not printed", data),
    (rejectData) => console.log("I am now rejected", rejectData)
).finally(() => console.log("I am called again"));


rejectedPromise.catch(
    (error) => console.log("Inside catch block", error)
).finally(() => console.log("finally always called"));


(x) => delayedPromiseFunc = new Promise((resolve,reject) => {
    setTimeout(resolve(),x);
});

delayedPromiseFunc(3000).then(() => console.log('after 3 sec'));



