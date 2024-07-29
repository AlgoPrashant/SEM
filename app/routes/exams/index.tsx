import { Link } from "remix";
import { useLoaderData } from "remix";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function loader() {
  const exams = await prisma.exam.findMany();
  return { exams };
}

export default function Exams() {
  const { exams } = useLoaderData();
  return (
    <div>
      <h1>Exams</h1>
      <ul>
        {exams.map(exam => (
          <li key={exam.id}>
            <Link to={`/exams/${exam.id}`}>{exam.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
