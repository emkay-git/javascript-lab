const getButton = document.getElementById('get-button');
const postButton = document.getElementById('post-button');


const sendHttpRequest = (method, url, data) => {
    return fetch(url, {
        'body': data ? JSON.stringify(data) : {},
        'method': method,
        'headers': { 'Content-Type': 'application/json' }
    }).then((data) => {
        if(data.status >=400) {
           return data.json().then((errorData) => {
                const error = new Error('Something went wrong');
                error.data = errorData;
                throw error;
            })
        }
        return data.json();   //data.json() returns a promise
    });

};



const getRequest = () => {
    sendHttpRequest('GET', 'https://reqres.in/api/users').then((resolveData) => {
        console.log(resolveData);
    })
};


const postRequest = () => {
    sendHttpRequest('POST', 'https://reqres.in/api/register', {
        "email": "eve.holt@reqres.in",
        // "password": "pistol"

    }).then((resolvedData) => {
        console.log(resolvedData);
    }).catch((error) => console.log(error,error.data));
};


getButton.addEventListener('click', getRequest);
postButton.addEventListener('click', postRequest);

