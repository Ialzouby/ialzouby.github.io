    function addCourseField() {
        var container = document.getElementById('courseContainer');
        var newField = document.createElement('input');
        newField.setAttribute('type', 'text');
        newField.setAttribute('name', 'course');
        container.appendChild(newField);

        var deleteButton = document.createElement('button');
        deleteButton.innerHTML = 'Delete';
        deleteButton.type = 'button'; // Prevent form submission
        deleteButton.onclick = function() {
            container.removeChild(newField);
            container.removeChild(deleteButton);
        };
        container.appendChild(deleteButton);
    }

    document.addEventListener('DOMContentLoaded', function() {
        document.getElementById('introForm').addEventListener('submit', function(e) {
            e.preventDefault(); // Prevents default form submission

            var resultsSection = document.getElementById('resultsSection');
            var imageFile = this.image.files[0];
            var reader = new FileReader();

            if (imageFile) {
                reader.onload = function(e) {
                    displayResults.call(this, e.target.result);
                }.bind(this);
                reader.readAsDataURL(imageFile);
            } else {
                displayResults.call(this);
            }
        });
    });

    function displayResults(imageUrl = '') {
        var resultsSection = document.getElementById('resultsSection');
        resultsSection.innerHTML = ''; // Clear previous results

        var outputHtml = `
            <h2>${this.name.value}'s Introduction</h2>
            ${imageUrl ? `<div class="img-wrapper">
                <figure>
                    <img src="${imageUrl}" alt="${this.caption.value}">
                    <figcaption>${this.caption.value}</figcaption>
                </figure>
            </div>` : ''}
            <ul>
                <li><strong>Name:</strong> ${this.name.value}</li>
                <li><strong>Mascot:</strong> ${this.mascot.value}</li>
                <li><strong>Personal Background:</strong> ${this.personalBackground.value}</li>
                <li><strong>Professional Background:</strong> ${this.professionalBackground.value}</li>
                <li><strong>Academic Background:</strong> ${this.academicBackground.value}</li>
                <li><strong>Background in Web Development:</strong> ${this.webDevBackground.value}</li>
                <li><strong>Primary Computer Platform:</strong> ${this.primaryPlatform.value}</li>
                <li><strong>Funny Thing:</strong> ${this.funny.value}</li>
                <li><strong>Additional Information:</strong> ${this.anythingElse.value}</li>
                <li><strong>Courses:</strong><ul>`;
        
        var courses = this.querySelectorAll('[name="course"]');
        courses.forEach(course => {
            outputHtml += `<li>${course.value}</li>`;
        });

        outputHtml += `</ul></li></ul>`;
        resultsSection.innerHTML = outputHtml;
    }
