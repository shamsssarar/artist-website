import React from "react";
import lolo from "../assets/images/lolo.jpg";
function AboutShaira() {
  return (
    <div className="bg-gray-100">
      <div className="w-full max-w-[1000px] mx-auto justify-center p-4 text-[#22303d] grid gap-4 md:grid-cols-2">
        <div className="aspect-[3/5] md:w-[80%] md:h-[80%] m-auto overflow-hidden rounded-2xl  bg-gradient-to-br from-sky-100 via-teal-100 to-cyan-100">
          {/* replace with your image */}
          <img
            src={lolo}
            alt="Artist portrait"
            className="h-full w-full object-cover object-center"
            onError={(e) => (e.currentTarget.style.display = "none")}
          />
        </div>
        <div className="flex flex-col justify-center">
          <h1 className="text-4xl pb-4 md:pb-8 md:text-5xl">
            About Shaira - Artist based in Dhaka, Bangladesh
          </h1>
          <p className="pb-2 md:pb-4 font-extralight md:text-xl">
            Shaira Maliha is an artist residing in AIMS, Gulshan. Having always
            been creative, she pursued her dream by earning a 1st Class Degree
            in Painting, Drawing and Printmaking in 2020.....
          </p>
          <a className="link link-hover pb-4" href="/about">
            Read More...
          </a>
        </div>
      </div>
    </div>
  );
}

export default AboutShaira;
