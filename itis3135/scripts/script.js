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
    const children = Array.from(node.childNodes);
    children.forEach(function(child) {
        if (child.nodeType === 3) { // Text node
            const matches = child.nodeValue.match(new RegExp(searchText, 'gi'));
            if (matches) {
                const frag = document.createDocumentFragment();
                let lastIdx = 0;
                child.nodeValue.replace(new RegExp(searchText, 'gi'), (match, idx) => {
                    const part = document.createTextNode(child.nodeValue.slice(lastIdx, idx));
                    const highlighted = document.createElement('span');
                    highlighted.className = 'highlight';
                    highlighted.textContent = match;
                    frag.appendChild(part);
                    frag.appendChild(highlighted);
                    lastIdx = idx + match.length;
                });
                frag.appendChild(document.createTextNode(child.nodeValue.slice(lastIdx)));
                child.parentNode.replaceChild(frag, child);
            }
        } else if (child.nodeType === 1 && !['SCRIPT', 'STYLE'].includes(child.tagName)) { // Element node
            highlightOccurrences(child, searchText);
        }
    });
}

function removeAllHighlights() {
    var highlights = document.querySelectorAll('.highlight');
    highlights.forEach(function(highlight) {
        highlight.parentNode.replaceChild(document.createTextNode(highlight.textContent), highlight);
    });
}

function debounce(func, wait, immediate) {
    var timeout;
    return function() {
        var context = this, args = arguments;
        var later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (immediate && !timeout) func.apply(context, args);
    };
}
