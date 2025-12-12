import { useState } from "react";
import NavBar from "../components/NavBar";
import Members from "../layouts/Members";
import Events from "../layouts/Events";
import Gallery from "../layouts/Gallery";

const layouts = [Members, Events, Gallery];

export default function Dashboard() {
  const [active, setActive] = useState(0);
  const ActiveLayout = layouts[active];

  return (
    <div className="min-h-screen flex flex-col bg-[#f4f5f7] px-6 sm:px-12 md:px-24 lg:px-48 py-12">
      <h1 className="text-4xl my-4 text-center md:text-start">Admin Dashboard</h1>
      <p className="text-center md:text-start">Manage members, events, and gallery collections</p>
      <NavBar active={active} setActive={setActive} />
      <ActiveLayout />
    </div>
  );
}
