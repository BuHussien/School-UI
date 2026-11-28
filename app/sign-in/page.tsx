import { db } from "@/prisma/db";

const LoginPage = async () => {
  const students = await db.student.findMany({
    select: {
      id: true,
      username: true,
    },
  });

  return (
    <div>
      {students.map((student) => (
        <h1 key={student.id}>{student.username}</h1>
      ))}
    </div>
  );
};

export default LoginPage;