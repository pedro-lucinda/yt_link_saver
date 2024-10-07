describe("Navigation", () => {
  it("should navigate to the home page", () => {
    // Start from the index page
    cy.visit("http://localhost:3000/");

    // The new url should include "/"
    cy.url().should("include", "/");

    // The new page should contain an h1 with "Youtube Link Saver"
    cy.get("h1").contains("Youtube Link Saver");
  });
});
