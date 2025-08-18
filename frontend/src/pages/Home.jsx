// import Navabr from "../components/Navabr";
import ImageSlider from "../components/ImageSlider";
import ViewWork from "../components/ViewWork";
import ArtPrints from "../components/ArtPrints";
import Commission from "../components/Commission";
import Hearings from "../components/Hearings";
import AboutShaira from "../components/AboutShaira";
import Footer from "../components/Footer";
import logo from "../assets/logo/logo.png";

import React from "react";

function Home() {
  return (
    <>
    
      <ImageSlider />
      <ViewWork />
      <ArtPrints />
      <Commission />
      <Hearings />
      <AboutShaira />
        {/* Your page content */}
        <Footer
          artistName="Shaira Maliha"
          logoSrc={logo}
          links={[
            { label: "About", href: "/about" },
            { label: "Portfolio", href: "/portfolio" },
            { label: "Prints", href: "/prints" },
            { label: "Exhibitions", href: "/exhibitions" },
            { label: "Contact", href: "/contact" },
          ]}
          socialLinks={[
            { name: "instagram", href: "https://instagram.com" },
            { name: "behance", href: "https://behance.net" },
            { name: "twitter", href: "https://twitter.com" },
          ]}
          onSubscribe={(email) => alert(`Subscribed: ${email}`)}
        />
    </>
  );
}

export default Home;
