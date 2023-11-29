document.addEventListener('DOMContentLoaded', function () {
    // Show the home section when the page loads
    document.getElementById('home').style.display = 'block';
  
    // Get all the navigation links
    const navLinks = document.querySelectorAll('nav ul li a');
  
    // Add click event listeners to each navigation link
    navLinks.forEach(function (link) {
        link.addEventListener('click', function (event) {
            event.preventDefault();
  
            // Get the target section based on the href attribute of the link
            const targetId = link.getAttribute('href').substr(1);
            const targetSection = document.getElementById(targetId);
  
            // Hide all sections
            document.querySelectorAll('section').forEach(function (section) {
                section.style.display = 'none';
            });
  
            // Show the target section
            targetSection.style.display = 'block';
        });
    });
  });
