// /***************************************************************************************/
// /** 
//  * Promise Basics 
//  **/

// /**
//  * Promise consist of promise handler and promise executor. promise executor is passed 
//  * resolve and reject which are callbacks.
//  */
// const myFirstPromise = new Promise(
//     /**
//      * this is function is called promise executed executor. 
//      * it takes two callbacks, resolve for
//      * success and reject for errors.
//      */
//     (resolve, reject) => { resolve(10); }
// );



// myFirstPromise.then((data) => console.log(data)); -> this is called promise handler

// /** promise has an internal state object that has:- i) state -  which defines the state of promise and the ii) result to be resolved or rejected */
// console.log(myFirstPromise);



// /**
//  * delayed promise
//  */
// const delayedPromise = new Promise((resolve, reject) => {
//     setTimeout(() => resolve('1s over!!'), 1000);
// });

// delayedPromise.then((data) => console.log(data));


// /**
//  * multiple subscribers to promise
//  */

// delayedPromise.then((data) => console.log('2nd subscriber -> ', data));



// /**
//  * then, catch and finally
//  * then -> to catch resolved data or catch rejected data
//  * catch -> to catch rejected data
//  * finally -> always run
//  */

// const resolvedPromise = new Promise((resolve, reject) => {
//     setTimeout(() => resolve('I am resolve'), 1000);
// });


// resolvedPromise
//     .then((data) => console.log(data))
//     .finally(() => console.log('finally executed!!!'));



// const rejectedPromise = new Promise((resolve, reject) => {
//     reject('You are rejected');
// });


// rejectedPromise.then(
//     (data) => console.log("I am not printed", data),
//     (rejectData) => console.log("I am now rejected", rejectData)
// ).finally(() => console.log("I am called again"));


// rejectedPromise.catch(
//     (error) => console.log("Inside catch block", error)
// ).finally(() => console.log("finally always called"));



// /**
//  * custom delay function
//  */
// const delayedPromiseFunc = (x) => {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => resolve(), x);
//     });
// }


// delayedPromiseFunc(5000).then(() => console.log('I am printed'));


// /****************************************************************************************************** */

// /**
//  * Promises Chaining
//  */

// /**
//  * When I return something from the then block of promise, I still receive a promise.
//  * This is different from observable, where one on subscribing the observable gets a 
//  * subscription object. You can't return an observable from inside subscribe block and
//  * get anothe observable like in Promises.
//  * 
//  */
// const chainedPromise = new Promise((resolve) => {
//     resolve('First');
// })
//     .then((data) => { return data + ' Second' })
//     .then((data) => { return data + ' Third' })
//     .then((data) => { return data + ' Fourth' });


// /**
//  *  promise.then -> returns a promise only. Remember this!!
//  */
// chainedPromise.then((data) => console.log(data));

// /** I have used then so it will return a promise ultimately */
// const isItChainedPromise = new Promise((resolve) => {
//     resolve('First');
// }).then((data) => { console.log(data); });


// /** But here I get data as undefined because I am not returning anything from then block of promise */
// isItChainedPromise.then((data) => console.log("Am I chained? " + data));

// /**
//  * This is not chaining promises
//  */

// iAmNotChainedPromise = new Promise((resolve) => {
//     resolve('I am resolved as it is');
// });

// /** This is simply attaching multiple listeners/handlers for a promise. They are not chained */
// iAmNotChainedPromise.then((data) => { console.log(data); return data + ' I have called you'; });

// iAmNotChainedPromise.then((data) => { console.log(data); return data + 'I have also called you' });


// /**
//  * Promise returning the Promise
//  */

// iReturnPromise = new Promise(resolve => {
//     setInterval(() => resolve('I take 2 sec to resolve'), 2000)
// }).
//     then((data) => {
//         return new Promise(resolve => {
//             setInterval(() => resolve(data + ' And I am chained. I took 5 sec to resolve'), 5000);
//         }
//         )
//     }
//     );

// /**In below handler I get the string => 'I take 2 sec to resolve And I am chained. I took 5 sec to resolve'
//  * after 7 sec. One interesting observation, If from inside the then block I return a Promise. In the final handler's
//  * data I dont receive a promise, but rather the resolved/rejected data of the promise which is returned.
//  */
// iReturnPromise.then((data) => console.log(data));


// /**
//  * ANother Promise feature, from insde the then block you can return Objects which have then function with resolve, reject params. Consider the example below
//  */

// const thenableObject = {
//     then: (resolve, reject) => {
//         resolve('I am resolved from object');
//     }
// }

// /**
//  * How it works is that, when I return something from then block, if it's some value then it's directly passed
//  * to the next handler.
//  * If it's some object, javascript looks for the then function in that object. If javascript finds one
//  * resolve and reject callbacks are passed to that function and it works without even being a Promise.
//  * 
//  * If i change the name of the function above to say then1 => log will show function object
//  */
// iReturnThenableObject = new Promise((resolve, reject) => {
//     resolve("I am first");
// }).then((data) => {
//     console.log(data);
//     return thenableObject
// }).then((data) => console.log(data));

// /**
//  * ====>>>> As a good rule, an asynchronous action should always return a promise.
//  */


// /**
//  * promise
//  *     .then(f1)
//  *     .catch(f2)
//  * And
//  * promise
//  *     .then(f1,f2)
//  * 
//  * These two are very very different
//  */


// const promiseWithError = new Promise((resolve, reject) => {
//     reject("I am not well. Rejected!!");
// });

// promiseWithError
//     .then((data) => console.log('Resolved ', data))
//     .catch((error) => console.log('Caught ', error));

// promiseWithError
//     .then(
//         (data) => console.log(data),
//         (error) => console.log('Error ', error)
//     );

// /**
//  * Above behvaiour is same. Let say if there is some error in the then block.
//  * In that case, catch block will be able to catch the error of the then block,
//  * but error handler in the then block won't be able to catch that.
//  * 
//  * Reason being in a chained promise, data is thrown to the next handler, and in case of 
//  * error it is thrown to catch block directly.
//  * In the example below, then two then block in between the errorenous then block and catch 
//  * block don't get executed.
//  */

// const promiseWithoutError = new Promise((resolve, reject) => {
//     resolve('I am resolved without any error');
// });


// promiseWithoutError
//     .then(
//         (data) => { throw new Error('\nI was resolved. But I am throwing an error' + '\nResolved Data: ' + data) },
//         (error) => { console.log('I cant catch the error of resolved block'); }
//     )
//     .then((data) => {
//         console.log(data);
//     })
//     .then((data) => {
//         console.log(data, " Must be null");
//     })
//     .catch((error) => {
//         console.log(error, " I caught the error");
//     });



// /****************************************************************************************************/

// /**
//  * Error Handling in Promises
//  */

// /**
//  * on catch to catch em' all
//  */

// const promiseWithSoManyErrors = new Promise((resolve, reject) => {
//     reject(" I am throwing error at my will");
// })
//     .then(console.log)
//     .then((data) => console.log("2nd level log ", data))
//     .then((data) => console.log("I will never be called in case of error", data))
//     .catch((error) => console.log("I catch them all..all the errors", error))

// /**
//  * implicit try/catch. 
//  * promise executor if come across some error will automatically be rejected instead of being resolved.
//  */

// const promiseWithErrorExecutor = new Promise((resolve, reject) => {
//     throw new Error('I am error but I will be automatically rejected');
//     // reject(new Error('message') is same as above. Promise automatically rejects above.
// });


// promiseWithErrorExecutor.then().catch((error) => console.log(error));

// /**
//  * As discussed above, even if any of the handlers in the chain of promise handlers executes some error
//  * catch will catch the error.
//  */


// /**
//  * Rethrowing? then block can be below catch as well. As always Javascript giving hell load of freedom.. why? :/
//  */


// /**
//  * doing this allow you to handle the successfully caught and processed code 
//  */
// promiseWithErrorExecutor.then().catch((error) => { console.log(error); return 'I am working!' }).then((data) => console.log(data));

// /**
//  * we can pass error from one catch block to another catch block. Why it is there?
//  * It may happend I have one catch block to handle particular set of errors, if the current error
//  * is something I am not aware of. It can be passed to other catch down the chain.
//  */

// promiseWithErrorExecutor
//     .then()
//     .catch((error) => { console.log("Forwarding this error\n"); throw new Error('Cant handle: ' + error); })
//     .catch((error) => console.log("\nI will handler it:", error));


// /**This won't trigger catch as the error appears asynchronously and not when executor runs */
// new Promise(function (resolve, reject) {
//     setTimeout(() => {
//         throw new Error("Whoops!");
//     }, 1000);
// }).catch(alert);


// const testTry = new Promise(() => {

//     setTimeout(() => {
//         throw new Error('error');
//     }, 3000);
// });

// testTry.then().catch((err) => console.log(err));

// /**
//  * try catch cannot handle the asynchronous code for catching error.
//  */

// const testTryCatch = () => {
//     try {
//         setTimeout(() => {
//             throw new Error('error');
//         }, 3000);
//     }
//     catch (err) {
//         console.log(err);
//     }
// }

// testTryCatch();


// /**************************************************************************************** */
// /** Asynchronous errors are uncatchable by catch block */
// /**************************************************************************************** */


// /**************************************************************************************** */

// /**
//  * Promise API
//  */

// /**
//  * This is like forkJoin where I want to run
//  * multiple promises in parallel and wait till 
//  * all of them are completed. It should be passed
//  * arrays of promise but simple value can also be passed, they will be resolved as it is.
//  */

//  const promise1 = new Promise((resolve) => {
//      resolve('Promise1');
//  });
//  const promise2 = new Promise((resolve) => {
//     resolve('Promise2');
// });
// const promise3 = new Promise((resolve,reject) => {
//     reject('Promise3');
// });

//  Promise.all([
//      promise1,
//      promise2,
//      promise3
//  ]).then((data) => console.log(data));

// /**
//  * Promise.allSettled -> unlike Promise.all which rejects all promises if one failes
//  * this returns {status:'fulfilled/rejected',value/reason:''} such that other 
//  * promises which are resolved can be made use of.
//  *
//  */

// /**
//  * Pollyfill of Promise.allSettled
//  */

// if (!Promise.allSettled) {
//     Promise.allSettled = (promises) => {

//         const newPromises = promises.map((promise) =>
//             promise
//                 .then((data) => {
//                     return {
//                         'status': 'fulfilled',
//                         'value': data
//                     }
//                 })
//                 .catch((error) => {

//                     return {
//                         'status': 'rejected',
//                         'reason': error
//                     }

//                 }
//                 )
//         )
//         return Promise.all(newPromises);

//     }
//     Promise.allSettled([new Promise((resolve) => resolve(2)), new Promise((resolve, reject) => reject(3))]).then((data) => console.log(data));

// }

// /**
//  * Promise.race -> like Promise.all but only emits the one which is resolved/rejected first.
//  * Promise.resolve and Promise.reject -> resolve rejects promise but are seldom used in favour of async await.
//  */

// const promise = new Promise((resolve, reject) => resolve(2));

// Promise.resolve(promise).then((data) => console.log(data));


/**
 * Promisification - It's conversion of a function that takes callbacks into a promise.
 * It's similar to what I have done in XHR request. Promisifying it.
 * It's more convenient.
 */


const dummyAsyncFunction = (data, callback) => {
    if (data)
        setTimeout(callback(null, 'I am success data'), 2000);
    else setTimeout((callback('error', 'I am a failed data'), 2000));
}


// dummyAsyncFunction(false, (error, data) => {
//     if (error) {
//         console.log(data);
//     }
//     else {
//         console.log('Success: ', data);
//     }
// })

/**Promisify dummyAsyncFunction */


promisify = (f) => {
    return (...args) => {
        return new Promise((resolve, reject) => {
            const customCallBack = (error, data) => {
                if (error) reject(error + ' ' + data);
                resolve(data);
            };
            args.push(customCallBack)
            console.log(this);
            f.call(this, ...args);
        })
    }
};


const dummyAsyncPromisified = promisify(dummyAsyncFunction);

dummyAsyncPromisified(true).then((data) => console.log(data)).catch((err) => console.log(err));





// function promisify(f) {
//     return function (...args) { // return a wrapper-function
//         return new Promise((resolve, reject) => {
//             function callback(err, result) { // our custom callback for f
//                 if (err) {
//                     return reject(err);
//                 } else {
//                     resolve(result);
//                 }
//             }

//             args.push(callback); // append our custom callback to the end of f arguments

//             f.call(this, ...args); // call the original function
//         });
//     };
// };
























/**
 * Good questions on promises:-
 * 1) Are they same?
 * promise.then(f1,f2);
 * promise.then(f1).catch(f2);
 *
 *
 * 2) Is it catchable?
 * const promise = new Promise((resolve,reject) => {
 *     setTimout(throw new Error('ok'),1000)
 * })
 *
 * promise.catch((error) => console.log(error));
 *
 * 3) Write a pollyfill for Promise.allSettled.
 *
 * 4) Write a general promisification method assuming callbacks are of type function(error,result).
 *
 *
 */















