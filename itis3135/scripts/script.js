document.addEventListener('DOMContentLoaded', function() {
    // Toggle dark/light mode
    var modeToggle = document.getElementById('modeToggle');
    var toggleIcon = document.getElementById('toggleIcon');
    modeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        toggleIcon.src = document.body.classList.contains('dark-mode') ? 'images/dark.png' : 'images/light.png';
    });

    // Hamburger menu toggle
    var menuToggle = document.getElementById('menu-toggle');
    var sidebar = document.querySelector('.sidebar');
    menuToggle.addEventListener('click', function() {
        sidebar.classList.toggle('sidebar-open');
    });

    // Close sidebar button
    var closeSidebar = document.getElementById('close-sidebar');
    closeSidebar.addEventListener('click', function() {
        sidebar.classList.remove('sidebar-open');
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
    });

    // Close all folders initially
    var folderContents = document.querySelectorAll('.folder .folder-content');
    folderContents.forEach(function(folderContent) {
        folderContent.style.display = 'none';
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

    // Copy to clipboard functionality
    document.querySelectorAll('.copy-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const codeBlock = document.querySelector(this.getAttribute('data-copy-target'));
            navigator.clipboard.writeText(codeBlock.textContent).then(() => {
                this.textContent = 'Copied!';
                setTimeout(() => { this.textContent = 'Copy'; }, 2000);
            });
        });
    });

    // Utility functions
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

    // Sidebar link click event handling
    document.querySelectorAll('.sidebar-link').forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            var contentId = this.getAttribute('href');
            updateMainContent(contentId);
        });
    });

    function updateMainContent(contentId) {
        document.querySelectorAll('.content-section').forEach(section => {
            section.style.display = 'none';
        });

        var targetSection = document.querySelector(contentId);
        if (targetSection) {
            targetSection.style.display = 'block';
        }
    }
});
