
/**
 * Binary Object - ArrayBuffer - sequence of raw data or bytes of data stored in memory.
 */

let buffer = new ArrayBuffer(16);

console.log(buffer.byteLength);


/**
 * View Objects also called TypedArray are way to ready the raw binary data and manipulate it.
 */

let view = new Uint32Array(buffer);

console.log(view.length);


/**
 * Constructors of TypedArray
 * 1) passing buffer directly (offset and length optional)
 * shown above.
 */
/**
 * 2) Passing array like object
 * This will create the array of length 5 and each unit will have 2 bytes or 16bits
 * for Uint8Array each unit would have 1 byte or 8 bits.  
 * 
 * */
view = new Uint16Array([1, 2, 3, 4, 5]);
console.log(view.length, view.byteLength, view[[0]]); //5 , 10, 1

/**
 * 3) Passing TypedArray
 */

let view16 = new Uint16Array([1, 2, 3, 4]);
console.log(view16.length, view16.byteLength);

view = new Uint8Array(view16);
console.log(view.length, view.byteLength);

/**
 * 4) With length - It creates the underlying array buffer automatically.
 */

view = new Uint16Array(5);
console.log(view.length, view.byteLength, view.buffer);


/**
 * There are both signed and unsigned TypedArray Uint8Array, Int8Array (signed)
 */

let dataBuffer = new Uint8Array([2, 3, 255]).buffer;

let dataView = new DataView(dataBuffer);

console.log(dataView.getUint16());


/**
 * There is no concat function for TypedArrays. Write your implementation for this given an array of Uint8Array Typed array
 */

/**
 * This solution uses O(n) space.
 */
concatUintArray = (arrays) => {
    let dummyArray = [];
    arrays.forEach((array) => {
        array.forEach((el) => {
            dummyArray.push(el);
        })
    });

    let combinedArray = new Uint8Array(dummyArray);
    return combinedArray;

}

/**
 * This solution doesn't use any space.
 */
concatUintArray2 = (arrays) => {
    let totalLength = arrays.reduce((acc, value) => acc + value.length, 0);
    let combinedBufferView = new Uint8Array(totalLength);
    let begin = 0;
    arrays.forEach((array) => {
        combinedBufferView.set(array, begin);
        begin = array.length + begin;
    });
    return combinedBufferView;
}

let uint81 = new Uint8Array([1, 2, 3]);
let uint82 = new Uint8Array([5, 6]);

console.log(concatUintArray2([uint81, uint82]));
