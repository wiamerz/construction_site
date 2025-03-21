import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-64 bg-black text-white h-screen p-4">
      <h2 className="text-2xl font-bold mb-6 text-white">Project gestion</h2>
      <ul className="space-y-4">
        <li>
          <Link
            to="/Home"
            className="block p-2 hover:bg-gray-700 rounded transition duration-300"
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            to=""
            className="block p-2 hover:bg-gray-700 rounded transition duration-300"
          >
            Add projects
          </Link>
        </li>
        <li>
          <Link
            to=""
            className="block p-2 hover:bg-gray-700 rounded transition duration-300"
          >
           Add tasks
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
