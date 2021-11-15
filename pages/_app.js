import CommonLayout from "../components/layout/commonLayout";
import "../styles/globals.css";
import "antd/dist/antd.css";

function MyApp({ Component, pageProps, router }) {
  return (
    <CommonLayout>
      <Component {...pageProps} />
    </CommonLayout>
  );
}

export default MyApp;
