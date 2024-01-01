document.addEventListener('DOMContentLoaded', function() {
    // Handle folders opening and closing
    var folders = document.querySelectorAll('.folder');
    folders.forEach(function(folder) {
        var folderName = folder.querySelector('.folder-name');
        if (folderName) {
            folderName.addEventListener('click', function() {
                folder.classList.toggle('open');
                var folderContent = folder.querySelector('.folder-content');
                if (folderContent) {
                    folderContent.style.display = folderContent.style.display === 'block' ? 'none' : 'block';
                }
            });
        }

        var links = folder.querySelectorAll('a');
        links.forEach(function(link) {
            link.addEventListener('click', function(event) {
                event.preventDefault();
                event.stopPropagation();

                var sections = document.querySelectorAll('.main-content .content-section');
                sections.forEach(function(section) {
                    section.style.display = 'none';
                });

                var sectionId = link.getAttribute('href');
                var section = document.querySelector(sectionId);
                if (section) {
                    section.style.display = 'block';
                }
            });
        });
    });

    // Handle hamburger menu toggle
    var menuToggle = document.getElementById('menu-toggle');
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            document.body.classList.toggle('sidebar-closed');
        });
    }
});

document.querySelectorAll('.sidebar .folder-name').forEach(folderTitle => {
    folderTitle.addEventListener('click', function() {
        this.parentElement.classList.toggle('folder-open');
        // Toggle the visibility of the folder content
        this.nextElementSibling.style.display = this.parentElement.classList.contains('folder-open') ? 'block' : 'none';
    });
});

