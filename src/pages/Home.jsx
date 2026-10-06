import Navbar from "../components/layout/Navbar";
import Hero from "../components/sections/Hero";
import WhyUs from "../components/sections/WhyUs";
import MissionVision from "../components/sections/MissionVision";
import Founder from "../components/sections/Founder";
import Faculty from "../components/sections/Faculty";
import Courses from "../components/sections/Courses";
import FacilitiesSection from "../components/sections/FacilitiesSection";
import TestSeriesSection from "../components/sections/TestSeriesSection";
import BeyondClassroomSection from "../components/sections/BeyondClassroomSection";
import AchieverRewards from "../components/sections/AchieverRewards";
import WallOfFame from "../components/sections/WallOfFame";
import StudentReel from "../components/sections/StudentReel";
import FAQSection from "../components/sections/FAQSection";
import AppPromo from "../components/sections/AppPromo";
import EnquiryForm from "../components/sections/EnquiryForm";
import Footer from "../components/layout/Footer";
import { FOUNDER } from "../constants/founder";

export default function Home() {
    return (
        <main>
            <Navbar />
            <Hero />
            <WallOfFame />
            <AchieverRewards />
            <WhyUs />
            <MissionVision />
            <Founder {...FOUNDER} />
            <Faculty />
            <Courses />
            <FacilitiesSection />
            <TestSeriesSection />
            <BeyondClassroomSection />
            <StudentReel />
            <FAQSection />
            <AppPromo />
            <EnquiryForm />
            <Footer />
        </main>
    );
}