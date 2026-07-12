import Navbar from "../components/layout/Navbar";
import Hero from "../components/sections/Hero";
import WhyUs from "../components/sections/WhyUs";
import Founder from "../components/sections/Founder";
import Faculty from "../components/sections/Faculty";
import Courses from "../components/sections/Courses";
import WallOfFame from "../components/sections/WallOfFame";
import StudentReel from "../components/sections/StudentReel";
import AppPromo from "../components/sections/AppPromo";
import EnquiryForm from "../components/sections/EnquiryForm";
import Footer from "../components/layout/Footer";
import { FOUNDER } from "../constants/founder";

export default function Home() {
    return (
        <main>
            <Navbar />
            <Hero />
            <WhyUs />
            <Founder {...FOUNDER} />
            <Faculty />
            <Courses />
            <WallOfFame />
            <StudentReel />
            <AppPromo />
            <EnquiryForm />
            <Footer />
        </main>
    );
}