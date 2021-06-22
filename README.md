Introduction to Fetch
The Fetch API in JavaScript is used by JavaScript developers to get the data for their application from somewhere else on the Internet. Up to this point, you've been managing the data directly in a module in your application.

This video is a short introduction to the syntax, purpose and usage of the Fetch API.

A Sink Repair Service
Maude & Merle Baumgardner were married in 1994 after a brief courtship. They are both licensed plumbers and met while working a job together on a major office building.

Sparks flew.

Now they have decided to start a family business and started a sink repair and plumbing service.

They have hired you to create a web application that will let people submit service requests that they can view quickly what needs to be done.

They want a form where a person can enter in a description of the job, the address where the work needs to be done, their spending limit for the job, and a date the work should be completed by.

Once they are done with a job, they want a way to...

Track who worked on the service request.
Once Maude and/or Merle are recorded to have finished the job, they want the UI to reflect that the job is complete.
If they don't have time to work on a particular request, they want the ability to delete it from the list.

ERD
Just from that general description of their needs, take a shot at creating an ERD that will store all of the information needed for this application.

Once you feel you have a good ERD, review it with an instructor.

Setup
Run the following command to get your basic directory structure set up. It will create a project directory for you at ~/workspace/sink-repair.

Hire Buttons and Lollipop the Clowns


Mike Loblonski had aspirations to be an actor on a soap opera. He went to a local college and got a degree in Drama, and then headed to the West Coast to break into the business. His hopes were high as he got into several dozen auditions in his first few months on the scene.

While on an audition, he met a woman named Leslie Ross who talked about how she made some money in between her part-time parts on shows and commercials. She is Lollipop the Clown. She gets booked for kids' birthday parties and performs simple magic tricks and other silly antics to entertain the kids.

She says it pays enough to make ends meet when she's not working as an actor.

As the months went by and Mike wasn't getting any paying gigs as an actor, he thought of Leslie and did some research on how to do what she does. Turns out, the cost was low enough that he could pay for the wardrobe, makeup and some supplies with the remaining savings that he had.

So he pulled the trigger and bought everything he needed. He decided on calling himself Buttons. Also, after discussions with Leslie, they decided to work together.

He put an ad in the local paper looking for a software developer that could make him a web site that people could use to book their services.

Requirements
In your meeting with Mike, here's that information that he wants people to provide when they want to book him for a party.

Parent name
Child name
How many children attending the party
Address of the party
Date of reservation
Length of reservation in hours
When people request a reservation, he wants them all listed in chronological order - closest date first. He also wants the ability to delete requests.

Once the party is over, he wants the ability to say if he or Leslie filled the reservation.

Permanent State vs Transient State
Permanent State
Permanent state goes in the database for long-term storage. You can consider permanent state as information that must be retained and used each time a person uses your application.

Examples of this are:

The person's personal information (name, email address, personal bio, etc.)
Information the user has created to be displayed in your application. For example, a post on Facebook, or an image on Instagram.
Transient State
Transient state only exists while the user is interacting with the application. When the user leaves the app, or refreshes the browser, transient state is reset to default.

Examples of this are:

Options a user has chosen in the user interface.
Text the user has entered into form fields.
Which view the user is currently on.
This kind of state is still tracked, but only in the application code, and is not saved to the database.

Entity Relationship Diagram
Before you begin coding, create an ERD for the data and requirements that Mike and Leslie have for their application. When you're ready, review it with an instructor so that you can start coding.

Getting Permanent State
Before you get to saving new requests, you should list any previous requests. You are going to use a fetch() to get all existing requests and then list them in the UI.

Feel free to go back to chapter 1 and review the video about using fetch().

Manually Create a Request
The following object has been placed in the "requests" array in your database.json file.

{
    "id": 1,
    "description": "Aut sint voluptatem fugit eius quas molestiae modi.",
    "address": "34445 Bianka Ports",
    "budget": 400,
    "neededBy": "2021-08-27"
}
Feel free to add more if you want.

Then open a new terminal and navigate to the sink-repair/api directory. Once there run the following command.

json-server database.json -p 8088 -w
You should see the following output. If you don't, see an instructor.



Application State
You will need to store that external data in your application state when you fetch it. Create a property named requests in your application state object, which which you will find in the dataAccess.js module . Its initial value must be an empty array.

HTTP GET Request with Fetch
Still in dataAccess.js, Place the following variable and function below the application state object.

const API = "http://localhost:8088"

export const fetchRequests = () => {
    return fetch(`${API}/requests`)
        .then(response => response.json())
        .then(
            (serviceRequests) => {
                // Store the external state in application state
                applicationState.requests = serviceRequests
            }
        )
}
Export Requests State
Now that you have defined a way to fetch the stored data from the database and set it to your application state, you'll need a function for providing a copy of the requests state -- something you have done multiple times in previous projects. Define and export a function named getRequests that does just that. If you need to, go back to a previous project and look at the functions that return copies of arrays in the database module to remind you of the syntax.

Fetch State Before Displaying
You need to fetch the data from the API and store it in application state before you can convert the data structures to HTML representations. The syntax here is very confusing for a beginner, and your instruction team will explain the logic when they do a live coding review.

sink-repair/src/scripts/main.js
import { fetchRequests } from "./dataAccess.js" // make sure the requests data has been fetched and set into application state first thing
import { SinkRepair } from "./SinkRepair.js"


const mainContainer = document.querySelector("#container")

const render = () => {
    fetchRequests().then(
        () => {
            mainContainer.innerHTML = SinkRepair()
        }
    )
}

render()
Core Skills: Critical and Creative Thinking
Here is some starter code.

sink-repair/src/scripts/SinkRepair.js
import { Requests } from "./Requests.js"


export const SinkRepair = () => {
    return `
        <h1>Maude and Merle's Sink Repair</h1>
        <section class="serviceForm">
        </section>

        <section class="serviceRequests">
            <h2>Service Requests</h2>
            ${Requests()}
        </section>
    `
}
In the following code, you will need to define the function that will be passed to the map() method.

The function you write will convert each service request object into HTML representations. Since it is wrapped with a <ul> element, make each one an <li> element showing only the description of the request to start.

For example, if you write a function named convertRequestToListElement, then you would update the code below to requests.map(convertRequestToListElement).

sink-repair/src/scripts/Requests.js
import { getRequests } from "./dataAccess.js"

export const Requests = () => {
    const requests = getRequests() // grab the local state of the requests data

    let html = `
        <ul>
            ${
                requests.map()
            }
        </ul>
    `

    return html
}
Core Skill: Collaboration
Work with your peers to get this built out. If you still aren't able to get the requests to list after ~20-30 minutes of attempts, contact an instructor to walk through it.

Collecting User Input
HTML input fields are how you collect user data. Time for you to define some fields to collect the information from a user that Maude and Merle want about a service request.

workspace/sink-repair/src/scripts/ServiceForm.js
export const ServiceForm = () => {
    let html = `
        <div class="field">
            <label class="label" for="serviceDescription">Description</label>
            <input type="text" name="serviceDescription" class="input" />
        </div>
        <div class="field">
            <label class="label" for="serviceAddress">Address</label>
            <input type="text" name="serviceAddress" class="input" />
        </div>
        <div class="field">
            <label class="label" for="serviceBudget">Budget</label>
            <input type="number" name="serviceBudget" class="input" />
        </div>
        <div class="field">
            <label class="label" for="serviceDate">Date needed</label>
            <input type="date" name="serviceDate" class="input" />
        </div>

        <button class="button" id="submitRequest">Submit Request</button>
    `

    return html
}
Then import the HTML into the SinkRepair module and interpolate it in the site structure.

sink-repair/src/scripts/SinkRepair.js
import { ServiceForm } from "./ServiceForm.js"
import { Requests } from "./Requests.js"

export const SinkRepair = () => {
    return `
        <h1>Maude and Merle's Sink Repair</h1>
        <section class="serviceForm">
            ${ServiceForm()}
        </section>

        <section class="serviceRequests">
            <h2>Service Requests</h2>
            ${Requests()}
        </section>
    `
}
Layout CSS
Time to practice your CSS. Your goal is to make the form look like this.

Tips
Do not put the CSS in main.css. Create another module whose responsibility is to style the request form.
Use flex-direction: column on the wrapper <div> elements.
Copy the button CSS from a previous project and choose a background color and font color of your choice.
Make the font size of the labels slightly larger than the default size.

Saving Permanent State
As the person is typing into the form fields, they are changing the state of the application, but it is transient state because the person hasn't committed to the service request until the button is clicked. When the person clicks the button, your job is to take the transient state and convert it into permanent state by storing it in the database.json file by using a fetch() call.

Feel free to go back and watch video in chapter 1 or a refresher on fetch.

HTTP POST Request with Fetch
Place the following function in your dataAccess.js module. The POST method on any HTTP request means "Hey API!! I want you to create something new!"

export const sendRequest = (userServiceRequest) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userServiceRequest)
    }


    return fetch(`${API}/requests`, fetchOptions)
        .then(response => response.json())
        .then(() => {
            // do something after the POST is finished. Stay tuned for what to put here!
        })
}
HTTP Request Methods
Here are the four main methods used on HTTP requests.

Method	Description
GET	Please give me this resource.
POST	Please create something new.
PUT	Please modify an existing resource.
DELETE	Please delete an existing.
Listen for the Click
Add the following event listener to the ServiceForm module. Read each line of code, discuss with your teammates, and see if you can understand what everything is doing. Make sure you write down any questions you have about the code for the review with the instruction team.

import { sendRequest } from "./dataAccess.js"

const mainContainer = document.querySelector("#container")

mainContainer.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "submitRequest") {
        // Get what the user typed into the form fields
        const userDescription = document.querySelector("input[name='serviceDescription']").value
        const userAddress = document.querySelector("input[name='serviceAddress']").value
        const userBudget = document.querySelector("input[name='serviceBudget']").value
        const userDate = document.querySelector("input[name='serviceDate']").value

        // Make an object out of the user input
        const dataToSendToAPI = {
            description: userDescription,
            address: userAddress,
            budget: userBudget,
            neededBy: userDate
        }

        // Send the data to the API for permanent storage
        sendRequest(dataToSendToAPI)
    }
})
Using Developer Tools with Fetch
Watch the following video for an overview of how to use your Developer Tools to see what data is being sent in the request, and the response, when working the GET and POST requests.

  
Reserving a Clown
Setup
Create a directory structure that matches the Sink Repair service.
Create a database.json file in your api directory, and establish all of the resources needed as properties of the main object. Default value for each one should be an empty array.
Refer back to chapter 4 to get the command for starting json-server and ensure that you set up the structure correctly.
User Input
Build the HTML that contains input fields for all of the information that needs to be collected for a person to reserve a clown for a birthday party. Keep referring back to your ERD to make sure you have an input field for each property.

Next, create a function in the data access module that will POST a reservation state object to your API to be saved in permanent storage.

Then create the event listener that collects the user input, constructs a state object for the reservation, and then pass it to your function that you defined above as an argument. Verify that it works by looking in your database.json file as see if a new object is in your reservations resource collection.

Display New State
Remember that every time state changes, you have to generate new HTML representations of the state. Now that you have the ability to generate new state and store it permanently in your API, you need to implement the stateChanged custom action again.

Get State and Dispatch Event
Update your sendRequest() function's fetch call to dispatch the custom event after the POST operation has been completed.

sink-repair/src/scripts/dataAccess.js
    // Add this...
    const mainContainer = document.querySelector("#container");

    return fetch(`${API}/requests`, fetchOptions)
        .then(response => response.json())
        .then(() => {
            // ...and this
            mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
        })
Generate New HTML Representations
Now your main module has to listen for the custom event and invoke the render() function to build all the HTML again.

sink-repair/src/scripts/main.js
mainContainer.addEventListener(
    "stateChanged",
    customEvent => {
        render()
    }
)
Watch Your Network
Now submit another service request with your form, and the service request should now be immediately rendered in the list without the need to refresh the browser. Have your Developer Tools > Network tab open and inspect both the POST request, and the subsequent GET request to see what happened.

Showing Reservations
Fetch Before Display
You should have created a function in the previous chapter which is responsible for fetching the state of reservations from the API. Update your main module to fetch the data before the HTML is generated and rendered to the browser.

Next, you will need a function to be exported from the data access module which is responsible for returning the application state for reservations. When you have that function written, create a module that will be responsible for generating a list of reservations.

Import the function into that new module and invoke it. Store the returned state into a variable. Then use the map() array method to generate the HTML structure needed to display the list of reservations.

Removing Service Requests
animation showing deletion of requests

Delete with Fetch
When you use the DELETE method on an HTTP request, you must identify a single resource.

❗
You can't delete an entire collection with a single HTTP request. Else the Universe will implode on you!!
Therefore, the function whose responsiblity it is to initiate the fetch request for DELETE must have the primary key sent to it as an argument.

sink-repair/src/scripts/dataAccess.js

export const deleteRequest = (id) => {
    return fetch(`${API}/requests/${id}`, { method: "DELETE" })
        .then(
            () => {
                mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
            }
        )
}
Delete Button
Now that you have a function that can send a DELETE request to the API, you can add a button for the user to click and initiate that process. Add the button element right next to the text of each request.

sink-repair/src/scripts/Requests.js

return `
    <li>
        ${request.description}
        <button class="request__delete"
                id="request--${request.id}">
            Delete
        </button>
    </li>
`
Delete Click Listener
Now add an event listener to the main container. When the user clicks on any of the delete buttons, invoke the deleteRequest() function you just made above. Make sure you pass the id of the service request to the deleteRequest() function as an argument.

sink-repair/src/scripts/Requests.js

const mainContainer = document.querySelector("#container")

mainContainer.addEventListener("click", click => {
    if (click.target.id.startsWith("request--")) {
        const [,requestId] = click.target.id.split("--")
        deleteRequest(parseInt(requestId))
    }
})

Denied!
Sometimes Buttons and Lollipop have conflicting reservations, or are just unavailable during a requested time. Add a <button> next to each reservation with the word "Deny" as the text of the button. Make sure the id attribute of each button contains the primary key of the request.

Then add a click event listener that reacts to the delete button being clicked. Extract the primary key from the event.target.id using the .split("--") technique along with array destructuring.

Deleting Reservations
Create and export a function in the data access module that contains a fetch() call which performs a request to your API with the DELETE method. Make sure the function has a parameter defined so that other modules can specify the id of the reservation to be deleted.

Also remember that you can only delete single resources, so you will need the id value at the end of the URL for the DELETE request.

http://localhost:8080/resource/id

Asynchronous Request/Response Assessment
This project will help you assess your ability to apply the JavaScript skills that you practiced in this book.

Form fields
Collecting user input
fetch() and then()
Asynchronous state management
Demo
Animation of Pen Pal Society application

Features
User can choose an author
Given a pen pal wants to send a letter
When the Pen Pal app loads
Then there should be a select element that displays all pen pals to choose for the author

User can choose an recipient
Given a pen pal wants to send a letter
When the Pen Pal app loads
Then there should be a select element that displays all pen pals to choose for the recipient

User can choose a letter topic
Given a pen pal wants to send a letter
When the Pen Pal app loads
Then there should be a group of radio buttons for the user to choose a topic

User can enter the letter body
Given a pen pal wants to send a letter
When the Pen Pal app loads
Then there should be textarea element in which the user can type in the letter body

User can save letter
Given a pen pal wants to send a letter
When the Pen Pal app loads
Then there should be button labeled Send at the bottom of the form

Given a pen pal is done writing a letter
When the pal clicks the Send button
Then the letter should be saved in the API database
And the new letter should immediately be rendered in the list of letters below the form
And the rendered letter should display the following information

author
recipient
date sent
email address of author/recipient
topic of letter
Deep Learning
Another reminder from the instruction team. This is NOT A TEST. We are not looking for 100% completion, although if you can make it work completely, then huzzah for you.

What we are looking for is effort, critical thinking about the concepts, creative thinking to bind the concepts together for a solution, and collaboration with your teammates and instruction team.

If you only get 50% of it complete, but display the above Core Skills and can demonstrate understanding of the fundamental code concepts, then you are learning and growing - which is what we care about.

Optional Advanced Challenge
Think you have a strong understanding of asynchronous operations using fetch() and then()? In the mood to stretch your coding skills and take on a challenge? Once you complete the assessment given the features listed above, you have the option of taking on this challenge.

animation of choosing multiple topics for a letter

User can choose multiple letter topics
Given a pen pal wants to send a letter
When the Pen Pal app loads
Then there should be a group of checkboxes for the user to choose one, or more, topics

User can save letter with multiple topics
Given a pen pal is done writing a letter
When the pal clicks the Send button
Then the letter should be saved in the API database
And the new letter should immediately be rendered in the list of letters below the form
And the rendered letter should display the following information

author
recipient
date sent
email address of author/recipient
all topics chosen

Creating Completion State
When Maude or Merle have completed a job, they would like to choose their name from a <select> element and have it recorded permanently. The date of completion should also be recorded when a name is chosen.

animation showing two service requests marked as complete

Double State for Display Plumbers
You can place this <select> element wherever is easiest to start. Don't worry about the exact placement, just make sure that it is displayed for each service request.

Note that the value of each option in the select element has the primary key of the service request AND the primary key of the plumber delimited with 2 dashes. This is because you need to have both the request and the chosen plumber to mark a job complete.

<select class="plumbers" id="plumbers">
    <option value="">Choose</option>
    ${
        plumbers.map(
            plumber => {
                return `<option value="${request.id}--${plumber.id}">${plumber.name}</option>`
            }
        ).join("")
    }
</select>`
Creating New State for Completion
Add the following event listener to your requests module.

mainContainer.addEventListener(
    "change",
    (event) => {
        if (event.target.id === "plumbers") {
            const [requestId, plumberId] = event.target.value.split("--")

            /*
                This object should have 3 properties
                   1. requestId
                   2. plumberId
                   3. date_created
            */
            const completion = { }

            /*
                Invoke the function that performs the POST request
                to the `completions` resource for your API. Send the
                completion object as a parameter.
             */

        }
    }
)
Saving Completion State
Create two functions in your dataAccess module.

saveCompletion() - This will perform the POST request to save the completion object to the API
fetchCompletions() - This will retrieve all completion objects from the API

Completing the Performance
When Mike or Leslie have completed a performance, they would like to choose their name from a <select> element and have it recorded permanently. The date of completion should also be recorded when a name is chosen.

Display Clowns
Display a select element next to each performance so that Buttons or Lollipop can be selected as the performer.

Recall that the value of each option in the select element has the primary key of the reservation AND the primary key of the clown delimited with 2 dashes. Starter code is provided, but you have to replace the xxx text with the appropriate variables.

<select class="clowns" id="clowns">
    <option value="">Choose</option>
    ${
        clowns.map(
            clown => {
                return `<option value="${xxx.id}--${xxx.id}">${xxx.name}</option>`
            }
        ).join("")
    }
</select>`
Creating New State for Completion
Add the following event listener to your requests module. It should create a new state object, and then send that state to a function in your data access module which will POST it to the API.

mainContainer.addEventListener(
    "change",
    (event) => {

    }
)

Sorting Objects in an Array
Modify the getRequests() method in the data access module to return an array of service request objects that are sorted by their completion status. Incomplete ones should be displayed first. As soon as a service request is completed, it should be marked with a different color and sorted to the bottom of the list.

Start with a web search about how to do it and see if you can figure it out by the advice given to other people.