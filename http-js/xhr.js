
const getButton = document.getElementById('get-button');
const postButton = document.getElementById('post-button');


const sendHttpRequest = (method, url, data) => {
    const promise = new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open(method, url);  // prepares the http request

        xhr.responseType = 'json'

        if (data) {
            xhr.setRequestHeader('Content-Type', 'application/json');
        }
        xhr.send(JSON.stringify(data)); //actually makes the request; stringify is required to convert java script object to JSON.

        xhr.onload = () => {
            if (xhr.status >= 400) {
                reject(xhr.response);
            } else
                resolve(xhr.response);
        }

        xhr.onerror = () => {
            reject('Something went wrong');   // this works only in case of network failure and not on response with status code >=400
        }
    });
    return promise;

};

/**
 * It's better to return a promise and get the data because we want to handle the data where we call it, and not inside the common method.
 * Also it's better to use Promise for async request.
 */
const getRequest = () => {
    sendHttpRequest('GET', 'https://reqres.in/api/users').then((resolveData) => {
        console.log(resolveData);
    })
};


const postRequest = () => {
    sendHttpRequest('POST', 'https://reqres.in/api/register', {
        "email": "eve.holt@reqres.in",
        "password": "pistol"
    }).then((resolvedData) => {
        console.log(resolvedData);
    }).catch((error) => console.log(error));
};


getButton.addEventListener('click', getRequest);
postButton.addEventListener('click', postRequest);


/**
 * In this setup we had to wrap the XmlHttpRequest has to be wrapped inside promise to make it usable in much better way.
 * fetch API comes by default with the promise functionality. But it has it's own downside.
 */
