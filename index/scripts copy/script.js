document.addEventListener('DOMContentLoaded', function() {

    // Toggle dark/light mode
    var modeToggle = document.getElementById('modeToggle');
    var toggleIcon = document.getElementById('toggleIcon');

    if (window.innerWidth < 768) {
        document.body.classList.add('sidebar-closed');
    }



    modeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        
        if (document.body.classList.contains('dark-mode')) {
            toggleIcon.src = 'images/dark.png'; // Path to your dark mode icon
        } else {
            toggleIcon.src = 'images/light.png'; // Path to your light mode icon
        }
    });

    // Handle folders opening and closing
    var folders = document.querySelectorAll('.folder');
    folders.forEach(function(folder) {
        var folderName = folder.querySelector('.folder-name');
        folderName.addEventListener('click', function() {
            folder.classList.toggle('open');
            var folderContent = folder.querySelector('.folder-content');
            folderContent.style.display = folder.classList.contains('open') ? 'block' : 'none';
        });

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

    // Close all folders initially
    folders.forEach(function(folder) {
        var folderContent = folder.querySelector('.folder-content');
        folderContent.style.display = 'none';
    });

    // Handle hamburger menu toggle
    var menuToggle = document.getElementById('menu-toggle');
    menuToggle.addEventListener('click', function() {
        document.body.classList.toggle('sidebar-closed');
    });

    // Handle search functionality
    var searchButton = document.getElementById('searchButton');
    var searchBar = document.getElementById('searchBarContainer');
    var searchInput = document.getElementById('searchInput');

    searchButton.addEventListener('click', function() {
        searchBar.style.display = searchBar.style.display === 'none' ? 'block' : 'none';
        searchInput.focus();
    });

    searchInput.addEventListener('input', debounce(function() {
        var searchText = this.value.toLowerCase();
        removeAllHighlights();
        if (searchText) {
            highlightOccurrences(document.body, searchText);
        }
    }, 250));

    function highlightOccurrences(node, searchText) {
        removeAllHighlights();
        var walk = document.createTreeWalker(node, NodeFilter.SHOW_TEXT, null, false);
        var textNodes = [];
        while(walk.nextNode()) textNodes.push(walk.currentNode);

        textNodes.forEach(function(node) {
            var nodeText = node.nodeValue;
            var startIndex = 0;
            var innerHTML = '';

            while (nodeText.toLowerCase().indexOf(searchText, startIndex) > -1) {
                var index = nodeText.toLowerCase().indexOf(searchText, startIndex);
                var matchText = nodeText.substring(index, index + searchText.length);
                innerHTML += nodeText.substring(startIndex, index) + '<span class="highlight">' + matchText + '</span>';
                startIndex = index + searchText.length;
            }

            innerHTML += nodeText.substring(startIndex);
            var frag = document.createDocumentFragment();
            var wrapper = document.createElement('div');
            wrapper.innerHTML = innerHTML;
            while (wrapper.firstChild) {
                frag.appendChild(wrapper.firstChild);
            }

            var parent = node.parentNode;
            parent.insertBefore(frag, node);
            parent.removeChild(node);
        });
    }

    function removeAllHighlights() {
        var highlights = document.querySelectorAll('.highlight');
        highlights.forEach(function(highlight) {
            highlight.outerHTML = highlight.textContent;
        });
    }

    function debounce(func, wait, immediate) {
        var timeout;
        return function() {
            var context = this, args = arguments;
            clearTimeout(timeout);
            timeout = setTimeout(function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            }, wait);
            if (immediate && !timeout) func.apply(context, args);
        };
    }

    // Copy to clipboard functionality
    document.querySelectorAll('.copy-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const codeBlock = document.querySelector(btn.getAttribute('data-copy-target'));
            if (codeBlock) {
                navigator.clipboard.writeText(codeBlock.textContent).then(() => {
                    btn.textContent = 'Copied!';
                    setTimeout(() => { btn.textContent = 'Copy'; }, 2000);
                });
            }
        });
    });





    // Handle sidebar link click for mobile view
    var sidebarLinks = document.querySelectorAll('.sidebar a');
    sidebarLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            if (window.innerWidth < 1025) {
                // Close the sidebar
                document.body.classList.toggle('sidebar-closed');
            }
        });
    });
});

// Additional code outside of DOMContentLoaded
if (window.innerWidth < 768) {
    document.body.classList.add('sidebar-closed');
}

document.getElementById('menu-toggle').addEventListener('click', function() {
    document.querySelector('.sidebar').classList.toggle('sidebar-closed');
});



