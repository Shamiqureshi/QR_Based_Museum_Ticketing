import SimpleImageSlider from "react-simple-image-slider";
import React from "react";
const images = [
  { url: "assets/slider1.jpg" },
  { url: "assets/slider2.jpg" },
  { url: "assets/slider3.jpg" }
];

const Slider = () => {
  return (
    <div className="d-flex">
      <SimpleImageSlider
        width={"100%"}
        height={504}
        images={images}
        showBullets={true}
        showNavs={true}
      />
    </div>
  );
}
export default Slider;