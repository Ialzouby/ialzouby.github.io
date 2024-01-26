// Animations
AOS.init({
  anchorPlacement: 'top-left',
  duration: 1000
});

// Add your javascript here
document.addEventListener('DOMContentLoaded', (event) => {
  document.querySelectorAll('.read-more-btn').forEach(button => {
      button.addEventListener('click', (e) => {
          const targetId = e.target.getAttribute('data-target');
          const targetContent = document.querySelector(targetId);

          if (targetContent) {
              targetContent.classList.toggle('show');
          }
      });
  });
});
