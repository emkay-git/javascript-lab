//blobs are file like object which represents raw data or chunk of bytes and are immutable.
// It has it's own mime/type as well.

/** Blobs Usages */


/**
 * 1) Creating Blob.
 */
let myblob = new Blob([JSON.stringify({ 'name': 'Mohit', 'value': 'Kumar' })], { 'type': 'application/json' });


/**
 * 2) Creating URL out of Blob.
 */


const url = URL.createObjectURL(myblob);

let link = document.createElement('a');
link.href = url;
link.innerHTML = 'Howdy'
document.body.appendChild(link);


/**
 * 3) Reading data from Blob
 */

/**
 * File reader can read file object, but it can also read blob object as told above it's like a file like object
 * Also File extends from Bblob. 
 * File and Blob are two different objects but have the same methods although File has some extra attributes.
 * File is a special kind of blob and methods applied on Blob can be applied on file object like
 * FileReader, URL.objectCreateURL, XMLHttpRequest.send().
 * 
 * So File inhertis from Blob. 
 * File objects are obtained mostly from FileList object which are produced when user selects file.
 * Blobs are created as shown above.
 * 
 * FileReader is used to read File object as well as raw data i.e. blob object asynchronously.
 */
const fileReader = new FileReader();
// the data returned here is of type ProgressEvent.
fileReader.onloadend = (data) => {
    // console.log(data['srcElement']['result']);
    console.log(fileReader.result); //use this instead of above.
}
fileReader.readAsText(myblob);


/**
 * 4) Reading a file from API as Blob then downloading/showing.
 */
const xhr = new XMLHttpRequest();

xhr.open('GET', 'https://img.freepik.com/free-vector/broken-frosted-glass-realistic-icon_1284-12125.jpg');
xhr.responseType = 'blob';
xhr.onload = () => {
    const fileBlob = new Blob([xhr.response], { type: 'image/jpeg' });
    const imageUrl = URL.createObjectURL(fileBlob);
    let link = document.createElement('a');
    link.href = imageUrl;
    link.innerHTML = 'Image Link'
    link.download = 'image.jpg';
    // window.open(link);
    // link.click();
    document.body.appendChild(link);

    // link = null;

}
xhr.send()


/**
 * PrgressEvent is an interface inherited from Event interface - which represents any event which occurs in DOM.
 * Process like loading a file or for XHR fetching data from a URI have certain events
 * which are fired and we get progress event as data from these events.
 *
 * ErrorEvent is another event which gets emitted in case of error in the DOM.
 */



/**
 * Use cases:-
 * 1) In order to read the file and download it from the server side, Receive the response in
 * blob format and then convert the blob into clickable url.
 *
 * 2) Error Response for the same as a result is also of type in that case one needs to get the error
 * JSON from the Blob for that, one can use File Reader.
 */


/**
 * Blob, File, FileReader (need to see readAs different methods what are those),
 * ProgressEvent, XHR, File Reader both having different progress events and emitting ProgressEvents
 * Downloading file
 * Reading data from blob
 */



/**
 * @todo
 * Do examples from - https://developer.mozilla.org/en-US/docs/Web/API/File/Using_files_from_web_applications
 */


/**
 * Example of uploading an Image and showing on screen.
 * This will involve:-
 * i)   Getting image from User
 * ii)  Converting image file to blob (this step is not needed as we receive the file object
 * which itself is a blob)
 * iii) Generating URL out of blob. There are two ways to do it, URL.createObjectUrl(), or
 * create base64 encoded string
 * iv)  Attaching URL to image source tag 
 * 
 */

const imageFileEl = document.getElementById("imageInput");
const imageShowEl = document.querySelector('img');
const imageShowDataUrlEl = document.querySelector('img#dataUrl');
console.log(imageShowDataUrlEl);
imageFileEl.addEventListener('change', () => {
    const file = imageFileEl.files[0];
    const fileUrl = URL.createObjectURL(file);
    imageShowEl.setAttribute('src', fileUrl);

    let fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onloadend = () => { imageShowDataUrlEl.setAttribute('src', fileReader.result); }

});
