import BestSection from "../../Components/BestSection/BestSection";
import CardsSlider from "../../Components/CardsSlider/CardsSlider";
import ProgressSection from "../../Components/ProgressSection/ProgressSection";

function Home() {
  
  return (
    <>
      <ProgressSection />
      <CardsSlider header="New releases" sort="releaseDate" />
      <BestSection />
      <CardsSlider header="Top picks" sort="score" />
    </>
  );
}

export default Home;
