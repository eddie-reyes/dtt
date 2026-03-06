import { Link } from "react-router";

export default function Home () {
  return (
    <div className="page">
      <h1 className="title">Main Page</h1>
      <Link to="/calculator" className="open-btn">
        Open Calculator
      </Link>
    </div>
  );
}
