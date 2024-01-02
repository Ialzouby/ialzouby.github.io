document.addEventListener('DOMContentLoaded', function() {

    // Toggle dark/light mode
    var modeToggle = document.getElementById('modeToggle');
    var toggleIcon = document.getElementById('toggleIcon');

    modeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        
        if (document.body.classList.contains('dark-mode')) {
            toggleIcon.src = 'images/dark.png'; // Path to your dark mode icon
        } else {
            toggleIcon.src = 'images/light.png'; // Path to your moon icon
        }
    });

    // Handle folders opening and closing
    var folders = document.querySelectorAll('.folder');
    folders.forEach(function(folder) {
        var folderName = folder.querySelector('.folder-name');
        if (folderName) {
            folderName.addEventListener('click', function() {
                folder.classList.toggle('open');
                var folderContent = folder.querySelector('.folder-content');
                if (folderContent) {
                    folderContent.style.display = folder.classList.contains('open') ? 'block' : 'none';
                }
            });
        }
    });

    // Close all folders initially
    var folderContents = document.querySelectorAll('.folder .folder-content');
    folderContents.forEach(function(folderContent) {
        folderContent.style.display = 'none';
    });

    // Handle hamburger menu toggle
    var menuToggle = document.getElementById('menu-toggle');
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            document.body.classList.toggle('sidebar-closed');
        });
    }

    // Handle sidebar folder opening/closing
    document.querySelectorAll('.sidebar .folder-name').forEach(folderTitle => {
        folderTitle.addEventListener('click', function() {
            this.parentElement.classList.toggle('folder-open');
            this.nextElementSibling.style.display = this.parentElement.classList.contains('folder-open') ? 'block' : 'none';
        });
    });

    document.querySelectorAll('.sidebar .folder .folder-content a').forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent default anchor behavior

            // Hide all content sections in the main content area
            document.querySelectorAll('.main-content .content-section').forEach(section => {
                section.style.display = 'none';
            });

            // Get the ID of the content section to display
            var sectionId = this.getAttribute('href');

            // Display the linked content section
            var sectionToShow = document.querySelector(sectionId);
            if (sectionToShow) {
                sectionToShow.style.display = 'block';
            }
        });
    });

    // Handle search functionality
    document.getElementById('searchButton').addEventListener('click', function() {
        var searchBar = document.getElementById('searchBarContainer');
        searchBar.style.display = searchBar.style.display === 'none' ? 'block' : 'none';
        document.getElementById('searchInput').focus();
    });

    document.getElementById('searchInput').addEventListener('input', debounce(function() {
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
            navigator.clipboard.writeText(codeBlock.textContent).then(() => {
                btn.textContent = 'Copied!';
                setTimeout(() => { btn.textContent = 'Copy'; }, 2000);
            });
        });
    });
});
