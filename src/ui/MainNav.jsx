import { HiOutlineCalendarDays, HiOutlineCog6Tooth, HiOutlineHome, HiOutlineHomeModern, HiOutlineUsers } from "react-icons/hi2";
import { NavLink } from "react-router-dom";

const MainNav = () => {
  return (
    <nav>
      <ul className="flex flex-col gap-2 py-9">
        <li>
          <NavLink className="flex items-center gap-5 -text--color-grey-500 text-[22px] py-4 px-7 transition-all duration-300 hover:-text--color-grey-800 hover:-bg--color-grey-100 hover:rounded-lg navLinks" to="/dashboard">
            <HiOutlineHome className="stroke-2" />
            <span>Home</span>
          </NavLink>
        </li>
        <li>
          <NavLink className="flex items-center gap-5 -text--color-grey-500 text-[22px] py-4 px-7 transition-all duration-300 hover:-text--color-grey-800 hover:-bg--color-grey-100 hover:rounded-lg navLinks" to="/bookings">
            <HiOutlineCalendarDays className="stroke-2" />
            <span>Bookings</span>
          </NavLink>
        </li>
        <li>
          <NavLink className="flex items-center gap-5 -text--color-grey-500 text-[22px] py-4 px-7 transition-all duration-300 hover:-text--color-grey-800 hover:-bg--color-grey-100 hover:rounded-lg navLinks" to="/cabins">
            <HiOutlineHomeModern className="stroke-2" />
            <span>Cabins</span>
          </NavLink>
        </li>
        <li>
          <NavLink className="flex items-center gap-5 -text--color-grey-500 text-[22px] py-4 px-7 transition-all duration-300 hover:-text--color-grey-800 hover:-bg--color-grey-100 hover:rounded-lg navLinks" to="/users">
            <HiOutlineUsers className="stroke-2" />
            <span>Users</span>
          </NavLink>
        </li>
        <li>
          <NavLink className="flex items-center gap-5 -text--color-grey-500 text-[22px] py-4 px-7 transition-all duration-300 hover:-text--color-grey-800 hover:-bg--color-grey-100 hover:rounded-lg navLinks" to="/settings">
            <HiOutlineCog6Tooth className="stroke-2" />
            <span>Setting</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default MainNav

