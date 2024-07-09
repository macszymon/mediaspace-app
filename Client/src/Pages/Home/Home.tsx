import BestSection from "../../Components/BestSection/BestSection";
import CardsSlider from "../../Components/CardsSlider/CardsSlider";
import ProgressSection from "../../Components/ProgressSection/ProgressSection";

function Home() {
  return (
    <>
      <ProgressSection />
      <CardsSlider header="New releases" />
      <CardsSlider header="Waiting for you" />
      <BestSection />
      <CardsSlider header="Top picks" />
    </>
  );
}

export default Home;
