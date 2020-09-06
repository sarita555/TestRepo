// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
import "cypress-localstorage-commands"

 Cypress.Commands.add("login", (email, password) => {   
    cy.visit("/sign_in");  
    cy.get('input[name=email]').type(email).should('have.value', email);
    cy.get('input[name=password]').type(password);
    cy.get('button[type=submit]').click();
 })  
 

 Cypress.Commands.add("whiteListSession", () => {   
   Cypress.Cookies.defaults({ whitelist: "tildauid"})
})  


 Cypress.Commands.add('loginAs', (UserEmail, UserPwd) => {
   cy.request({
     method: 'POST',
     url: "/sign_in",
     body: {
       user: {
         email: UserEmail,
         password: UserPwd,
       }
     }
   })
     .its('body')
     .then((body) => {
       cy.setLocalStorage("MTM2MjNhYWE0OTM4NmVlMjI5Y2M1ODdkZWZkYzQ1ZjBjZTNkNTg5OTc3YzJmYmUyMzc5YzM2MDFkOGQ0MjgxNg", body.accessToken);
       cy.setLocalStorage("Mzg0MTZkMTNmNzI5NzYzYjdmNWFkY2NmMGQ1YmM2ZjY2Zjk0ZjAyZGQ2YzZhYmIwZTIyOGQwMWJhMmJmZDcyYQ", body.refreshToken);
     });
 });
 