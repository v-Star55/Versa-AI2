import LandingNav from "@/components/LandingNav";
import { VortexDemo } from "@/components/VortexDemo";
import { BentoGridDemo } from "@/components/BentoCardDemo";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import Footer from "@/components/Footer";

const LandingPage = () => {
    return ( 
        <div>

            <LandingNav />
            <VortexDemo />
            {/* <BentoGridDemo/> */}
            <Footer/>

        </div>
     );
}
 
export default LandingPage;