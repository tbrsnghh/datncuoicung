import React from 'react';

const Banner = () => {
  return (
    <section
      className="h-[70vh] w-full bg-no-repeat bg-center bg-cover flex justify-center items-center text-center text-white relative z-[1]"
      style={{ backgroundImage: `url('/images/bannermenu444.png')` }}
    >
      <div className="p-8 bg-black/60 rounded-2xl max-w-[90%] shadow-lg">
        <h1 className="text-[2.8rem] font-bold mb-4 leading-tight drop-shadow-[2px_2px_4px_rgba(0,0,0,0.5)]">
          Thực Đơn
        </h1>
        <p className="text-xl mb-6 font-normal opacity-90">
          Khám phá các món ăn đặc sắc của chúng tôi
        </p>
      </div>
    </section>
  );
};

export default Banner;