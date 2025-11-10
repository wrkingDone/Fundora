import "@/styles/globals.css";
import useState from "react";
import useEffect from "react";
import { useRouter } from "next/router";
// internal imports
import { NavBar, Footer } from "../../Components";
import { CrowdFundingProvider } from "../../Context/CrowdFunding"
import Headers from "../components/headers"

// export const runtime = "experimental-edge";

export const metadata = {
  title: "Home",
  description: "testing"
}

function App({ Component, pageProps }) {
  
  // const [isScrolled, setIsScrolled] = useState(false)
  const router = useRouter();
  const isConnectPage = router.pathname === "/connect";

  // useEffect(() => {
  //   const handleScroll = () => {
  //     setIsScrolled(window.scrollY > 50)
  //   }

  //   window.addEventListener("scroll", handleScroll)
  //   return () => window.removeEventListener("scroll", handleScroll)
  // }, [])


  return (
    <>
      <CrowdFundingProvider>
        <Headers />
        <Component {...pageProps} />
        {isConnectPage && <Footer />}
      </CrowdFundingProvider>
    </>
  ) 
}

export default App;
