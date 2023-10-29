//router
import { lazy } from "react";
import { Navigate } from "react-router-dom";
import Courses from "../views/courses.js";

/****Layouts*****/
const FullLayout = lazy(() => import("../layouts/FullLayout.js"));

/***** Pages ****/

const Starter = lazy(() => import("../views/Starter.js"));

const StudentPage = lazy(() => import("../views/StudentPage.js"));
const BlocsPage = lazy(() => import("../views/BlocsPage.js"));
const DepartmentPage = lazy(() => import("../views/DepartmentPage.js"));


const LoginPage = lazy(() => import("../views/Login.js"));

const RegisterPage = lazy(() => import("../views/Register.js"));
const UsersPage = lazy(() => import("../views/UsersPage.js"));
const CoursesPage = lazy(() => import("../views/CoursesPage.js"));
const SchoolsPage = lazy(() => import("../views/SchoolsPage"));
const ClassePage = lazy(() => import("../views/ClassePage.js"));
const About = lazy(() => import("../views/About.js"));
const Alerts = lazy(() => import("../views/ui/Alerts"));
const Badges = lazy(() => import("../views/ui/Badges"));
const Buttons = lazy(() => import("../views/ui/Buttons"));
const Cards = lazy(() => import("../views/ui/Cards"));
const Grid = lazy(() => import("../views/ui/Grid"));
const Tables = lazy(() => import("../views/ui/Tables"));
const Forms = lazy(() => import("../views/ui/Forms"));
const Breadcrumbs = lazy(() => import("../views/ui/Breadcrumbs"));


// teacher routes
const Teachers = lazy(() => import("../views/Teahcers"));
const TeachersDetail = lazy(() => import("../views/TeahcerDeatil"));

/*****Routes******/

const ThemeRoutes = [
  {
    path: "/",
    element: <FullLayout />,
    children: [
      { path: "/", element: <Navigate to="/starter" /> },

      { path: "/starter", exact: true, element: <Starter /> },

      { path: "/students", exact: true, element: <StudentPage /> },
      { path: "/blocs", exact: true, element: <BlocsPage /> },
      { path: "/departments", exact: true, element: <DepartmentPage /> },



      { path: "/courses", exact: true, element: <CoursesPage /> },
      { path: "/schools", exact: true, element: <SchoolsPage /> },
      { path: "/classes", exact: true, element: <ClassePage /> },
      { path: "/users", exact: true, element: <UsersPage /> },
      { path: "/about", exact: true, element: <About /> },
      { path: "/alerts", exact: true, element: <Alerts /> },
      { path: "/badges", exact: true, element: <Badges /> },
      { path: "/buttons", exact: true, element: <Buttons /> },
      { path: "/cards", exact: true, element: <Cards /> },
      { path: "/grid", exact: true, element: <Grid /> },
      { path: "/table", exact: true, element: <Tables /> },
      { path: "/forms", exact: true, element: <Forms /> },
      { path: "/login", exact: true, element: <LoginPage /> },
      { path: "/register", exact: true, element: <RegisterPage /> },
      { path: "/teachers", exact: true, element: <Teachers /> },
      { path: "/teachers/:id", exact: true, element: <TeachersDetail /> },
      { path: "/breadcrumbs", exact: true, element: <Breadcrumbs /> },
      { path: "/Course", exact: true, element: <Courses /> },
      
    ],
  },
];

export default ThemeRoutes;
