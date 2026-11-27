import { db } from "@/prisma/db";

async function main() {
  // ADMIN
  await db.orm.public.Admin.create({
    id: "admin1",
    username: "admin1",
  });

  await db.orm.public.Admin.create({
    id: "admin2",
    username: "admin2",
  });

  // GRADE
  const grades = [];

  for (let i = 1; i <= 6; i++) {
    const grade = await db.orm.public.Grade.create({
      level: i,
    });

    grades.push(grade);
  }

  // SUBJECT
  const subjectData = [
    "Mathematics",
    "Science",
    "English",
    "History",
    "Geography",
    "Physics",
    "Chemistry",
    "Biology",
    "Computer Science",
    "Art",
  ];

  const subjects = [];

  for (const name of subjectData) {
    const subject = await db.orm.public.Subject.create({ name });
    subjects.push(subject);
  }

  // TEACHER
  const teachers = [];

  for (let i = 1; i <= 15; i++) {
    const teacher = await db.orm.public.Teacher.create({
      id: `teacher${i}`,
      username: `teacher${i}`,
      name: `TName${i}`,
      surname: `TSurname${i}`,
      email: `teacher${i}@example.com`,
      phone: `123-456-789${i}`,
      address: `Address${i}`,
      bloodType: "A+",
      sex: i % 2 === 0 ? "MALE" : "FEMALE",
      birthday: new Date(
        new Date().setFullYear(new Date().getFullYear() - 30),
      ),
    });

    teachers.push(teacher);
  }

  // TEACHER SUBJECT
  for (let i = 0; i < teachers.length; i++) {
    await db.orm.public.TeacherSubject.create({
      teacherId: teachers[i].id,
      subjectId: subjects[i % subjects.length].id,
    });
  }

  // CLASS
  const classes = [];

  for (let i = 0; i < 6; i++) {
    const schoolClass = await db.orm.public.Class.create({
      name: `${i + 1}A`,
      gradeId: grades[i].id,
      capacity: Math.floor(Math.random() * 6) + 15,
      supervisorId: teachers[i].id,
    });

    classes.push(schoolClass);
  }

  // LESSON
  const days = [
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
  ] as const;

  const lessons = [];

  for (let i = 1; i <= 30; i++) {
    const lesson = await db.orm.public.Lesson.create({
      name: `Lesson${i}`,
      day: days[Math.floor(Math.random() * days.length)],
      startTime: new Date(
        new Date().setHours(new Date().getHours() + 1),
      ),
      endTime: new Date(
        new Date().setHours(new Date().getHours() + 3),
      ),
      subjectId: subjects[i % subjects.length].id,
      classId: classes[i % classes.length].id,
      teacherId: teachers[i % teachers.length].id,
    });

    lessons.push(lesson);
  }

  // PARENT
  const parents = [];

  for (let i = 1; i <= 25; i++) {
    const parent = await db.orm.public.Parent.create({
      id: `parentId${i}`,
      username: `parentId${i}`,
      name: `PName ${i}`,
      surname: `PSurname ${i}`,
      email: `parent${i}@example.com`,
      phone: `123-456-789${i}`,
      address: `Address${i}`,
    });

    parents.push(parent);
  }

  // STUDENT
  const students = [];

  for (let i = 1; i <= 50; i++) {
    const student = await db.orm.public.Student.create({
      id: `student${i}`,
      username: `student${i}`,
      name: `SName${i}`,
      surname: `SSurname ${i}`,
      email: `student${i}@example.com`,
      phone: `987-654-321${i}`,
      address: `Address${i}`,
      bloodType: "O-",
      sex: i % 2 === 0 ? "MALE" : "FEMALE",
      parentId: parents[Math.floor((i - 1) / 2)].id,
      gradeId: grades[(i - 1) % grades.length].id,
      classId: classes[(i - 1) % classes.length].id,
      birthday: new Date(
        new Date().setFullYear(new Date().getFullYear() - 10),
      ),
    });

    students.push(student);
  }

  // EXAM
  const exams = [];

  for (let i = 1; i <= 10; i++) {
    const exam = await db.orm.public.Exam.create({
      title: `Exam ${i}`,
      startTime: new Date(
        new Date().setHours(new Date().getHours() + 1),
      ),
      endTime: new Date(
        new Date().setHours(new Date().getHours() + 2),
      ),
      lessonId: lessons[(i - 1) % lessons.length].id,
    });

    exams.push(exam);
  }

  // ASSIGNMENT
  const assignments = [];

  for (let i = 1; i <= 10; i++) {
    const assignment = await db.orm.public.Assignment.create({
      title: `Assignment ${i}`,
      startDate: new Date(
        new Date().setHours(new Date().getHours() + 1),
      ),
      dueDate: new Date(
        new Date().setDate(new Date().getDate() + 1),
      ),
      lessonId: lessons[(i - 1) % lessons.length].id,
    });

    assignments.push(assignment);
  }

  // RESULT
  for (let i = 1; i <= 10; i++) {
    await db.orm.public.Result.create({
      score: 90,
      studentId: students[i - 1].id,
      ...(i <= 5
        ? { examId: exams[i - 1].id }
        : { assignmentId: assignments[i - 6].id }),
    });
  }

  // ATTENDANCE
  for (let i = 1; i <= 10; i++) {
    await db.orm.public.Attendance.create({
      date: new Date(),
      present: true,
      studentId: students[i - 1].id,
      lessonId: lessons[i % lessons.length].id,
    });
  }

  // EVENT
  for (let i = 1; i <= 5; i++) {
    await db.orm.public.Event.create({
      title: `Event ${i}`,
      description: `Description for Event ${i}`,
      startTime: new Date(
        new Date().setHours(new Date().getHours() + 1),
      ),
      endTime: new Date(
        new Date().setHours(new Date().getHours() + 2),
      ),
      classId: classes[i % classes.length].id,
    });
  }

  // ANNOUNCEMENT
  for (let i = 1; i <= 5; i++) {
    await db.orm.public.Announcement.create({
      title: `Announcement ${i}`,
      description: `Description for Announcement ${i}`,
      date: new Date(),
      classId: classes[i % classes.length].id,
    });
  }

  console.log("Seeding completed successfully.");
}

main()
  .catch((error) => {
    console.error("Seeding failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await db.close();
  });