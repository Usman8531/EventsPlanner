import { LaptopOutlined, UserOutlined } from "@ant-design/icons";
import { BiPlus } from "react-icons/bi";
import { TbTimelineEventPlus } from "react-icons/tb";
import { MdOutlineEventNote } from "react-icons/md";
import { Link } from "react-router-dom";
import { FaSwatchbook } from "react-icons/fa";
import { GiPartyPopper } from "react-icons/gi";
import { AiOutlinePicRight } from "react-icons/ai";

const root = "/dashboard/";
const getRandomId = () => Math.random().toString(36).slice(2)

export const items = [
  {
    key: getRandomId(),
    icon: <LaptopOutlined />,
    label: (
      <Link to={root} className="text-decoration-none">
        Dashboard
      </Link>
    ),
  },
  {
    key: getRandomId(),
    icon: <FaSwatchbook />,
    label: (
      <Link to={root + "bookings"} className="text-decoration-none">
        Bookings
      </Link>
    ),
  },
  {
    key: getRandomId(),
    icon: <AiOutlinePicRight />,
    label: "Recent Events",
    children: [
      {
        key: getRandomId(),
        label: (
          <Link
            to={root + "events/addRecentEvents"}
            className="text-decoration-none"
          >
            Add Recent Events
          </Link>
        ),
        icon: <MdOutlineEventNote />,
      },
      {
        key: getRandomId(),
        label: (
          <Link
            to={root + "events/RecentEvents"}
            className="text-decoration-none"
          >
            All Recent Events
          </Link>
        ),
        icon: <GiPartyPopper />,
      },
    ],
  },
  {
    key: getRandomId(),
    icon: <UserOutlined />,
    label: "Events",
    children: [
      {
        key: getRandomId(),
        label: (
          <Link to={root + "events/add"} className="text-decoration-none">
            Add
          </Link>
        ),
        icon: <BiPlus />,
      },
      {
        key: getRandomId(),
        label: (
          <Link to={root + "events"} className="text-decoration-none">
            All
          </Link>
        ),
        icon: <TbTimelineEventPlus />,
      },
    ],
  },
];