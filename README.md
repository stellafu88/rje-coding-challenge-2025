# CodingTask2025

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.2.1.

# Introduction
This repo contains a simple angular / ngrx project. The project consists of:
* Components - 
    The main structural elements of the app, this includes "Smart" components that interact with the store, and "Dumb" componenets that are only aware of their inputs and outputs.
* Dialogs - 
    Special componenets that make use of the Mat Dialog CDK, these are used for "User Input" effects.
* Models - 
    Define the shape of the data the app uses. (In our main codebase, this is where we would define out Zod schemas, for simplicity here we have just provided a simple type)
* Services - 
    The services are where we orchestrate interacting with the back end to perform CRUD operations, in this example we have provided some mock data and functions.
    This is also where we provide functions that launch the dialogs.
* State -
    The state folder contains the NGRX componenets for managing state.

In our main code base, you would expect to find this architecture replicated within each feature module that makes up the app. For simplicity here, we have included everything inside the app module.

# Your Mission
1. In the mock service, we have introduced an exaggerated delay when loading the contact list to simulate loading a larger data set into state. Extend the component, with the help of angular directives, to show a loading message when the contact list is empty.
2. We have the functionality to edit existing contacts, now add an "Add Contact" button to the contact list with the appropriate actions and effects. You should be able to re-use the contact-edit-dialog.
3. The effects deal with external interactions, as such there is no guarantee that they won't recieve an error response. How could we handle the case where a service function throws an error? You don't need to write any code for this one just, explain what you would change/add, optionally include an example snippet. (hint: rxjs provides an operator for this)
4. We have provided a Role type in the contact.model.ts file, assume a contact can be associated with one or many projects, and can have a different role on each. Explain with the help of diagrams what the interface for managing a contact's roles might look like and list the steps you would take to implement that feature. No code is required for this question, you can choose how you present this, either include it as a PDF in your repo, or provide a public link to a SAAS such as figma or whimsical.

# Answers

1. Code changes have been made under the commit named: "task 1: show loading message when the contact list is empty". I chose to display "No Contact" instead of "Loading Contacts" in case there is a failed the contacts fetching.

2. Code changes have been made under the commit named: "task 2: add an 'Add Contact' button to the contact list with the appropriate actions and effects".

3. we would need to add some code to catch the error by using the 'catchError' operator, log the error for debugging, and dispatch a new action for failed action so we could show a relevant error message to the user in the application. 

Example snippet:
retrieveContactList$ = createEffect(() => this.actions$.pipe(
    ofType(actions.appStarted),
    concatMap(() => 
        this.contactService.getContactList$().pipe(
            map(contactList => actions.contactListReturned({ contactList })),
            catchError(error => { // Import the carchError from the 'rxjs'.
                console.error('Error fetching contact list:', error); // Log the error.
                return of(actions.contactListFetchFailed({ error: error.message })); // Dispatch an error action.
                // The 'contactListFetchFailed' action will need to be defined in the actions file. 
                // Later, we could use the error message to provide feedback to the user.
            })
        )
    )
));

4. Diagrams: https://www.figma.com/board/st0ZpnIxU6VzgtTytJkWMf/Welcome-to-FigJam?node-id=0-1&t=2HHEWt02wCpABRmM-1
The diagrams are also saved as a PDF file named Task 4 - Diagrams.pdf at the root of this project. 

Steps I would take to implement that feature:
 1. Add a new button to view roles on the current contact list page for each contact.
 2. Create a new manage-roles component to manage a contact's roles
 3. Clicking the View Roles button should navigate the user to the manage-roles page in step 2
 4. Display the contact's full name and table as per Figma design. The full name is retrieved from the selected contact in the store.
 5. Assuming there is an API endpoint to fetch list of projects and roles by contact ID.
    e.g. [{name: "Project1", role: "Manager"}, {name: "Project2", role: "Admin"}]
 6. Create an action and effect that calls the above endpoint with the selected contact ID to fetch a list of projects and roles and use that data to populate the table in the manage-roles component.
 7. The table should show a loading spinner or another loading indicator while fetching the data. The effect in step 6 should handle error in a user-friendly way. e.g. error toast message
 8. The table should 
    - allow pagination to prevent too much projects being loaded in one request that reduce the server load and is more user-friendly.
    - have filter and/or search function that helps user quickly narrows down project list.
 9. Add a edit role dialog as per figma design, which will be displayed by clicking on the "Edit Role" button. Under the hood, it should call an action that triggers an effect to open such dialog.  
 10. Create save and cancel actions that have effect to update the role or close the "Edit Role" dialog. Errors should be handled gracefully and display a user friendly error message. Potentially, indicate the saving action in progress with a spinner. 
 11. Add component tests to all components.

