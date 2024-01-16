# Flight ✈ Diary

The starter state can be found in the "[flightdiary-starter.zip](./flightdiary-starter.zip)" at the top level of the repository.

The `app.js` file will have some comments explaining the inner workings of the code.

The following snippet will be needed in a function, you can copy it from here:

```html
<div class="flight-element__image">
    <img src="https://www.freightwaves.com/wp-content/uploads/2023/02/13/Finnair-A350-weight_1.jpg" alt="Finnair">
</div>
<div class="flight-element__info">
    <h2>AY1251</h2>
    <h4>EFHK - LHBP</h4>
    <p>2023.07.04</p>
    <p>Great flight!</p>
</div>
```

> If you replace the arrow function notations `() => {}` with the regular function declaration syntax (`function() {}`) then the order of functions in `app.js` will no longer matter.

<hr/>
<hr/>

## Local python server included
It helps test the "add example flights" button.
To make the included `server.py` work, follow the steps below:

### Installing Python

If not installed, you can download Python from the [official python website](https://www.python.org/).

> You can check whether you have it installed by typing "python" in your windows command line.

In the top menu click on Downloads then in the dropdown there should be a button titled "Python x.y.z" (3.12.0 as of 2023.11.17). Download it and start the installation.

In the installer, what matters is that you put the checkmark in before "Add python.exe to PATH".

![python1](https://i.imgur.com/hytsmtw.png)

After doing that, you can click on "Install Now".

> After the installation, you may have to reopen your active terminal windows in order to be able to run python in them.

## Installing flask with pip

Having installed python, there is one more thing we need to download. That is "flask", a micro web framework written in python that the little test web server of ours is running on.

Python automatically installs its own package manager called pip that we can use to get flask and other plugins or useful libraries.

Open your terminal window and type `pip install flask`.

## Running the test server

In a command line, type the following command: 

```
python .\server.py
```

This small server by default will run on port 5000. Therefore its full address will be either `http://localhost:5000` or `http://127.0.0.1:5000`. 
Finally, as the endpoint defined in the server is `/test_flights`, the actual endpoint you will have to send a request from your fetch call (as it is included in the .js code) will be `http://127.0.0.1:5000/test_flights`

> You can stop the small server by pressing CTRL+C on your keyboard while in the terminal or simply by closing the terminal window.