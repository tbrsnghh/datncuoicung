import React, { useState, useEffect } from "react";
import { menuData } from "../components/thucdon/menuData";
import Banner from "../components/thucdon/bannerMenu";
import MonAn from "../components/thucdon/MonAn";
import Header from "../components/Header";
import Footer from "../components/Footer";

const MenuItem = ({ name, isSelected, onClick }) => {
  return (
    <div
      className={`cursor-pointer p-3 border-l-4 rounded-lg transition-all
      ${
        isSelected
          ? "bg-blue-200 font-semibold border-blue-600"
          : "bg-gray-100 hover:bg-blue-100 border-gray-500"
      }`}
      onClick={onClick}
    >
      <span className="text-black font-serif">{name}</span>
    </div>
  );
};

const MenuSection = ({
  title,
  items,
  activeSection,
  setActiveSection,
  sets,
  activeSet,
  setActiveSet,
}) => {
  const [selectedItem, setSelectedItem] = useState(
    items[activeSection]?.items[0] || { name: "No item", image: "" }
  );

  useEffect(() => {
    setActiveSection(0);
  }, [activeSet]);

  useEffect(() => {
    setSelectedItem(items[activeSection]?.items[0] || { name: "No item", image: "" });
  }, [activeSection, items]);

  return (
    <div className="bg-gray-100 rounded-lg p-6 shadow-md flex flex-col space-y-4">
      <h2 className="text-2xl font-bold text-center text-[#B17F59] uppercase border-b-2 border-yellow-600 pb-2">
        {title}
      </h2>
      <div className="flex gap-6">
        <div className="flex-1 max-w-sm">
          {items[activeSection]?.items.map((item, index) => (
            <MenuItem
              key={index}
              name={item.name}
              isSelected={selectedItem.name === item.name}
              onClick={() => setSelectedItem(item)}
            />
          ))}
        </div>
        <div className="flex-2 max-w-md flex justify-center items-center">
          <img
            src={selectedItem.image || "/images/default.jpg"}
            alt={selectedItem.name}
            className="w-full h-[400px] object-cover rounded-lg border-2 border-gray-300 shadow-md hover:scale-105 transition-transform"
          />
        </div>
      </div>
      <div className="flex space-x-4">
        {sets.map((set, index) => (
          <button
            key={index}
            className={`py-2 px-4 text-sm font-medium uppercase rounded-full transition-all ${
              activeSection === index
                ? "bg-yellow-600 text-white scale-105"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
            onClick={() => setActiveSection(index)}
          >
            {set.displayName}
          </button>
        ))}
      </div>
      <div className="flex justify-center space-x-2">
        {menuData.map((_, index) => (
          <span
            key={index}
            className={`w-3 h-3 rounded-full border-2 cursor-pointer transition-all ${
              activeSet === index ? "bg-yellow-600 border-yellow-600 scale-125" : "bg-gray-300 border-gray-500"
            }`}
            onClick={() => setActiveSet(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

const Thucdon = () => {
  const [activeSet, setActiveSet] = useState(0);
  const [activeSection, setActiveSection] = useState(0);

  const sections = menuData.map((menu) => ({
    title: menu.price,
    data: menu.sets,
  }));
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <Banner />
      <div className="flex flex-col lg:flex-row justify-between max-w-6xl mx-auto p-4 space-y-8 lg:space-y-0">
        <div className="lg:w-1/3 space-y-4">
          <h1 className="text-4xl text-[#B17F59] font-serif uppercase">Set Menu</h1>
          <h2 className="text-2xl text-[#B17F59] font-serif uppercase">Dành Cho Tiệc Cưới</h2>
          <p className="text-lg text-black font-serif leading-relaxed">
            — Được các chuyên gia ẩm thực giàu kinh nghiệm của Grand Palace chế biến, thực đơn của chúng tôi luôn được lựa chọn kỹ lưỡng để mang đến cho thực khách những món ăn đa dạng và có sự dung hòa giữa văn hóa ẩm thực Á - Âu, đáp ứng tất cả các nhu cầu của quý khách.
          </p>
        </div>
        <div className="lg:w-2/3">
          <MenuSection
            title={sections[activeSet].title}
            items={sections[activeSet].data}
            activeSection={activeSection}
            setActiveSection={setActiveSection}
            sets={sections[activeSet].data}
            activeSet={activeSet}
            setActiveSet={setActiveSet}
          />
        </div>
      </div>
      <div className="mt-10 bg-gray-100">
        <MonAn itemsPerCategory={3} />
      </div>
      <Footer />
    </div>
  );
};

export default Thucdon;
