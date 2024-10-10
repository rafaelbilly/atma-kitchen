import { NavWrapper } from "../../../components/Wrapper";
import Category from "./components/Category";

import Carousel from "./components/Carousel";
import carousel1 from "../../../assets/images/carousel/Carousel-1.png";
import carousel2 from "../../../assets/images/carousel/Carousel-2.png";
import carousel3 from "../../../assets/images/carousel/Carousel-3.png";
import carousel4 from "../../../assets/images/carousel/Carousel-4.png";
import SweetWords from "./components/SweetWords";
import PopularProducts from "./components/PopularProducts";
import Services from "./components/Services";

export default function Home() {
  const carouselImages = [carousel1, carousel2, carousel3, carousel4];
  const sweetWord = `Everyone has a favourite cake, pastry, pudding or pie
from when they were kids.`;
  const sweetWord2 = `Balancing a diet with sweet treats is the best way to a happy body.`;

  return (
    <NavWrapper>
      <Carousel images={carouselImages} />
      <Category />
      <SweetWords content={sweetWord} />
      <PopularProducts />
      <SweetWords content={sweetWord2} author="Mary Berry" />
      <Services />
    </NavWrapper>
  );
}
