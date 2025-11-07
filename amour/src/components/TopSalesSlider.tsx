import React from "react";
import Slider from "react-slick";
import ProductCard from "./ProductCard";
import { products } from "../data/products";
import { useLanguage } from "../context/LanguageProvider";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const NextArrow: React.FC<any> = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 w-10 h-10 rounded-full flex items-center justify-center shadow"
  >
    ›
  </button>
);

const PrevArrow: React.FC<any> = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 w-10 h-10 rounded-full flex items-center justify-center shadow"
  >
    ‹
  </button>
);

const TopSalesSlider: React.FC = () => {
  const { t } = useLanguage();

  const topSales = [...products]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 8);

  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <section className="w-full mb-12">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        {t("top_sales")}
      </h2>
      <Slider {...settings}>
        {topSales.map((p) => (
          <div key={p.id} className="px-2">
            <ProductCard {...p} />
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default TopSalesSlider;
