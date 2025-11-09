import "@/styles/globals.css";
import { useRouter } from "next/router";
// internal imports
import { NavBar, Footer } from "../../Components";
import { CrowdFundingProvider } from "../../Context/CrowdFunding"

// export const runtime = "experimental-edge";

export const metadata = {
  title: "Home",
  description: "testing"
}

function App({ Component, pageProps }) {

  const router = useRouter();
  const isConnectPage = router.pathname === "/connect";

  return (
    <>
      <CrowdFundingProvider>
        {isConnectPage && <NavBar />}
        <Component {...pageProps} />
        {isConnectPage && <Footer />}
      </CrowdFundingProvider>
    </>
  ) 
}

export default App;
