import React, { useEffect, useState } from "react";
import { menuData } from "./menuData";

// Hàm lấy ngẫu nhiên các món ăn từ một mảng
const getRandomItems = (items, count) => {
  if (!Array.isArray(items)) return []; 
  const shuffled = [...items].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

const MonAn = () => {
  const [randomItems, setRandomItems] = useState([]);

  useEffect(() => {
    const allItems = menuData
      .flatMap((menu) => menu.sets) 
      .flatMap((set) => set.items); 

    // Lấy 8 món ăn ngẫu nhiên
    const items = getRandomItems(allItems, 8);
    setRandomItems(items);
  }, []);

  return (
    <div className="py-10 px-5 bg-[#f8f7f2] rounded-lg max-w-7xl mx-auto text-center mb-10">
      <h2 className="text-3xl font-['Great_Vibes'] text-[#B17F59] mb-12 font-semibold uppercase relative after:content-[''] after:w-[500px] after:h-0.5 after:bg-[#b8860b] after:absolute after:-bottom-3 after:left-1/2 after:-translate-x-1/2">
        MỘT SỐ MÓN ĂN BESTSELLER CỦA NHÀ HÀNG CHÚNG TÔI
      </h2>
      <div className="grid grid-cols-4 gap-5">
        {randomItems.map((item, index) => (
          <div key={index} className="rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all relative">
            <img
              src={item.image || "/images/default.jpg"}
              alt={item.name}
              className="w-[500px] h-[250px] object-cover"
            />
            <p className="my-2.5 text-base text-black font-['Great_Vibes'] font-medium px-2.5 overflow-hidden text-ellipsis line-clamp-2 min-h-[40px]">
              {item.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MonAn;