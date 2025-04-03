import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ThiepCuoiEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const templates = {
    cloudy: { name: 'Cloudy', bgColor: 'bg-blue-50', border: 'border-2 border-blue-200', font: 'font-roboto' },
    'blue-horizon': { name: 'Blue Horizon', bgColor: 'bg-blue-100', border: 'border-2 border-blue-500', font: 'font-playfair' },
    gentle: { name: 'Gentle', bgColor: 'bg-gray-100', border: 'border border-gray-300', font: 'font-opensans' },
    'carrot-craze': { name: 'Carrot Craze', bgColor: 'bg-red-50', border: 'border-2 border-dashed border-orange-600', font: 'font-dancing' },
    brownleaf: { name: 'Brownleaf', bgColor: 'bg-amber-50', border: 'border-2 border-amber-900', font: 'font-greatvibes' },
    'viet-vibes': { name: 'Viet Vibes', bgColor: 'bg-amber-100', border: 'border-2 border-amber-600', font: 'font-noto' },
  };

  const [design, setDesign] = useState({
    brideName: '',
    groomName: '',
    date: '',
    venue: '',
    story: '',
    images: [],
  });

  const [generatedLink, setGeneratedLink] = useState('');

  const template = templates[id] || templates.cloudy;

  useEffect(() => {
    // Có thể fetch dữ liệu mẫu từ server nếu cần
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDesign((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const imageUrls = files.map((file) => URL.createObjectURL(file));
    setDesign((prev) => ({ ...prev, images: [...prev.images, ...imageUrls] }));
  };

  const removeImage = (index) => {
    setDesign((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const generateLink = () => {
    const uniqueId = Math.random().toString(36).substring(2, 15);
    const link = `${window.location.origin}/wedding-card/${uniqueId}`;
    setGeneratedLink(link);
    alert('Thiệp đã được tạo! Chia sẻ link với mọi người nhé.');
  };

  return (
    <div className="flex gap-5 p-10 max-w-7xl mx-auto">
      <div className="flex-1 bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl mb-6">Chỉnh Sửa Thiệp Cưới - {template.name}</h2>

        <div className="flex flex-col gap-5 mb-8">
          <input
            type="text"
            name="brideName"
            value={design.brideName}
            onChange={handleChange}
            placeholder="Tên cô dâu"
            className="p-3 border border-gray-300 rounded-lg text-base w-full"
          />
          <input
            type="text"
            name="groomName"
            value={design.groomName}
            onChange={handleChange}
            placeholder="Tên chú rể"
            className="p-3 border border-gray-300 rounded-lg text-base w-full"
          />
          <input
            type="date"
            name="date"
            value={design.date}
            onChange={handleChange}
            className="p-3 border border-gray-300 rounded-lg text-base w-full"
          />
          <input
            type="text"
            name="venue"
            value={design.venue}
            onChange={handleChange}
            placeholder="Địa điểm tổ chức"
            className="p-3 border border-gray-300 rounded-lg text-base w-full"
          />
        </div>

        <div className="mb-8">
          <label className="block mb-2">Thêm ảnh:</label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageUpload}
            className="w-full"
          />
        </div>

        <div className="mb-8">
          <textarea
            name="story"
            value={design.story}
            onChange={handleChange}
            placeholder="Câu chuyện tình yêu của bạn..."
            className="p-3 border border-gray-300 rounded-lg text-base w-full resize-none"
            rows="4"
          />
        </div>

        <button 
          className="py-3 px-8 bg-amber-500 text-white rounded-full hover:bg-amber-600 transition-colors"
          onClick={generateLink}
        >
          Tạo Thiệp & Lấy Link
        </button>

        {generatedLink && (
          <div className="mt-5 p-4 bg-blue-50 rounded-lg">
            <p>
              Link thiệp của bạn:{' '}
              <a href={generatedLink} target="_blank" rel="noopener noreferrer" className="text-amber-500 underline">
                {generatedLink}
              </a>
            </p>
          </div>
        )}
      </div>

      <div className="flex-1 flex justify-center items-center min-h-[500px] bg-gray-50 rounded-2xl">
        <div
          className={`p-10 text-center rounded-2xl shadow-lg w-[400px] ${template.bgColor} ${template.border} ${template.font}`}
        >
          <h1 className="text-2xl mb-4">{design.brideName || 'Cô Dâu'} & {design.groomName || 'Chú Rể'}</h1>
          <p className="mb-2">Ngày: {design.date || 'Chưa chọn ngày'}</p>
          <p className="mb-4">Địa điểm: {design.venue || 'Chưa chọn địa điểm'}</p>

          {design.images.length > 0 && (
            <div className="flex flex-wrap gap-4 justify-center mt-5">
              {design.images.map((img, index) => (
                <div key={index} className="relative w-[120px] h-[120px]">
                  <img src={img} alt={`Ảnh ${index + 1}`} className="w-full h-full object-cover rounded-lg" />
                  <button
                    className="absolute top-1 right-1 bg-red-500/80 text-white w-6 h-6 rounded-full hover:bg-red-600"
                    onClick={() => removeImage(index)}
                  >
                    X
                  </button>
                </div>
              ))}
            </div>
          )}

          {design.story && (
            <div className="mt-8 text-left">
              <h3 className="text-xl mb-2">Câu Chuyện Của Chúng Tôi</h3>
              <p>{design.story}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ThiepCuoiEditor;