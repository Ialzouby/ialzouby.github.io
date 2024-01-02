document.addEventListener('DOMContentLoaded', function() {

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

    // Add this code here to close all folders initially
    var folderContents = document.querySelectorAll('.folder .folder-content');
    folderContents.forEach(function(folderContent) {
        folderContent.style.display = 'none'; // This line ensures that the folder contents are not displayed initially
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

document.getElementById('searchButton').addEventListener('click', function() {
    var searchBar = document.getElementById('searchBarContainer');
    searchBar.style.display = searchBar.style.display === 'none' ? 'block' : 'none';
    document.getElementById('searchInput').focus(); // Focus on the search input when it appears
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
