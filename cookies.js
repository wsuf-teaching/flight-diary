// our own cookie writer function. receives a cookie name, value and expiration time in days as parameters
// get the current time, add x days worth of miliseconds into it, convert it into a human readable utcstring format (that is needed in the cookies)
// finally concatenate all the values together including the name, value, expiry, path and samesite properties (among potentially many others)
function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + exdays*(24*60*60*1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/;SameSite=Strict";
}

// own cookie reader function
// first we decode potential special characters
// as the document.cookie retrieves all cookie key=value pairs delimited by ";" signs as a single string
// we have to split it ourselves, loop through all the cookies and identify the one that has the name that we are searching for
// finally return its value
function getCookie(cname) {
    let name = cname + "=";    
    let cookies = document.cookie;
    let decodedCookie = decodeURIComponent(cookies);
    let ca = decodedCookie.split(";");
    for(let i=0;i<ca.length;i++) {
        let c = ca[i];
        c = c.trim();
        if(c.indexOf(name) == 0) {  // if a cookie starts with the content of the variable "name"
            return c.substring(name.length, c.length);
        }
    }
    return "";  // if the cookies was not found, return an empty string
}

// as this is a separate javascript file, we have to export the functions (or classes) here
// and where we use them, in turn we have to import them: 'import { setCookie, getCookie } from "./cookies.js";'
export { setCookie, getCookie };