// ADD STUDENT FORM HANDLER
const form = document.getElementById('studentForm');
if (form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const photoInput = document.getElementById('photo');

        if (photoInput.files.length > 0) {
            const file = photoInput.files[0];
            const reader = new FileReader();

            reader.onloadend = function() {
                const photoData = reader.result; // Base64 string
                saveStudent(photoData);
            };

            reader.readAsDataURL(file);
        } else {
            saveStudent("");
        }
    });
}

function saveStudent(photoData) {
    const student = {
        date: document.getElementById('date').value,
        name: document.getElementById('name').value,
        age: document.getElementById('age').value,
        class: document.getElementById('class').value,
        gender: document.getElementById('gender').value,
        email: document.getElementById('email').value,
        photo: photoData
    };

    let students = JSON.parse(localStorage.getItem('students')) || [];
    students.push(student);
    localStorage.setItem('students', JSON.stringify(students));

    alert("Student added successfully!");
    form.reset();
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
        <td>${student.date}</td>
        <td>${student.name}</td>
        <td>${student.age}</td>
        <td>${student.class}</td>
        <td>${student.gender}</td>
        <td>${student.email}</td>
        <td>${student.photo ? `<img src="${student.photo}" alt="Photo" width="50">` : "No Photo"}</td>
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
  students.splice(index, 1);
  localStorage.setItem('students', JSON.stringify(students));
  loadStudents();
}

// EDIT STUDENT
function editStudent(index) {
  let students = JSON.parse(localStorage.getItem('students')) || [];
  const student = students[index];

  const newDate = prompt("Edit Date:", student.date);
  const newName = prompt("Edit Name:", student.name);
  const newAge = prompt("Edit Age:", student.age);
  const newClass = prompt("Edit Class:", student.class);
  const newGender = prompt("Edit Gender:", student.gender);
  const newEmail = prompt("Edit Email:", student.email);

  students[index] = {
    date: newDate || student.date,
    name: newName || student.name,
    age: newAge || student.age,
    class: newClass || student.class,
    gender: newGender || student.gender,
    email: newEmail || student.email,
    photo: student.photo // photo editing not via prompt
  };

  localStorage.setItem('students', JSON.stringify(students));
  loadStudents();
}

// Call loadStudents when view.html is opened
if (document.getElementById('studentsTable')) {
  loadStudents();
}