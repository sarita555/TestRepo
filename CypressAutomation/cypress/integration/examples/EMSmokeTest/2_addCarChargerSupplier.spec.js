    
describe('Add Car, Charger, and Supplier to Electric Miles', function(){

    var num;
    before(() => {
        num = 6;
        cy.login("emCustomer"+num+"@gmail.com", "Wewilldefeatcovid19");
/*      cy.task('queryDb', 'SELECT * FROM charger_db.customer_suppliers').then(res => {
          expect(res).to.have.lengthOf(22);
          });
 */ 
    })

    beforeEach(() => {
      Cypress.Cookies.preserveOnce('tildauid');
      cy.restoreLocalStorage();
    });

    afterEach(() => {
      cy.saveLocalStorage();
    });

    it('Verify after login navigates to Dashboard', function(){
      cy.url().should('include', '/home') // => true
      cy.get('[class^="CarBatteryStatus_carTitle"]').contains('Remaining Battery Range SoC');

    })

    it('Verify Navigate to Profile', function(){
      cy.get('a[href*="/home/profile"]').contains('Profile').click({force: true });
      
    })

    it('Verify Add Car', function(){
        cy.get('[class^="ProfileConnection_title"]')
        .should(($h3) => {
          expect($h3.eq(0).text().trim()).contains('Your car');
        });
 
 
        cy.get('a[href="/connect_car"]',{timeout:60000}).should('have.text', 'Add');
        cy.get('a[href="/connect_car"]').click({force: true });
        cy.get('[class^="Select_selected"]').contains('Manufacturer').click({force:true});
        cy.get('[class^="Option_main"]:contains("BMW")').click({multiple:true});
        cy.contains("Model").click({force:true})
        cy.contains("i3").click({force:true})
        cy.get('button[type=submit]').click({force:true});
    })
 

    it('Verify Car Added', function(){
        cy.get('[class^="CarCard_grid"] div')
        .should(($div) => {
          expect($div.eq(0)).to.contain('BMW')
          expect($div.eq(1)).to.contain('Model')
          expect($div.eq(2)).to.contain('i3')
        })
        cy.contains("Continue", { matchCase: false }).click({force:true})
    })


    it('Verify Add Charger', function(){
         cy.get('[class^="ProfileConnection_title"]')
         .should(($h3) => {
           expect($h3.eq(1).text().trim()).contains('Your Charger');
         });
       
        // cy.get('a[href="/add_charger"] span').should('have.text', 'Add')
         cy.get('a[href="/add_charger"]').click({force: true });
         cy.get('[class^="Select_selected"]').contains('Charger Manufacturer').click({force:true});
         cy.get('[class^="Option_main"]:contains("Chargepoint Inc")').click({multiple:true});
         cy.contains("Model Name").click({force:true})
         cy.contains("CP4111").click({force:true})
 
         cy.contains("Power Rating").click({force:true})
         cy.contains("3 kW - Slow AC").click({force:true})
 
         cy.contains("Charger Type").click({force:true})
         cy.contains("3 pin 3kW 1-phase").click({force:true})
         cy.get('button[type=submit]').click({force:true});
 
         cy.get('[name="chargerAddress"]').type("9 Wright Close, Bushey, UK");
         cy.get('[class^="GooglePlaceAutocomplete_item"]').click({force:true})
         cy.get('button[type=submit]').click({force:true});
 
         cy.get('[name="chargerPointId"]').type("GrowattTTD0916063");
         cy.get('button[type=submit]').click({force:true});       
     })


     it('Verify Add Supplier', function(){
        cy.get('[class^="ProfileConnection_title"]')
        .should(($h3) => {
          expect($h3.eq(2).text().trim()).contains('Your Supplier')
          
        });
      
        //cy.get('a[href="/add_supplier"] span').should('have.text', 'Add')
        cy.get('a[href="/add_supplier"]').click({force: true });
        cy.get('h3[class^="EnergySupplier_formTitle"]').should('have.text', 'Add Supplier')
        cy.get('p[class^="EnergySupplier_inputTitle"]').contains('Select your Energy Supplier & tariff type')
 
 
        //Write validation code to verify the list
        //cy.get('[class^="EnergySupplier_form"]').find('[class^="Select_childrenContainer"] div').then()

        cy.get('#supplier').contains('Supplier Name').click({force:true});
        cy.get('#supplier div:nth-of-type(2)').contains("EDF Energy").click({force:true});

        cy.get('#meterType').contains('Meter Type').click({force:true})
        cy.get('#meterType > div:nth-of-type(2)').contains('Economy 7 Meter').click({force:true});

        cy.get('#tariffType').contains('Tariff Type').click({force:true})
        cy.get('#tariffType div:nth-of-type(2) div').eq(0).click({force:true});

        cy.get('[class^="Search_input"]').type("Flexible ")
        cy.wait(2000)
        cy.get('[class^=Search_dropDownContainer] div:nth-of-type(1)').should('have.text', 'Flexible Control Mar21').click({force:true})
        
        cy.contains("Continue", { matchCase: false }).click({force:true})
          
    })

    it('Verify Supplier Added', function(){
      cy.get('[class^="SupplierCard_logo"]').contains("You are with EDF Energy")
      cy.get('[class^="SupplierBanner_title"]').contains('For your geographical area, the cheapest Supplier is')
      
    })

    it('Verify Confirm Supplier', function(){
      cy.get('[class^="Confirm_buttonWrap"]').contains('Save')
      cy.contains("Save", { matchCase: false }).click({force:true})
    })

    it('Verify Navigates to Map', function(){
      cy.get('a[href*="/home/map"]').contains('Map').click({force: true });
      cy.url().should('include', '/home/map') // => true
      cy.get('[role="button"]').contains('Map');
    })

    it('Verify Navigates to Calendar', function(){
      cy.get('a[href*="/home/calendar"]').contains('Calendar').click({force: true });
      cy.url().should('include', '/home/calendar') // => true
      cy.get('[class^="Calendar_addTrip"]').contains('Add Trip');
    })

    it('Verify Navigates to History', function(){
      cy.get('a[href*="/home/history"]').contains('History').click({force: true });
      cy.url().should('include', '/home/history') // => true
      cy.get('[class^="History_header"]').contains('Transaction History');
    })

    it('Verify delete Car, Charger, and Supplier', function(){
      cy.get('a[href*="/home"]').contains('Profile').click({force: true });
      cy.get('[class^="ProfileCar_delete"]').contains('delete').click({force:true})
      cy.get('[class^="ProfileCharger_delete"]').contains('delete').click({force:true})
      cy.get('[class^="ProfileSupplier_delete"]').contains('delete').click({force:true})
    })
  
  })