import { BsFillHouseCheckFill } from "react-icons/bs";
import { FaBookOpenReader, FaHouse } from "react-icons/fa6";
import { MdAccountCircle } from "react-icons/md";

export const adminTabs = [
  {
    label: "Home",
    path: "/_admin/home",
    icon: <FaHouse size={20} />,
  },
  {
    label: "Owners",
    path: "/_admin/owners",
    icon: <FaHouse size={20} />,
  },
  {
    label: "Accommodations",
    path: "/_admin/accommodations/view",
    icon: <BsFillHouseCheckFill size={20} />,
  },
  {
    label: "Bookings",
    path: "/_admin/bookings",
    icon: <FaBookOpenReader size={20} />,
  },
  {
    label: "Account",
    path: "/_admin/account",
    icon: <MdAccountCircle size={25} />,
  },
];
