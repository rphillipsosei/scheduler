// describe("Navigation", () => {
    
//     it("should visit root", () => {
//     cy.request("GET", "/api/debug/reset")
//       cy.visit("/");
//     });

//     it("should navigate to Tuesday", () => {
//         cy.visit("/");
//       });

//       it("should book an interview", () => {
//         cy.visit("/");
//         cy.contains("Monday");
//       });
      
//       it("clicks the add button for an empty appointment", () => {
//         cy.get("[alt=Add]")
//         .first()
//         .click();
//       })
      
//       it("types the name \"Lydia Miller-Jones\" into the student input", () => {
//         cy.get("[data-testid=student-name-input]").type("Lydia Miller-Jones");
//       })

//       it("click on the interviewer with the name \"Sylvia Palmer\"", () => {
//         cy.get("[alt='Sylvia Palmer']").click();
//       })

//       it("clicks the save button", () => {
//         cy.contains("Save").click();
//       })
      
//       it("should show the student and interviewer names within and element that has the \".appointment__card--show\" class", () => {
//         cy.contains(".appointment__card--show", "Lydia Miller-Jones");
//         cy.contains(".appointment__card--show", "Sylvia Palmer");
//       })
//   });

describe("Appointments", () => {
    beforeEach(() => {
     cy.request("GET", "/api/debug/reset");
   
     cy.visit("/");
   
     cy.contains("Monday");
    });
   
    it("should book an interview", () => {
     cy.get("[alt=Add]")
      .first()
      .click();
   
     cy.get("[data-testid=student-name-input]").type("Lydia Miller-Jones");
     cy.get('[alt="Sylvia Palmer"]').click();
   
     cy.contains("Save").click();
   
     cy.contains(".appointment__card--show", "Lydia Miller-Jones");
     cy.contains(".appointment__card--show", "Sylvia Palmer");

    });

    it("should edit an interview", () => {
        cy.get("[alt=Edit]")
          .first()
          .click({ force: true });
      
        cy.get("[data-testid=student-name-input]").clear().type("Lydia Miller-Jones");
        cy.get("[alt='Tori Malcolm']").click();
      
        cy.contains("Save").click();
      
        cy.contains(".appointment__card--show", "Lydia Miller-Jones");
        cy.contains(".appointment__card--show", "Tori Malcolm");
      });

      it("should cancel an interview", () => {
        cy.get("[alt=Delete]")
          .click({ force: true });
      
        cy.contains("Confirm").click();
      
        cy.contains("Deleting").should("exist");
        cy.contains("Deleting").should("not.exist");
      
        cy.contains(".appointment__card--show", "Archie Cohen")
          .should("not.exist");
      });
   });
