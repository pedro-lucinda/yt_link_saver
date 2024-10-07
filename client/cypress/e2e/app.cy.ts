describe("YouTube Link Saver", () => {
  const youtubeUrl = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
  const name = "Sample Video";

  beforeEach(() => {
    // Visit the Home page before each test
    cy.visit("/");
  });

  it("should load the homepage", () => {
    cy.contains("Youtube Link Saver").should("be.visible");
    cy.contains("Save your youtube links here").should("be.visible");
  });

  it("should add a new link and display it", () => {
    // Enter URL and name, then save
    cy.get('input[placeholder="Enter youtube link here"]').type(youtubeUrl);
    cy.get('input[placeholder="Enter name here"]').type(name);
    cy.contains("Save").click();

    // Verify the newly added link appears
    cy.contains(name).should("be.visible");
    cy.get("iframe")
      .should("have.attr", "src")
      .and("include", "https://www.youtube.com/embed/dQw4w9WgXcQ");
  });

  it("should delete the added link", () => {
    // Add the link again to test the delete functionality
    cy.get('input[placeholder="Enter youtube link here"]').type(youtubeUrl);
    cy.get('input[placeholder="Enter name here"]').type(name);
    cy.contains("Save").click();

    // Ensure the link is displayed
    cy.contains(name).should("be.visible");

    // Delete the link
    cy.contains(name)
      .parent()
      .within(() => {
        cy.get("button").contains("X").click();
      });

    // Verify the link is removed from the page
    cy.contains(name).should("not.exist");
  });
});
