document.addEventListener('DOMContentLoaded', function() {

    // Toggle dark/light mode
    var modeToggle = document.getElementById('modeToggle');
    var toggleIcon = document.getElementById('toggleIcon');
    modeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        toggleIcon.src = document.body.classList.contains('dark-mode') ? '../../images/dark.png' : '../../images/light.png';
    });

    // Add the 'active' class to trigger the fade-in animation



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

    // Helper functions for search functionality
    function highlightOccurrences(node, searchText) {
        removeAllHighlights();
        var walk = document.createTreeWalker(node, NodeFilter.SHOW_TEXT, null, false);
        var textNodes = [];
        while (walk.nextNode()) textNodes.push(walk.currentNode);
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

    document.querySelectorAll('.navbar-title').forEach(fileItem => {
        fileItem.addEventListener('click', function() {
            // Close or hide the entire sidebar
            document.querySelector('.sidebar').style.display = 'none';
        });
    });

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

    // Initialize folder toggle event listeners directly on each folder name
    function initializeFolderToggle() {
        document.querySelectorAll('.folder-name').forEach(folderName => {
            folderName.addEventListener('click', function() {
                const folder = folderName.closest('.folder');
                const folderContent = folder.querySelector('.folder-content');
                folder.classList.toggle('open');
                folderContent.style.display = folder.classList.contains('open') ? 'block' : 'none';
            });
        });
    }

    document.body.addEventListener('click', function(event) {
        // Check if a folder name was clicked
        if (event.target.classList.contains('folder-name')) {
            const folder = event.target.closest('.folder');
            toggleFolder(folder);
        }
        // Check if a link inside a folder was clicked
        else if (event.target.tagName === 'A' && event.target.closest('.folder')) {
            const folder = event.target.closest('.folder');
            keepFolderOpen(folder);
        }
    });

    // Function to toggle a folder's open state
    function toggleFolder(folder) {
        const folderContent = folder.querySelector('.folder-content');
        folder.classList.toggle('open');
        folderContent.style.display = folder.classList.contains('open') ? 'block' : 'none';
    }

    // Function to keep a folder open
    function keepFolderOpen(selectedFolder) {
        document.querySelectorAll('.folder').forEach(folder => {
            if (folder !== selectedFolder) {
                folder.classList.remove('open');
                folder.querySelector('.folder-content').style.display = 'none';
            }
        });
        selectedFolder.classList.add('open');
        selectedFolder.querySelector('.folder-content').style.display = 'block';
    }

    loadNavbar();

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
});
