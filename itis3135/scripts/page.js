document.addEventListener('DOMContentLoaded', function () {
   
    document.getElementById('home').style.display = 'block';
  
   
    const navLinks = document.querySelectorAll('nav ul li a');
  
 
    navLinks.forEach(function (link) {
        link.addEventListener('click', function (event) {
            event.preventDefault();
  
            const targetId = link.getAttribute('href').substr(1);
            const targetSection = document.getElementById(targetId);
  
           
            document.querySelectorAll('section').forEach(function (section) {
                section.style.display = 'none';
            });
  
            targetSection.style.display = 'block';
        });
    });
  });
  document.addEventListener('DOMContentLoaded', function () {
    
    document.getElementById('home').style.display = 'block';
  
    
    const navLinks = document.querySelectorAll('nav a');
  
    navLinks.forEach(function (link) {
        link.addEventListener('click', function (event) {
            event.preventDefault();
  
            const targetId = link.getAttribute('href').substr(1);
            const targetSection = document.getElementById(targetId);
  
            document.querySelectorAll('section').forEach(function (section) {
                section.style.display = 'none';
            });
  
            targetSection.style.display = 'block';
        });
    });
});
