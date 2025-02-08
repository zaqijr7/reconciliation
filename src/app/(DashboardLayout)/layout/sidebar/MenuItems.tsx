import {
  IconCopy,
  IconLayoutDashboard,
  IconTypography,
} from "@tabler/icons-react";

import { uniqueId } from "lodash";

const Menuitems = [
  {
    navlabel: true,
    subheader: "Home",
  },

  {
    id: uniqueId(),
    title: "Dashboard",
    icon: IconLayoutDashboard,
    href: "/",
  },
  {
    navlabel: true,
    subheader: "Utilities",
  },
  {
    id: uniqueId(),
    title: "Incoming",
    icon: IconTypography,
    href: "/incoming",
  },
  {
    id: uniqueId(),
    title: "Upcoming",
    icon: IconCopy,
    href: "/upcoming",
  },
];

export default Menuitems;
