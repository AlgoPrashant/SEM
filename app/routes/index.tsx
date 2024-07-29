import { Link } from "remix";

export default function Index() {
  return (
    <div>
      <h1>Welcome to Safe Exam Browser</h1>
      <Link to="/login">Login</Link>
    </div>
  );
}
