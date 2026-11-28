
import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { Day, PrismaClient, UserSex } from "@prisma/client";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Starting database seeding...");

  // CLEAN DATABASE
  // Delete dependent records before their parent records.
  await prisma.result.deleteMany();
  await prisma.attendance.deleteMany();
  await prisma.exam.deleteMany();
  await prisma.assignment.deleteMany();
  await prisma.event.deleteMany();
  await prisma.announcement.deleteMany();
  await prisma.lesson.deleteMany();
  await prisma.student.deleteMany();
  await prisma.class.deleteMany();
  await prisma.teacher.deleteMany();
  await prisma.subject.deleteMany();
  await prisma.parent.deleteMany();
  await prisma.grade.deleteMany();
  await prisma.admin.deleteMany();

  // ADMIN
  await prisma.admin.createMany({
    data: [
      { id: "admin1", username: "admin1" },
      { id: "admin2", username: "admin2" },
    ],
  });

  // GRADE
  const grades = [];

  for (let i = 1; i <= 6; i++) {
    const grade = await prisma.grade.create({
      data: { level: i },
    });
    grades.push(grade);
  }

  // CLASS
  const classes = [];

  for (let i = 1; i <= 6; i++) {
    const schoolClass = await prisma.class.create({
      data: {
        name: `${i}A`,
        gradeId: grades[i - 1].id,
        capacity: Math.floor(Math.random() * 6) + 15,
      },
    });
    classes.push(schoolClass);
  }

  // SUBJECT
  const subjectNames = [
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

  for (const name of subjectNames) {
    const subject = await prisma.subject.create({
      data: { name },
    });
    subjects.push(subject);
  }

  // TEACHER
  const days = Object.values(Day);
  const teachers = [];

  for (let i = 1; i <= 15; i++) {
    const teacher = await prisma.teacher.create({
      data: {
        id: `teacher${i}`,
        username: `teacher${i}`,
        name: `TName${i}`,
        surname: `TSurname${i}`,
        email: `teacher${i}@example.com`,
        phone: `123-456-789${i}`,
        address: `Address${i}`,
        bloodType: "A+",
        sex: i % 2 === 0 ? UserSex.MALE : UserSex.FEMALE,

        subjects: {
          connect: [{ id: subjects[(i - 1) % 10].id }],
        },

        classes: {
          connect: [{ id: classes[(i - 1) % 6].id }],
        },

        birthday: new Date(1996, 0, 1),
      },
    });

    teachers.push(teacher);
  }

  // LESSON
  const lessons = [];

  for (let i = 1; i <= 30; i++) {
    const lesson = await prisma.lesson.create({
      data: {
        name: `Lesson${i}`,
        day: days[(i - 1) % days.length],
        startTime: new Date(2026, 10, 27, 9, 0),
        endTime: new Date(2026, 10, 27, 11, 0),
        subjectId: subjects[(i - 1) % 10].id,
        classId: classes[(i - 1) % 6].id,
        teacherId: teachers[(i - 1) % 15].id,
      },
    });

    lessons.push(lesson);
  }

  // PARENT
  const parents = [];

  for (let i = 1; i <= 25; i++) {
    const parent = await prisma.parent.create({
      data: {
        id: `parentId${i}`,
        username: `parentId${i}`,
        name: `PName ${i}`,
        surname: `PSurname ${i}`,
        email: `parent${i}@example.com`,
        phone: `123-456-789${i}`,
        address: `Address${i}`,
      },
    });

    parents.push(parent);
  }

  // STUDENT
  const students = [];

  for (let i = 1; i <= 50; i++) {
    const student = await prisma.student.create({
      data: {
        id: `student${i}`,
        username: `student${i}`,
        name: `SName${i}`,
        surname: `SSurname ${i}`,
        email: `student${i}@example.com`,
        phone: `987-654-321${i}`,
        address: `Address${i}`,
        bloodType: "O-",
        sex: i % 2 === 0 ? UserSex.MALE : UserSex.FEMALE,

        parentId: parents[Math.floor((i - 1) / 2)].id,
        gradeId: grades[(i - 1) % 6].id,
        classId: classes[(i - 1) % 6].id,

        birthday: new Date(2016, 0, 1),
      },
    });

    students.push(student);
  }

  // EXAM
  const exams = [];

  for (let i = 1; i <= 10; i++) {
    const exam = await prisma.exam.create({
      data: {
        title: `Exam ${i}`,
        startTime: new Date(2026, 10, 28, 9, 0),
        endTime: new Date(2026, 10, 28, 11, 0),
        lessonId: lessons[(i - 1) % 30].id,
      },
    });

    exams.push(exam);
  }

  // ASSIGNMENT
  const assignments = [];

  for (let i = 1; i <= 10; i++) {
    const assignment = await prisma.assignment.create({
      data: {
        title: `Assignment ${i}`,
        startDate: new Date(2026, 10, 27),
        dueDate: new Date(2026, 10, 29),
        lessonId: lessons[(i - 1) % 30].id,
      },
    });

    assignments.push(assignment);
  }

  // RESULT
  for (let i = 1; i <= 10; i++) {
    await prisma.result.create({
      data: {
        score: 90,
        studentId: students[i - 1].id,
        ...(i <= 5
          ? { examId: exams[i - 1].id }
          : { assignmentId: assignments[i - 6].id }),
      },
    });
  }

  // ATTENDANCE
  for (let i = 1; i <= 10; i++) {
    await prisma.attendance.create({
      data: {
        date: new Date(),
        present: true,
        studentId: students[i - 1].id,
        lessonId: lessons[i - 1].id,
      },
    });
  }

  // EVENT
  for (let i = 1; i <= 5; i++) {
    await prisma.event.create({
      data: {
        title: `Event ${i}`,
        description: `Description for Event ${i}`,
        startTime: new Date(2026, 10, 28, 9, 0),
        endTime: new Date(2026, 10, 28, 11, 0),
        classId: classes[i - 1].id,
      },
    });
  }

  // ANNOUNCEMENT
  for (let i = 1; i <= 5; i++) {
    await prisma.announcement.create({
      data: {
        title: `Announcement ${i}`,
        description: `Description for Announcement ${i}`,
        date: new Date(),
        classId: classes[i - 1].id,
      },
    });
  }

  console.log("Seeding completed successfully!");
  console.log({
    admins: 2,
    grades: grades.length,
    classes: classes.length,
    subjects: subjects.length,
    teachers: teachers.length,
    lessons: lessons.length,
    parents: parents.length,
    students: students.length,
    exams: exams.length,
    assignments: assignments.length,
  });
}

main()
  .catch((error) => {
    console.error("Seeding failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
