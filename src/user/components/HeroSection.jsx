import React, { useEffect, useState } from "react";
import styles from "./herosection.module.css"; 
const HeroSection = () => {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setHidden(scrollY > 500); // Ẩn khi cuộn quá 500px
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={`${styles.heroWrapper} ${hidden ? styles.hidden : ""}`}>
      <div className={styles.heroContainer}>
        <img
          src="/anhcuoi3.jpg"
          alt="Nhà Hàng Tiệc Cưới Đông Á"
          className={styles.heroImage}
          loading="lazy"
        />
      </div>
    </div>
  );
};

export default HeroSection;