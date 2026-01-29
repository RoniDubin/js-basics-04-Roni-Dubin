// ---------------------------------------------------------
// DATA STRUCTURES
// ---------------------------------------------------------
const courses = [
  { id: 1, title: "Intro to CS in Java", credits: 6 },
  { id: 2, title: "Linear Algebra 1", credits: 7 },
  { id: 3, title: "Discrete Mathematics", credits: 4 },
  { id: 4, title: "Programming Systems Workshop", credits: 4 },
  { id: 5, title: "Linear Algebra 2", credits: 5 },
  { id: 6, title: "Calculus 1", credits: 7 },
];

const students = [
  {
    id: 1,
    name: "Alice Brown",
    grades: [
      { grade: 98, course: 1 },
      { grade: 95, course: 4 },
      { grade: 92, course: 2 },
      { grade: 90, course: 6 },
    ],
  },
  {
    id: 2,
    name: "Bob Smith",
    grades: [
      { grade: 80, course: 1 },
      { grade: 100, course: 3 },
      { grade: 95, course: 5 },
    ],
  },
  {
    id: 3,
    name: "Charlie Johnson",
    grades: [
      { grade: 91, course: 1 },
      { grade: 60, course: 3 },
      { grade: 61, course: 4 },
    ],
  },
  {
    id: 4,
    name: "Dana Levi",
    grades: [
      { grade: 88, course: 2 },
      { grade: 85, course: 4 },
      { grade: 87, course: 1 },
      { grade: 89, course: 6 },
    ],
  },
  {
    id: 5,
    name: "Emilia Garcia",
    grades: [
      { grade: 61, course: 3 },
      { grade: 60, course: 1 },
      { grade: 75, course: 4 },
    ],
  },
  {
    id: 6,
    name: "Frank O'Connor",
    grades: [
      { grade: 100, course: 4 },
      { grade: 100, course: 1 },
      { grade: 100, course: 5 },
    ],
  },
  {
    id: 7,
    name: "Gina Kim",
    grades: [
      { grade: 84, course: 2 },
      { grade: 79, course: 3 },
      { grade: 88, course: 4 },
      { grade: 81, course: 6 },
      { grade: 90, course: 1 },
    ],
  },
  {
    id: 8,
    name: "Hacker Man",
    grades: [
      { grade: 94, course: 1 },
      { grade: 91, course: 4 },
      { grade: 91, course: 2 },
    ],
  },
  {
    id: 9,
    name: "Ivy Chen",
    grades: [
      { grade: 95, course: 4 },
      { grade: 94, course: 1 },
      { grade: 91, course: 3 },
    ],
  },
  {
    id: 10,
    name: "John Long",
    grades: [
      { grade: 91, course: 4 },
      { grade: 94, course: 1 },
    ],
  },
];

// ---------------------------------------------------------
// HELPER: GET STUDENT AVERAGE
// Only counts grades > 60. Returns 0 if no courses passed.
// ---------------------------------------------------------

function gestStudentAvarage(student) {
  let sum = 0;
  let count = 0;

  for (let i = 0; i < student.grades.length; i++) {
    if (student.grades[i].grade > 60) {
      sum += student.grades[i].grade;
      count++;
    }
  }

  if (count == 0) return 0;

  return sum / count;
}

// ---------------------------------------------------------
// 1. ADD STUDENT
// ---------------------------------------------------------

function addStudent(name, gradesList) {
  let passIntroInJava = false;
  let passProgramingSystems = false;

  for (let i = 0; i < gradesList[i].length; i++) {
    let g = gradesList[i];
    g.grade = Math.round(g.grade);

    if (g < 0 || g > 100) {
      console.log("Error: Grade must be between 0-100");
      return;
    }

    if (g.course === 1 && g.grade > 60) passIntroInJava = true;
    if (g.course === 4 && g.grade > 60) passIntroInJava = true;
  }

  if (!passIntroInJava || !passProgramingSystems) {
    console.log("Error: Missing prerequisites");
    return;
  }

  let maxId = 0;
  for (i = 0; i < students.length; i++) {
    if (students[i].id > maxId) maxId = students[i].id;
  }

  students.push({ id: maxId + 1, name: name, grades: gradesList });
}

// ---------------------------------------------------------
// 2. analyze performance
// ---------------------------------------------------------

function analyzePerformance(StudentId) {
  let student = null;
  for (let i = 0; i < students.length; i++) {
    if (students[i].id == StudentId) student = students[i];
    break;
  }

  if ((student = null)) return null;

  let avg = gestStudentAvarage(student);

  let exceptional_grade = false;
  for (let i = 0; i < student.grades.length; i++) {
    if (student.grades[i].grade > avg + 20) exceptional_grade = true;
    break;
  }

  let significant_improvement = false;
  if (student.grades.length >= 2) {
    if (
      student.grades[student.grades.length - 1].grade > avg &&
      student.grades[student.grades.length - 2].grade > avg
    )
      significant_improvement = true;
  }

  return {
    avarage: avg,
    has_exceptional_grade: exceptional_grade,
    has_significant_improvement: significant_improvement,
  };
}

// ---------------------------------------------------------
// 3. IDENTIFY COPYING
// ---------------------------------------------------------

function identityCopying() {
  foundMatch = false;
  for (let i = 0; i < students.length; i++) {
    for (let j = i + 1; j < students.length; j++) {
      let s1 = students[i];
      let s2 = students[j];
      let counter = 0;

      for (let k = 0; k < s1.grades.length; k++) {
        for (let m = 0; m < s2.grades.length; m++) {
          if (
            s1.grades[k].course == s2.grades[m].course &&
            s1.grades[k].grade == s2.grades[m].grade
          ) {
            counter++;
            break;
          }
        }

        if (counter == 2) {
          console.log(s1.name + "_" + s2.name);
          foundMatch = true;
          break;
        }
      }
    }
  }
  if (!foundMatch) console.log("No suspicious pairs found");
}

// ---------------------------------------------------------
// 4. RANK STUDENTS
// ---------------------------------------------------------

function rankStudents() {
  let sortedList = [];
  for (let i = 0; i < students.length; i++) {
    sortedList.push(students[i]);
  }

  sortedList.sort(function (a, b) {
    let avgA = gestStudentAvarage(a);
    let avgB = gestStudentAvarage(b);

    if (avgA != avgB) {
      return avgB - avgA;
    }

    let passedA = 0;
    for (let i = 0; i < a.grades.length; i++) {
      if (a.grades[i].grade > 60) passedA++;
    }

    let passedB = 0;
    for (let i = 0; i < b.grades.length; i++) {
      if (b.grades[i].grade > 60) passedB++;
    }

    if (passedA != passedB) return passedB - passedA;

    if (a.name < b.name) return -1;

    if (a.name > b.name) return 1;

    return 0;
  });

  return sortedList;
}

// ---------------------------------------------------------
// 5. GRADE DROP
// ---------------------------------------------------------

function gradeDrop() {
  let studentsList = [];
  for (let i = 0; i < students.length; i++) {
    avg = gestStudentAvarage(students[i]);
    if (avg < 70) studentsList.push(students[i]);
    else if (
      students[i].grades[students[i].grades.length - 1] < avg &&
      students[i].grades[students[i].grades.length - 2] < avg
    )
      studentsList.push(students[i]);
  }

  return studentsList;
}
