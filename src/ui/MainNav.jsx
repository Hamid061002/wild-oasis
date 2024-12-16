
// const NavList = styled.ul`
//   display: flex;
//   flex-direction: column;
//   gap: 0.8rem;
// `;

// const Link = styled.a`
//   &:link,
//   &:visited {
//     display: flex;
//     align-items: center;
//     gap: 1.2rem;

//     color: var(--color-grey-600);
//     font-size: 1.6rem;
//     font-weight: 500;
//     padding: 1.2rem 2.4rem;
//     transition: all 0.3s;
//   }

//   /* This works because react-router places the active class on the active NavLink */
//   &:hover,
//   &:active,
//   &.active:link,
//   &.active:visited {
//     color: var(--color-grey-800);
//     background-color: var(--color-grey-50);
//     border-radius: var(--border-radius-sm);
//   }`

import { useEffect } from "react";
import { HiOutlineCalendarDays, HiOutlineCog6Tooth, HiOutlineHome, HiOutlineHomeModern, HiOutlineUsers } from "react-icons/hi2";
import { NavLink } from "react-router-dom";

const MainNav = () => {
  return (
    <nav>
      <ul className="flex flex-col gap-2 py-10">
        <li>
          <NavLink className="flex items-center gap-5 -text--color-grey-500 text-2xl py-4 px-8 transition-all duration-300 hover:-text--color-grey-800 hover:-bg--color-grey-100 hover:rounded-lg navLinks" to="/dashboard">
            <HiOutlineHome className="stroke-2" />
            <span>Home</span>
          </NavLink>
        </li>
        <li>
          <NavLink className="flex items-center gap-5 -text--color-grey-500 text-2xl py-5 px-9 transition-all duration-300 hover:-text--color-grey-800 hover:-bg--color-grey-100 hover:rounded-lg navLinks" to="/bookings">
            <HiOutlineCalendarDays className="stroke-2" />
            <span>Bookings</span>
          </NavLink>
        </li>
        <li>
          <NavLink className="flex items-center gap-5 -text--color-grey-500 text-2xl py-5 px-9 transition-all duration-300 hover:-text--color-grey-800 hover:-bg--color-grey-100 hover:rounded-lg navLinks" to="/cabins">
            <HiOutlineHomeModern className="stroke-2" />
            <span>Cabins</span>
          </NavLink>
        </li>
        <li>
          <NavLink className="flex items-center gap-5 -text--color-grey-500 text-2xl py-5 px-9 transition-all duration-300 hover:-text--color-grey-800 hover:-bg--color-grey-100 hover:rounded-lg navLinks" to="/users">
            <HiOutlineUsers className="stroke-2" />
            <span>Users</span>
          </NavLink>
        </li>
        <li>
          <NavLink className="flex items-center gap-5 -text--color-grey-500 text-2xl py-5 px-9 transition-all duration-300 hover:-text--color-grey-800 hover:-bg--color-grey-100 hover:rounded-lg navLinks" to="/settings">
            <HiOutlineCog6Tooth className="stroke-2" />
            <span>Setting</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default MainNav

