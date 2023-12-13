// getting a reference to all the elements from the DOM
const startAddFlightButton = document.querySelector("#new-flight");

const addFlightModal = document.querySelector("#add-modal");
const backdrop = document.querySelector("#backdrop");
const userInputs = addFlightModal.querySelectorAll("input");
const cancelAddFlightButton = addFlightModal.querySelector("#cancel-flight");

const confirmAddFlightButton = document.querySelector("#add-flight");

const listRoot = document.getElementById("flight-list");

// the array where the elements added will be stored
let flights = [];

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
            <img src="${flightElement.imageUrl}" alt="Finnair">
        </div>
        <div class="flight-element__info">
            <h2>${flightElement.flightNumber}</h2>
            <h4>${flightElement.departureAirport} - ${flightElement.arrivalAirport}</h4>
            <p>${flightElement.flightDate}</p>
            <p>${flightElement.notes}</p>
        </div>
    `;

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

    // we can do validation here

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

    // pass it to the function that displays it
    renderNewFlightElement(newFlight);

    // hide the modal and the backdrop and clear the modal inputs
    toggleFlightModal();
    clearFlightInput();
}

// register all the functions declared above to event listeners
startAddFlightButton.addEventListener("click",toggleFlightModal);

backdrop.addEventListener("click",cancelAddFlightHandler);

cancelAddFlightButton.addEventListener("click",cancelAddFlightHandler);

confirmAddFlightButton.addEventListener("click",addFlightHandler);
