import HomeLayout from "../components/layout/home/HomeLayout";
import ManagerDashboard from "../components/layout/dashboard/managerDashboard";
import StudentDashboard from "../components/layout/dashboard/studentDashboard";
import TeacherDashboard from "../components/layout/dashboard/teacherDashboard";

import "../styles/globals.css";

function MyApp({ Component, pageProps, router }) {
  const manager = router.pathname.startsWith("/dashboard/manager");
  const student = router.pathname.startsWith("/dashboard/student");
  const teacher = router.pathname.startsWith("/dashboard/teacher");

  return manager ? (
    <ManagerDashboard>
      <Component {...pageProps} />
    </ManagerDashboard>
  ) : student ? (
    <StudentDashboard>
      <Component {...pageProps} />
    </StudentDashboard>
  ) : teacher ? (
    <TeacherDashboard>
      <Component {...pageProps} />
    </TeacherDashboard>
  ) : (
    <HomeLayout>
      <Component {...pageProps} />
    </HomeLayout>
  );
}

export default MyApp;
