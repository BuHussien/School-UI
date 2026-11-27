import { db } from "@/prisma/db";
const LoginPage = async () => {
  const admins = await db.orm.public.Student.all();
  return (
    <div>{admins.map(admin => <h1>{admin.username}</h1>)}</div>
  );
};

export default LoginPage;