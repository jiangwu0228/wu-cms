import HomeLayout from "../components/layout/home/HomeLayout";
import DashboardLayout from "../components/layout/dashboard/DashboardLayout";
import "../styles/globals.css";

function MyApp({ Component, pageProps, router }) {
  if (router.pathname.startsWith("/dashboard/")) {
    return (
      <DashboardLayout>
        <Component {...pageProps} />
      </DashboardLayout>
    );
  }
  return (
    <HomeLayout>
      <Component {...pageProps} />
    </HomeLayout>
  );
}

export default MyApp;
