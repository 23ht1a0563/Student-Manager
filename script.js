// Get Elements
const nameInput = document.getElementById("name");
const ageInput = document.getElementById("age");
const courseInput = document.getElementById("course");
const addBtn = document.getElementById("addBtn");
const searchInput = document.getElementById("search");
const studentTable = document.getElementById("studentTable");
const studentCount = document.getElementById("studentCount");
const noData = document.getElementById("noData");

// Load students from Local Storage
let students = JSON.parse(localStorage.getItem("students")) || [];
let editIndex = -1;

// Display Students
function displayStudents(list = students) {

    studentTable.innerHTML = "";

    if (list.length === 0) {
        noData.style.display = "block";
    } else {
        noData.style.display = "none";
    }

    list.forEach((student, index) => {

        studentTable.innerHTML += `
        <tr>
            <td>${student.name}</td>
            <td>${student.age}</td>
            <td>${student.course}</td>
            <td>
                <button class="edit-btn" onclick="editStudent(${index})">
                    Edit
                </button>

                <button class="delete-btn" onclick="deleteStudent(${index})">
                    Delete
                </button>
            </td>
        </tr>
        `;
    });

    studentCount.textContent = students.length;

    localStorage.setItem("students", JSON.stringify(students));
}

// Add Student
addBtn.addEventListener("click", () => {

    const name = nameInput.value.trim();
    const age = ageInput.value.trim();
    const course = courseInput.value.trim();

    if (name === "" || age === "" || course === "") {
        alert("Please fill all fields");
        return;
    }

    if (editIndex === -1) {

        students.push({
            name,
            age,
            course
        });

    } else {

        students[editIndex] = {
            name,
            age,
            course
        };

        editIndex = -1;
        addBtn.textContent = "Add Student";
    }

    nameInput.value = "";
    ageInput.value = "";
    courseInput.value = "";

    displayStudents();

});

// Delete Student
function deleteStudent(index) {

    if (confirm("Delete this student?")) {

        students.splice(index, 1);

        displayStudents();

    }

}

// Edit Student
function editStudent(index) {

    nameInput.value = students[index].name;
    ageInput.value = students[index].age;
    courseInput.value = students[index].course;

    editIndex = index;

    addBtn.textContent = "Update Student";

}

// Search Student
searchInput.addEventListener("keyup", () => {

    const value = searchInput.value.toLowerCase();

    const filtered = students.filter(student =>

        student.name.toLowerCase().includes(value)

    );

    displayStudents(filtered);

});

// Initial Display
displayStudents();