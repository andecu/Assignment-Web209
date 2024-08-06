import HomeSlider from "../../components/HomeSlider";
import BestSeller from "./BestSeller";
import Categories from "./Categories";

const HomePage = () => {
  return (
    <div className="bg-[#f8f4f0]">
      <HomeSlider />
      <BestSeller />
      <Categories />
    </div>
  );
};

export default HomePage;
