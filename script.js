// Elements
const mobileToggle = document.getElementById('mobileToggle');
const navLinks = document.getElementById('navLinks');
const semesterButtons = document.querySelectorAll('.semester-btn');
const coursesGrid = document.getElementById('coursesGrid');
const courseModal = document.getElementById('courseModal');
const closeModal = document.getElementById('closeModal');

// Toggle mobile navigation menu
mobileToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// Filter courses by semester
semesterButtons.forEach(button => {
  button.addEventListener('click', () => {
    semesterButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    filterCourses(button.dataset.semester);
  });
});

// Filter courses based on selected semester
function filterCourses(semester) {
  const allCourses = getAllCourses(); // This should fetch your actual course data
  const filteredCourses = semester === 'all'
    ? allCourses
    : allCourses.filter(course => course.semester === semester);
  renderCourses(filteredCourses);
}

// Render the filtered courses in the grid
function renderCourses(courses) {
  coursesGrid.innerHTML = '';
  courses.forEach(course => {
    const courseCard = document.createElement('div');
    courseCard.classList.add('course-card');
    courseCard.innerHTML = `
      <h3>${course.title}</h3>
      <p>Code: ${course.code}</p>
      <button class="view-course" data-course-id="${course.id}">View Details</button>
    `;
    coursesGrid.appendChild(courseCard);
  });
}

// Open course modal and populate with course data
document.addEventListener('click', (e) => {
  if (e.target && e.target.classList.contains('view-course')) {
    const courseId = e.target.dataset.courseId;
    const course = getCourseById(courseId); // This should fetch the course data
    openCourseModal(course);
  }
});

// Open modal with course details
function openCourseModal(course) {
  document.getElementById('modalTitle').textContent = course.title;
  document.getElementById('modalCode').textContent = course.code;
  document.getElementById('modalSemester').textContent = `Semester: ${course.semester}`;
  document.getElementById('modalGrade').textContent = `Grade: ${course.grade}`;
  document.getElementById('modalDescription').textContent = course.description;
  const skillsContainer = document.getElementById('modalSkills');
  skillsContainer.innerHTML = '';
  course.skills.forEach(skill => {
    const skillTag = document.createElement('span');
    skillTag.classList.add('skill-tag');
    skillTag.textContent = skill;
    skillsContainer.appendChild(skillTag);
  });
  const projectsContainer = document.getElementById('modalProjects');
  projectsContainer.innerHTML = '';
  course.projects.forEach(project => {
    const projectItem = document.createElement('div');
    projectItem.classList.add('project-item');
    projectItem.textContent = project;
    projectsContainer.appendChild(projectItem);
  });
  courseModal.classList.add('active');
}

// Close the course modal
closeModal.addEventListener('click', () => {
  courseModal.classList.remove('active');
});

// Example of course data structure (you can modify it as per your needs)
function getAllCourses() {
  return [
    {
      id: 1,
      title: 'Introduction to Programming',
      code: 'CS101',
      semester: 'semester1',
      grade: 'A',
      description: 'Learn the basics of programming in Python.',
      skills: ['Python', 'Problem Solving'],
      projects: ['Project 1', 'Project 2']
    },
    {
      id: 2,
      title: 'Data Structures and Algorithms',
      code: 'CS201',
      semester: 'semester2',
      grade: 'B',
      description: 'Learn data structures and algorithms in Java.',
      skills: ['Java', 'Data Structures'],
      projects: ['Project 1', 'Project 2']
    }
    // Add more courses as needed
  ];
}

// Get course by ID (for modal display)
function getCourseById(courseId) {
  return getAllCourses().find(course => course.id === parseInt(courseId));
}
