import CustomNavbar from "../CustomNavbar/CustomNavbar";
import Cookies from "js-cookie";
import HeroSection from "./HeroSection";
import TrustSection from "./TrustSection";
import HowItWorks from "./HowItWorks";
import FeaturedContent from "./FeaturedContent";
import ConversionSection from "./ConversionSection";  
import Footer from "./Footer";

const Dashboard = () => {
  const handleLogout = () => {
    Cookies.remove("jwt_token");
    window.location.href = "/login";
  };  

  return (
    <div>
      <CustomNavbar handleLogout={handleLogout} />
      <HeroSection />
      <TrustSection />
      <HowItWorks />
      <FeaturedContent />
      <ConversionSection />
      <Footer />
    </div>
  );
};

export default Dashboard; 