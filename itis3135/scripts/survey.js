document.getElementById('introForm').onsubmit = function(event) {

    event.preventDefault();

   
    console.log("Form Submitted");
};

function addCourseField() {
    var container = document.getElementById('courseContainer');
    var newField = document.createElement('input');
    newField.setAttribute('type', 'text');
    newField.setAttribute('name', 'course');
    container.appendChild(newField);

    var deleteButton = document.createElement('button');
    deleteButton.innerHTML = 'Delete';
    deleteButton.onclick = function() {
        container.removeChild(newField);
        container.removeChild(deleteButton);
    };
    container.appendChild(deleteButton);
}
