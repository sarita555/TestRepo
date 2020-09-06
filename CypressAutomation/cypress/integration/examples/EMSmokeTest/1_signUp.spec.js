describe('Sign Up', function(){
    var num;

    before(() => {
      cy.visit("/sign_up"); 
      num = 65;
      })
    
    it('Title of the page', function(){
       // cy.visit("https://dashboard.electricmiles.io/home");
        cy.get('[class^="InitialStep_contentTitle"]').should('have.text', 'Sign up');
    })

    it('Sign up', function(){
      cy.contains("OK").click({force:true})
      cy.get('[class^="Input_input"]').type("emCustomer" + num + "@gmail.com");
      cy.get('[class^="FormContainer_SignInFormContainer"]').click();
      cy.get('[class^="FormContainer_SignInFormContainer"]').click();
      cy.wait(2000);
      cy.get('[class^="Input_input"]').should('have.value', "emCustomer" + num + "@gmail.com");
      cy.wait(2000);
      cy.contains("Continue", { matchCase: false }).click({force:true})
      cy.get('[class^="PersonalDetails_contentTitle"]').should('be.visible');
    })
  
    it('A bit about you', function () {
        cy.get('[class^="PersonalDetails_contentTitle"]').contains('A bit about you');
        cy.get('input[name="firstName"]').type('TestCustomer'+num);
        cy.get('input[name="lastName"]').type('TestCustomer'+num);
        cy.get('input[name="companyName"]').type('TestCompany'+num);
        cy.get('[name="phoneNumber"]').type('44772558333');
        cy.get('[name="password"]').type('Wewilldefeatcovid19');
        cy.get('[name="rePassword"]').type('Wewilldefeatcovid19');
        cy.get('[class^="FormContainer_SignInFormContainer"]').click();
        cy.get('[class^="FormContainer_SignInFormContainer"]').click();
        cy.contains("Continue", { matchCase: false }).click({force:true})
        cy.wait(3000);
        cy.get('[class^="AccountType_contentTitle"]').should('be.visible');
    })
    
    it('Choose account type', function () {
        cy.get('h2[class^="AccountType_contentTitle"]').contains( 'Choose account type');
        cy.get('[class^="CheckboxWithLabel_titleText"]').contains('Personal EV');
        cy.get('#PersonalEV').check({ force: true });
        cy.contains("Continue", { matchCase: false }).click({force:true})
        cy.wait(3000);
        cy.get('[class^="YourPlaces_contentTitle"]').should('be.visible');
    }) 
    
    it('Set your places', function () {
        
        cy.get('h2[class^="YourPlaces_contentTitle"]').contains('Set your places');
        cy.get('[name="homeAddress"]').type('12109 Polo Drive, Fairfax, VA, USA');
        cy.get('[class^="FormContainer_SignInFormContainer"]').click();

        cy.get('[name="workAddress"]').type('5155 Parkstone Drive, Chantilly, VA, USA');
        cy.get('[class^="FormContainer_SignInFormContainer"]').click();
        cy.get('[class^="FormContainer_SignInFormContainer"]').click();
        cy.contains("Continue", { matchCase: false }).click({force:true})
        cy.wait(3000);
        cy.get('[class^="YourOpinion_contentTitle"]').should('be.visible');
    })

    it('Whats most important for you?', function () {
        
        cy.get('h2[class^="YourOpinion_contentTitle"]').contains("What's most important for you?");
        cy.get('#Both').check({ force: true });
        cy.contains("Continue", { matchCase: false }).click()
        cy.wait(3000);
        cy.get('[class^="MainProfileInfo_firstName"]').should('be.visible');   
        cy.get('[class^="MainProfileInfo_firstName"]').should("have.text", "Hello, TestCustomer" +num+"!");
    })


})
