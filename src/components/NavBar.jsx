import { Users, Calendar, Image } from "lucide-react";

const items = [
  { icon: Users, title: "Members" },
  { icon: Calendar, title: "Events" },
  { icon: Image, title: "Gallery" },
];

export default function NavBar({ active, setActive }) {
  return (
    <nav className="w-full flex items-center my-12 p-1 bg-black/5 rounded-2xl">
      {items.map((item, index) => {
        const Icon = item.icon;
        return (
          <button
            key={index}
            onClick={() => setActive(index)}
            className={`flex flex-1 items-center justify-center gap-2 py-1.5 rounded-2xl ${
              active === index && "bg-white"
            } cursor-pointer`}
          >
            <Icon size={18} />
            <span className="hidden sm:inline">{item.title}</span>
          </button>
        );
      })}
    </nav>
  );
}
