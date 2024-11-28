import { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import PropTypes from "prop-types";

const Tabs = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  const tabs = [
    { id: 0, label: "Lunch", bgColor: "bg-green-50" },
    { id: 1, label: "Dinner", bgColor: "bg-purple-200" },
    { id: 2, label: "Breakfast", bgColor: "bg-gray-100" },
    { id: 3, label: "Supper", bgColor: "bg-yellow-400" },
    { id: 4, label: "Snack", bgColor: "bg-blue-300" },
    { id: 5, label: "Dessert", bgColor: "bg-gray-400" },
    { id: 6, label: "Other", bgColor: "bg-purple-400" }
  ];

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="relative  px-2 py-4 bg-slate-50 ">
      <Slider {...settings}>
        {tabs.map((tab) => (
          <div key={tab.id} className="px-2">
            <div
              className={`${tab.bgColor} rounded-md shadow-md  py-14 px-3 cursor-pointer`}
              onClick={() => setSelectedTab(tab.id)}
            >
              <h4 className="font-semibold text-md">{tab.label}</h4>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

const NextArrow = (props) => {
  // Validate props
  NextArrow.propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    onClick: PropTypes.func,
  };
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} absolute right-0 top-1/2 transform -translate-y-1/2 z-10`}
      style={{
        ...style,
        display: "block",
        background: "lightgray",
        borderRadius: "50%",
      }}
      onClick={onClick}
    >
      <FaArrowRight />
    </div>
  );
};

const PrevArrow = (props) => {
  //validate props
  PrevArrow.propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    onClick: PropTypes.func,
  };
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} absolute left-0 top-1/2 transform -translate-y-1/2 z-10`}
      style={{
        ...style,
        display: "block",
        background: "lightgray",
        borderRadius: "50%",
      }}
      onClick={onClick}
    >
      <FaArrowLeft />
    </div>
  );
};

export default Tabs;
