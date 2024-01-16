// import the cookie handler methods from the other js file
import { setCookie, getCookie } from "./cookies.js";

// getting a reference to all the elements from the DOM
const startAddFlightButton = document.querySelector("#new-flight");

const addFlightModal = document.querySelector("#add-modal");
const backdrop = document.querySelector("#backdrop");
const userInputs = addFlightModal.querySelectorAll("input");
const cancelAddFlightButton = addFlightModal.querySelector("#cancel-flight");

const confirmAddFlightButton = document.querySelector("#add-flight");

const defaultTextSection = document.querySelector("#default-text");

const exampleFlightsButton = document.querySelector("#example-flight");

const listRoot = document.getElementById("flight-list");

// the array where the elements added will be stored
let flights = [];

// based on whether there are flights added (and displayed), so by checking the flights array's size
// we either show or hide the default placeholder text
const updateUI = () => {
    if (flights.length === 0) {
        defaultTextSection.style.display = 'block';
    } else {
        defaultTextSection.style.display = 'none';
    }
}


// function that toggles the visibility of both the popup modal and its backdrop
// we use the toggle function of javascript to avoid having to write an if-else construct doing the same
// the "visible" class is checked in CSS and shows or hides the element
const toggleFlightModal = () => {
    addFlightModal.classList.toggle("visible");
    backdrop.classList.toggle("visible");
}

// nulling out all the input fields of the modal
const clearFlightInput = () => {
    for(const userInput of userInputs) {
        userInput.value = '';
    }
}

// both the hide and the input clearing functions are called
const cancelAddFlightHandler = () => {
    toggleFlightModal();
    clearFlightInput();
}

// to delete a flight we either manually iterate through the flights[] array
// and remove it using the splice function
// or use the more modern 'filter' method of javascript. filter keeps only the elements passing the "test"
// in the array. in our case elements whose flightid do NOT match what we are searching for
// in turn the flight we were looking for is removed from the array if exists.
// ---
// to remove the element from the DOM, with the first option we can use its position (index) to do so
// otherwise we can use the querySelector searching for the flight's id, then remove it
// `` marks an interpolated string which consists of a "#" character + with the use of the ${variable} syntax, javascript interpolates
// the value of the variable there
const deleteFlightHandler = (flightId) => {
    // let flightIndex;
    // for(let i=0;i<flights.length;i++) {
    //     if(flights[i].id === flightId) {
    //         flightIndex = i;
    //         break;
    //     }
    // }
    // flights.splice(flightIndex,1);
    // listRoot.children[flightIndex].remove();
    flights = flights.filter(flight => flight.id !== flightId);
    listRoot.querySelector(`#${flightId}`).remove();

    // every time we delete a flight, we save the whole flights array either to a cookie or to the local (or session) storage to persist it through reloads and reopens
    setCookie("flightdiary",JSON.stringify(flights),365);    
    //localStorage.setItem("flightDiary",JSON.stringify(flights));

    updateUI();
}

// renders (displays in the browser in the DOM) a new element
const renderNewFlightElement = (flightElement) => {
    // first we create the element and set some properties
    const newFlightElement = document.createElement('li');
    newFlightElement.className = "flight-element";
    newFlightElement.id = flightElement.id;

    // followed by defining its whole inner structure
    // the backtick (``) allows for multi-line strings
    // and also allows for string interpolation (${something})
    // to put the values of variables in it
    newFlightElement.innerHTML = `
        <div class="flight-element__image">
            <img src="${flightElement.imageUrl}" alt="Plane image">
        </div>
        <div class="flight-element__info">
            <h2>${flightElement.flightNumber}</h2>
            <h4>${flightElement.departureAirport} - ${flightElement.arrivalAirport}</h4>
            <p>${flightElement.flightDate}</p>
            <p>${flightElement.notes}</p>
        </div>
    `;

    //newFlightElement.addEventListener('click', ()=>deleteFlightHandler(flightElement.id));
    newFlightElement.addEventListener('click', deleteFlightHandler.bind(null,flightElement.id));

    //finally, the element is added to the DOM at the end of the element we named above as "listRoot"
    listRoot.append(newFlightElement);
}

// function that executes when clicking on the add button in the modal
const addFlightHandler = () => {
    // first the input fields' values are needed to be retrieved
    // either index the userInputs array that was created above by the
    // querySelectorAll("input") selector
    // or retrieve them one by one by their ID
    const flightNumberValue = userInputs[0].value;
    const departureAirportValue = userInputs[1].value;
    const arrivalAirportValue = userInputs[2].value;
    const flightDateValue = userInputs[3].value;
    const imageUrlValue = userInputs[4].value;
    const miscNotesValue = document.querySelector("#misc-notes").value;

    // we can do validation here if we want to
    // if(...)

    // add a new object with the required values
    // the "crypto.randomUUID" function at the top concatenated to the string "id"
    // creates a globally unique identity random string for the element
    // something like this: "15af57f8-60d3-493c-8520-15998990f697"
    // and the id prefix (or any other alphabetical character) is necessary to ensure
    // the html requirement that is we cannot start an id with a number
    // and as you can see in the example above, the randomUUID however can
    const newFlight = {
        id: "id"+crypto.randomUUID(),
        flightNumber: flightNumberValue,
        departureAirport: departureAirportValue,
        arrivalAirport: arrivalAirportValue,
        flightDate: flightDateValue,
        imageUrl: imageUrlValue,
        notes: miscNotesValue
    };

    // add the new object to an array
    flights.push(newFlight);

    // every time we add a new a flight, we save the whole flights array either to a cookie or to the local (or session) storage to persist it through reloads and reopens
    setCookie("flightdiary",JSON.stringify(flights),365);
    //localStorage.setItem("flightDiary",JSON.stringify(flights));

    // pass it to the function that displays it
    renderNewFlightElement(newFlight);

    // hide the modal and the backdrop and clear the modal inputs
    toggleFlightModal();
    clearFlightInput();
    updateUI();
}

// this event listeners is attached to the search input field and fires every time a character is entered
// event.target.value in turn always contains the exact string that is in the input field, and that is what we are searching for in the "h2" of the flight-elements
// both of which we grab with further querySelectors
// the flightElements array is actually grabbed with the querySelectorAll function as it is potentially a list of 0,1 or more elements.
document.querySelector('#search').addEventListener('input', (event) => {
    const searchText = event.target.value;
    const flightElements = listRoot.querySelectorAll('.flight-element');

    for(const flightElement of flightElements) {
        const flightNumber = flightElement.querySelector('h2').innerText;
        // for example. if the flight number is AY1251, then "AY" is a match, or "25" is a match
        // so we don't check strict equality between the search text and the flight number. rather if the flight number contains the searched text anywhere
        // (as a "substring"), we consider it a match and keep that flight element displayed. otherwise we hide it by settings its display property to none
        // if the input field is empty "", it is contained by any and every element, so everything will be displayed as expected
        if( flightNumber.toLowerCase().includes(searchText.toLowerCase()) ) {
            flightElement.style.display = 'flex';
        } else {
            flightElement.style.display = 'none';
        }
    }
});

// a new event handler function that we attach to the button added newly to the bottom of the page
// that part should be fairly straightforward....
const fetchExampleFlights = () => {

    // we try to get the data on the URL supplied
    // fetch returns a "Promise" that will resolve (resolve, on success) to the response of that request
    // or otherwise fail (reject)
    fetch("http://127.0.0.1:5000/test_flights")
        // if the call was successful (in a sense that the server returned "something" - doesn't mean that something good)
        // then the response object will be returned (the body which is a stream object) that is "big"
        .then(response => {
            // it is a good practice to here also check the status of the response, whether it
            // indeed indicates a success (either response.ok or response.status being 2xx [200])
            if (!response.ok ) {
                // in that case, we can reject this promise (thus jumping to the catch block)
                return Promise.reject(`HTTP error! Status: ${response.status}`);
            }
            // if the status code is ok
            // we can process its body once again asynchronously
            // of course we can do it manually (see this doc: https://developer.mozilla.org/en-US/docs/Web/API/Response/body)
            // but as we usually work with json data in websites, the .json() function does this for us
            // treating and converting the response data to json
            // in a successful operation we can just return the value we want to, as it being
            // "resolve" is implicitly agreed on
            // this would mean the same: return Promise.resolve(response.json());
            return response.json();
         } )
        // then (if the response was ok AND the json conversion was successful as well)
        // we get an array of (json) objects, that we can treat it as a regular javascript array
        // so from now on, we just do stuff we did before plenty of times, adding it to the DOM and things
        .then(exampleFlights => {
            flights = exampleFlights;
            listRoot.innerHTML = '';
            for(let exampleFlight of exampleFlights) {
                renderNewFlightElement(exampleFlight);
            }
            setCookie('flightdiary', JSON.stringify(flights),365);
        })
        // if any of the promises (including the fetch call and the 
        // then blocks as they are promises themselves) fail
        // we catch and print out the errors here
        .catch(err => console.log('Fetch error', err))
        // the finally block executes either way, both in a success or a failure case
        .finally(()=>{console.log('finally')});

};

// when the page is loaded, retrieve all saved flights from the cookies (if it exists and is non-empty)
// and consequently add them to the flights[] array as well as display them
// or do the same from the local/(session) storage
window.addEventListener('load',()=>{
    const cookie = getCookie("flightdiary");
    if(cookie) {
        const cookieFlights = JSON.parse(cookie);
        for(const flight of cookieFlights) {
            flights.push(flight);
            renderNewFlightElement(flight);
        }
    }

    // const storedFlights = localStorage.getItem("flightDiary");
    // if(storedFlights) {
    //     const storedFlightObjects = JSON.parse(storedFlights);
    //     for(const flight of storedFlightObjects) {
    //         flights.push(flight);
    //         renderNewFlightElement(flight);
    //     }
    // }

    updateUI();
})

// register all the functions declared above to event listeners
startAddFlightButton.addEventListener("click",toggleFlightModal);

backdrop.addEventListener("click",cancelAddFlightHandler);

cancelAddFlightButton.addEventListener("click",cancelAddFlightHandler);

confirmAddFlightButton.addEventListener("click",addFlightHandler);

exampleFlightsButton.addEventListener("click", fetchExampleFlights);





