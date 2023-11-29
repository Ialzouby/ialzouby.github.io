// Wait for the document to fully load before executing the script
document.addEventListener("DOMContentLoaded", function () {
    // Get all the navigation links
    const navLinks = document.querySelectorAll("nav ul li a");

    // Get all the sections
    const sections = document.querySelectorAll("section");

    // Show the "home" section by default
    showSection("home");

    // Add click event listeners to navigation links
    navLinks.forEach((link) => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const targetSectionId = link.getAttribute("href").substring(1);
            showSection(targetSectionId);
        });
    });

    // Function to show a specific section and hide others
    function showSection(sectionId) {
        sections.forEach((section) => {
            if (section.getAttribute("id") === sectionId) {
                section.style.display = "block";
            } else {
                section.style.display = "none";
            }
        });
    }
});
