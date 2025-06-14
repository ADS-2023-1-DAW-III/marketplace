import {Link} from "react-router-dom";
import Sidebar from "./Sidebar";

export default function Header() {
  return (
    <header>
      <div className="container mx-auto px-4 py-4 pt-6 flex items-center justify-start">
          <Sidebar />
        <Link to="/" className="text-3xl ml-15 font-bold text-white">Market<span className="text-[#307B8E] bg-white">Place</span></Link>
      </div>
    </header>
  );
}
