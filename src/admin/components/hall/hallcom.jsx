const HallSelected = ({ selectedHall }) => {
    return (
        <div className="space-y-6">
        {/* Tên sảnh */}
        <h3 className="text-xl font-semibold text-gray-800 border-b pb-2">
          {selectedHall.name}
        </h3>

        {/* Thông tin cơ bản */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-gray-600">
              <span className="font-medium">Sức chứa:</span>
              <span className="ml-2">{selectedHall.capacity} người</span>
            </p>
          </div>

          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-gray-600">
              <span className="font-medium">Trạng thái:</span>
              <span className="ml-2">{selectedHall.status}</span>
            </p>
          </div>

          <div className="bg-gray-50 p-3 rounded-lg col-span-2">
            <p className="text-gray-600">
              <span className="font-medium">Giá cơ bản:</span>
              <span className="ml-2">{selectedHall.price?.toLocaleString()} VND</span>
            </p>
          </div>

          <div className="bg-gray-50 p-3 rounded-lg col-span-2">
            <p className="text-gray-600">
              <span className="font-medium">Mô tả:</span>
              <span className="ml-2">{selectedHall.description}</span>
            </p>
          </div>
        </div>

        {/* Lịch trình */}
        <div>
          <h4 className="font-semibold text-gray-800 mb-3">Lịch trình sử dụng:</h4>
          <div className="bg-gray-50 rounded-lg overflow-hidden">
            {selectedHall.schedule?.map((event, index) => (
              <div 
                key={index} 
                className="p-3 border-b last:border-0 hover:bg-white transition-colors duration-200"
              >
                <span className="font-medium text-gray-700">{event.date}</span>
                <span className="mx-2">•</span>
                <span>{event.time}</span>
                <span className="mx-2">-</span>
                <span className="text-gray-600">{event.event}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
}

export {HallSelected};
