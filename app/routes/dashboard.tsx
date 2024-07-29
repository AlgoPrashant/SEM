import { useLoaderData } from "remix";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function loader({ request }) {
  const session = await storage.getSession(request.headers.get("Cookie"));
  const userId = session.get("userId");

  if (!userId) {
    throw redirect("/login");
  }

  const user = await prisma.user.findUnique({ where: { id: userId } });
  return { user };
}

export default function Dashboard() {
  const { user } = useLoaderData();

  return (
    <div>
      <h1>Welcome, {user.username}</h1>
      <a href="/exams">View Exams</a>
    </div>
  );
}
