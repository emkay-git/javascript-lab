/**
 * Text decoder. 
 * The data which might be in the buffer source is a repsentation of some text. In that if I want to convert
 * buffersource to text we use Text Decoder
 */

const bufferSource = new Uint8Array([97, 98, 99, 100, 102]);

const decoder = new TextDecoder();

console.log(decoder.decode(bufferSource));


/**
 * Text encoder.
 * Does the reverse
 */

const myText = 'abcdf';
const encoder = new TextEncoder();

console.log(encoder.encode(myText)); // returns a uint8

