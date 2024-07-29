import { useLoaderData } from "remix";
import { PrismaClient } from "@prisma/client";
import { useEffect } from "react";

const prisma = new PrismaClient();

export async function loader({ params }) {
  const exam = await prisma.exam.findUnique({ where: { id: Number(params.examId) } });
  return { exam };
}

export default function Exam() {
  const { exam } = useLoaderData();

  function goFullscreen() {
    document.documentElement.requestFullscreen();
  }

  function disableRightClick(event) {
    event.preventDefault();
  }

  useEffect(() => {
    goFullscreen();
    document.addEventListener("contextmenu", disableRightClick);

    return () => {
      document.removeEventListener("contextmenu", disableRightClick);
    };
  }, []);

  return (
    <div>
      <h1>{exam.title}</h1>
      <p>{exam.description}</p>
      {/* Exam content goes here */}
    </div>
  );
}
