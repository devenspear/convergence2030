import Hero from "@/components/Hero";
import Introduction from "@/components/Introduction";
import Drivers from "@/components/Drivers";
import Impact from "@/components/Impact";
import DayInLife from "@/components/DayInLife";
import Metamorphosis from "@/components/Metamorphosis";
import Scenarios from "@/components/Scenarios";
import Footer from "@/components/Footer";

export default function Home() {
    return (
        <main className="min-h-screen bg-white selection:bg-blue-500 selection:text-white">
            <Hero />
            <Introduction />
            <Drivers />
            <Impact />
            <DayInLife />
            <Metamorphosis />
            <Scenarios />
            <Footer />
        </main>
    );
}
