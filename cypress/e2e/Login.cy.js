describe("Login Test for K.R. Mangalam Website", () => {
  const URL = "https://krmangalamgn.edunexttechnologies.com/Index";
  const LOGIN_ID = "Lucky.Dubey";
  const PWD = "teacher123";
  const SUBJECT_LIST = "PERFORMING ARTS - REFLECTION"; //  make it an array and loop through it
  it("Logs in with provided credentials", () => {
    cy.visit(URL);

    cy.get('input[name="username"]').type(LOGIN_ID);

    cy.get('input[name="password"]').type(PWD);

    cy.get('button[id="user_login_btn"]').click();

    cy.wait(10000);
    cy.contains("Teacher Dashboard").click({ force: true });
    cy.wait(2000);
    cy.contains("Enter Grade Remarks").click({ force: true });

    cy.contains("Filters ").click();

    cy.get("#classid").select("8"); // the value for "Class 6" is '8'

    cy.wait(1000);

    cy.get("#sectionid").select("B"); // Replace 'B' with the correct value for "Section B"

    cy.wait(1000);
    // Replace 'Annual' with the actual value
    cy.get("#termid").select("114"); // Replace 'Annual' with the correct value for "Term Annual"

    cy.get("a.btn.bg-indigo-300").click();

    cy.get("#fts").clear().type(`${SUBJECT_LIST}{enter}`);

    cy.wait(1000);
    cy.get("table#example tbody tr").each(($row) => {
      // Find the cell that contains "TEACHER" as the Activity Name
      const activityName = $row.find("td:nth-child(5)").text().trim();

      if (activityName === "TEACHER") {
        cy.wrap($row)
          .find("td:last-child .btn.btn-success.btn-icon.btn-rounded")
          .click();

        cy.get(".dropdown-menu.dropdown-menu-right.table-nav-drop").should(
          "be.visible"
        );

        cy.get(".dropdown-menu.dropdown-menu-right.table-nav-drop")
          .contains("a", "Enter Activity Remarks")
          .click({ force: true });
      }
    });
    cy.get("table#example tbody tr").then((rows) => {
      const rowCount = Cypress.$(rows).length;

      const processRow = (index) => {
        cy.wait(1000);
        if (index >= rowCount) return;

        cy.get(`table#example tbody tr`)
          .eq(index)
          .find("td:last-child .btn.btn-success")
          .click();
        cy.wait(1000);

        cy.get(`table#example tbody tr`)
          .eq(index)
          .find(".dropdown-menu.dropdown-menu-right")
          .find("li")
          .contains("Enter Remarks")
          .click({ force: true });
        cy.wait(1000);

        // Entering remarks
        cy.contains("b", "SELF :")
          .parent()
          .next()
          .find("textarea")
          .clear()
          .type("Consistent");
        cy.contains("b", "TEACHER :")
          .parent()
          .next()
          .find("textarea")
          .clear()
          .type("Dedicated");
        cy.contains("b", "PEER :")
          .parent()
          .next()
          .find("textarea")
          .clear()
          .type("Articulate");
        cy.contains("b", "PARENT :")
          .parent()
          .next()
          .find("textarea")
          .clear()
          .type("Thriving");

        cy.get("button").contains("Save").click();
      };

      // Start processing rows from the first one
      for (let i = 0; i < rowCount; i++) processRow(i);
    });
  });
});
