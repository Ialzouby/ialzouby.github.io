document.addEventListener('DOMContentLoaded', function() {
    // Load navbar content dynamically and reinitialize event listeners
    function loadNavbarAndInitListeners() {
        fetch('components/navbar.html')
            .then(response => response.text())
            .then(html => {
                document.querySelector('[data-include="components/navbar.html"]').innerHTML = html;
                initializeFolderToggle(); // Initialize event listeners after loading navbar
            })
            .catch(error => {
                console.error('Error loading navbar:', error);
            });
    }

    // Initialize folder toggle event listeners
    function initializeFolderToggle() {
        document.querySelectorAll('.folder-name').forEach(folderName => {
            folderName.addEventListener('click', function() {
                const folder = folderName.closest('.folder');
                folder.classList.toggle('open');
                folder.classList.toggle('folder-open'); // Toggle this class too
                const folderContent = folder.querySelector('.folder-content');
                folderContent.style.display = folder.classList.contains('open') ? 'block' : 'none';
            });
        });
    }
    

    loadNavbarAndInitListeners();
});
