import { NavbarMenu } from "@/lib/Navbarmenu";
import Link from "next/link";
const Navbar = () => {
  return (
    <div className="h-10 bg-violet-500 flex items-center justify-around   px-4">
      {NavbarMenu.map((item, index) => (
        <div key={index}>
          <Link className="text-white" href={item.link}>
            {item.title}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Navbar;
