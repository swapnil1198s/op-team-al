
import Dashboard from "./views/Dashboard.jsx";
import Employees from "./views/Employees.jsx";
import Projects from "./views/Projects";
import FindTalent from "./views/FindTalent"
import System from "./views/System"


const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Home",
    icon: "dashboard",
    component: Dashboard,
    layout: "/admin"
  },
  {
    path: "/employees",
    name: "Employees",
    icon: "group",
    component: Employees,
    layout: "/admin"
  },
  {
    path: "/projects",
    name: "Projects",
    icon: "work",
    component: Projects,
    layout: "/admin"
  },
  {
    path: "/search",
    name: "Find Talent",
    icon: "location_searching",
    component: FindTalent,
    layout: "/admin"
  },
  {
    path: "/settings",
    name: "System",
    icon: "settings",
    component: System,
    layout: "/admin"
  },
];

export default dashboardRoutes;
