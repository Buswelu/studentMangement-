// ADD STUDENT FORM HANDLER
const form = document.getElementById('studentForm');
if (form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const student = {
            name: document.getElementById('name').value,
            age: document.getElementById('age').value,
            class: document.getElementById('class').value,
            gender: document.getElementById('gender').value,
            email: document.getElementById('email').value
        };

        let students = JSON.parse(localStorage.getItem('students')) || [];
        students.push(student);
        localStorage.setItem('students', JSON.stringify(students));

        alert("Student added successfully!");
        form.reset();
    });
}

// VIEW STUDENTS HANDLER
function loadStudents() {
    const students = JSON.parse(localStorage.getItem('students')) || [];
    const tableBody = document.querySelector('#studentsTable tbody');

    if (tableBody) {
        tableBody.innerHTML = "";
        students.forEach((student, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
        <td>${student.name}</td>
        <td>${student.age}</td>
        <td>${student.class}</td>
        <td>${student.gender}</td>
        <td>${student.email}</td>
        <td>
          <button onclick="editStudent(${index})">Edit</button>
          <button onclick="deleteStudent(${index})">Delete</button>
        </td>
      `;
            tableBody.appendChild(row);
        });
    }
}

// DELETE STUDENT
function deleteStudent(index) {
    let students = JSON.parse(localStorage.getItem('students')) || [];
    students.splice(index, 1); // remove student at index
    localStorage.setItem('students', JSON.stringify(students));
    loadStudents(); // reload table
}

// EDIT STUDENT
function editStudent(index) {
    let students = JSON.parse(localStorage.getItem('students')) || [];
    const student = students[index];

    // Prompt user to edit details
    const newName = prompt("Edit Name:", student.name);
    const newAge = prompt("Edit Age:", student.age);
    const newClass = prompt("Edit Class:", student.class);
    const newGender = prompt("Edit Gender:", student.gender);
    const newEmail = prompt("Edit Email:", student.email);

    // Update student object
    students[index] = {
        name: newName || student.name,
        age: newAge || student.age,
        class: newClass || student.class,
        gender: newGender || student.gender,
        email: newEmail || student.email
    };

    localStorage.setItem('students', JSON.stringify(students));
    loadStudents(); // reload table
}

// Call loadStudents when view.html is opened
if (document.getElementById('studentsTable')) {
    loadStudents();
}