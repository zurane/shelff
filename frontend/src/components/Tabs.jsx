import { useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import bgBreakfast from "../assets/bg-breakfast.jpg";
import bgLunch from "../assets/bg-lunch.jpg";
import bgDinner from "../assets/bg-dinner.jpg";
import bgSnack from "../assets/bg-snack.jpg";
import bgDessert from "../assets/bg-dessert.jpg";
// import PropTypes from "prop-types";

const Tabs = () => {
  const [selectedTab, setSelectedTab] = useState(0); // eslint-disable-line no-unused-vars

  const tabs = [
    {
      id: 0,
      label: "Lunch",
      bgColor: "bg-green-200",
      path: "/category/lunch",
      bgImg: bgLunch,
    },
    {
      id: 1,
      label: "Dinner",
      bgColor: "bg-red-200",
      bgImg: bgDinner,
      path: "/category/dinner",
    },
    {
      id: 2,
      label: "Breakfast",
      bgColor: "bg-yellow-200",
      bgImg: bgBreakfast,
      path: "/category/breakfast",
    },

    {
      id: 4,
      label: "Snack",
      bgColor: "bg-blue-200",
      path: "/category/snack",
      bgImg: bgSnack,
    },
    {
      id: 5,
      label: "Dessert",
      bgColor: "bg-pink-200",
      bgImg: bgDessert,
      path: "/category/dessert",
    },
  ];

  const settings = {
    dots: true,
    infinite: false,
    arrows: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    // nextArrow: <NextArrow />,
    // prevArrow: <PrevArrow />,
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
    <>
      <h2 className="text-xl py-1 px-2 font-bold text-left">
        Explore Categories
      </h2>
      <div className="relative px-1 py-4">
        <Slider {...settings}>
          {tabs.map((tab) => (
            <Link to={tab.path} key={tab.id} className="px-1">
              <div
                className={`${tab.bgColor} rounded-md shadow-md py-16 px-3 cursor-pointer`}
                style={{
                  backgroundImage: tab.bgImg ? `url(${tab.bgImg})` : "none",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
                onClick={() => setSelectedTab(tab.id)}
              >
                <h4 className="font-semibold text-md">{tab.label}</h4>
              </div>
            </Link>
          ))}
        </Slider>
      </div>
    </>
  );
};

// const NextArrow = (props) => {
//   // Validate props
//   NextArrow.propTypes = {
//     className: PropTypes.string,
//     style: PropTypes.object,
//     onClick: PropTypes.func,
//   };
//   const { className, style, onClick } = props;
//   return (
//     <div
//       className={`${className} absolute right-0 top-1/2 transform -translate-y-1/2 z-10`}
//       style={{
//         ...style,
//         display: "block",
//         background: "lightgray",
//         borderRadius: "50%",
//       }}
//       onClick={onClick}
//     >
//       <FaArrowRight />
//     </div>
//   );
// };

// const PrevArrow = (props) => {
//   //validate props
//   PrevArrow.propTypes = {
//     className: PropTypes.string,
//     style: PropTypes.object,
//     onClick: PropTypes.func,
//   };
//   const { className, style, onClick } = props;
//   return (
//     <div
//       className={`${className} absolute left-0 top-1/2 transform -translate-y-1/2 z-10`}
//       style={{
//         ...style,
//         display: "block",
//         background: "lightgray",
//         borderRadius: "50%",
//       }}
//       onClick={onClick}
//     >
//       <FaArrowLeft />
//     </div>
//   );
// };

export default Tabs;
