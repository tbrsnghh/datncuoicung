// src/components/thiepcuoi/ThiepCuoiHome.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './thiepcuoi.module.css';

const ThiepCuoiHome = () => {
  // Danh sách mẫu thiệp/website
  const templates = [
    {
      id: 'cloudy',
      name: 'Cloudy',
      description: 'Giao diện nhẹ nhàng, phong cách hiện đại',
      image: 'https://via.placeholder.com/300x200?text=Cloudy',
      bgColor: '#f0f8ff',
    },
    {
      id: 'blue-horizon',
      name: 'Blue Horizon',
      description: 'Phong cách lãng mạn, màu xanh dịu mát',
      image: 'https://via.placeholder.com/300x200?text=Blue+Horizon',
      bgColor: '#e6f3ff',
    },
    {
      id: 'gentle',
      name: 'Gentle',
      description: 'Thiết kế nhẹ nhàng, tối giản',
      image: 'https://via.placeholder.com/300x200?text=Gentle',
      bgColor: '#f5f5f5',
    },
    {
      id: 'carrot-craze',
      name: 'Carrot Craze',
      description: 'Màu cam nổi bật, trẻ trung',
      image: 'https://via.placeholder.com/300x200?text=Carrot+Craze',
      bgColor: '#fff0f0',
    },
    {
      id: 'brownleaf',
      name: 'Brownleaf',
      description: 'Phong cách cổ điển, thiên nhiên',
      image: 'https://via.placeholder.com/300x200?text=Brownleaf',
      bgColor: '#f5e8c7',
    },
    {
      id: 'viet-vibes',
      name: 'Viet Vibes',
      description: 'Giao diện truyền thống Việt Nam',
      image: 'https://via.placeholder.com/300x200?text=Viet+Vibes',
      bgColor: '#f0e4d7',
    },
  ];

  return (
    <div className={styles.homeContainer}>
      <header className={styles.header}>
        <h1 className={styles.logo}>iWedding</h1>
        <nav className={styles.nav}>
          <a href="#home">Trang Chủ</a>
          <a href="#templates">Mẫu Thiệp</a>
          <a href="#contact">Liên Hệ</a>
        </nav>
      </header>

      <div className={styles.hero}>
        <h2>Khám Phá Giao Diện Website Đám Cưới</h2>
        <p>Hãy chọn mẫu phù hợp nhất để tạo thiệp cưới hoàn hảo!</p>
        <button className={styles.ctaButton}>Tạo Ngay Miễn Phí</button>
      </div>

      <div className={styles.templatesGrid}>
        {templates.map((template) => (
          <Link
            to={`/edit-template/${template.id}`}
            key={template.id}
            className={styles.templateCard}
            style={{ background: template.bgColor }}
          >
            <img src={template.image} alt={template.name} className={styles.templateImage} />
            <div className={styles.templateInfo}>
              <h3>{template.name}</h3>
              <p>{template.description}</p>
              <button className={styles.viewButton}>Xem & Chỉnh Sửa</button>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ThiepCuoiHome;