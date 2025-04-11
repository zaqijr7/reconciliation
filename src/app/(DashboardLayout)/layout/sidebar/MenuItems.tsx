import {
  IconBook2,
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
    title: "Sales",
    icon: IconTypography,
    href: "/sales",
  },
  {
    id: uniqueId(),
    title: "Report",
    icon: IconBook2,
    href: "/report",
  },
];

export default Menuitems;
