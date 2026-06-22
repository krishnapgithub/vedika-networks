import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import BentoGrid from "../components/BentoGrid";

export default function Home() {
    return (
        <>
            <Navbar />

            <div className="content-wrapper">
                <div className="main-container">
                    {/* <Hero /> */}
                    <BentoGrid /> 
                </div>
            </div>
        </>
    );
}