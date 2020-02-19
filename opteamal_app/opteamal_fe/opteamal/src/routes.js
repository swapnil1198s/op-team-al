
import Dashboard from "./views/Dashboard.jsx";
import Employees from "./views/Employees.jsx";
import Projects from "./views/Projects";
import FindTalent from "./views/FindTalent"


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
];

export default dashboardRoutes;
