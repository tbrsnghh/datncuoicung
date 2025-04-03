import React from "react";
import { useNavigate } from "react-router-dom";

export default function SubHeader({subheader}) {
  const navigate= useNavigate();
  const handleNavigate = (path) => {
    console.log('path', path);
    
    navigate(path);
  }
  return (
    <>
      {subheader.map((item, index) => (
        <button
          key={index}
          className="bg-[#d63384] text-white px-4 py-1 mr-1 rounded-lg font-semibold shadow-sm hover:bg-[#c21867] transition"
          onClick={() => (item.action ? item.action() : handleNavigate(item.link))}
        >
          {item.name}
        </button>
      ))}
    </>
  );
}
