let persons = [];
let salaries = [];

window.onload = function() {
    document.getElementById('employeeSelect').focus();
};

function addSalary() {
    const person = document.getElementById('employeeSelect').value;
    const salary = parseFloat(document.getElementById('salaryInput').value);

    if (!person || isNaN(salary) || salary <= 0) {
        alert('Please enter a valid name and a positive numeric salary.');
        return;
    }

    persons.push(person);
    salaries.push(salary);

    document.getElementById('salaryInput').value = '';
    document.getElementById('employeeSelect').focus();

    displaySalary();
}

function displayResults() {
    if (salaries.length === 0) {
        alert('No salary data available.');
        return;
    }

    const totalSalary = salaries.reduce((acc, salary) => acc + salary, 0);
    const averageSalary = totalSalary / salaries.length;
    const highestSalary = Math.max(...salaries);

    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = `<h2>Results</h2>
                            <p>Average Salary: $${averageSalary.toFixed(2)}</p>
                            <p>Highest Salary: $${highestSalary.toFixed(2)}</p>`;
}

function displaySalary() {
    const table = document.getElementById('results_table');
    let tableHTML = '<tr><th>Name</th><th>Salary</th></tr>';

    for (let i = 0; i < persons.length; i++) {
        tableHTML += `<tr><td>${persons[i]}</td><td>$${salaries[i].toFixed(2)}</td></tr>`;
    }

    table.innerHTML = tableHTML;
}
