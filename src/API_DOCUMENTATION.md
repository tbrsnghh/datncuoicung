# API Documentation - RiverRes

## Base URL
```
http://localhost:8081
```

## Authentication
Các API yêu cầu xác thực cần gửi token trong header:
```
Authorization: Bearer <token>
```

## API Endpoints

### 1. Hall APIs

#### 1.1. Lấy danh sách tất cả sảnh
- **URL**: `/api/halls`
- **Method**: `GET`
- **Auth**: Không yêu cầu

**Response Example**:
```json
[
  {
    "id": 1,
    "name": "Sảnh Hồng",
    "capacity": 100,
    "price": 5000000,
    "morningPrice": 4000000,
    "afternoonPrice": 4500000,
    "eveningPrice": 5500000,
    "nightPrice": 6000000,
    "customPriceMultiplier": 1.5,
    "image": "https://example.com/hall1.jpg",
    "description": "Sảnh tiệc sang trọng",
    "createdAt": "2023-04-01T10:00:00.000Z",
    "updatedAt": "2023-04-01T10:00:00.000Z"
  },
  {
    "id": 2,
    "name": "Sảnh Xanh",
    "capacity": 200,
    "price": 8000000,
    "morningPrice": 6000000,
    "afternoonPrice": 7000000,
    "eveningPrice": 9000000,
    "nightPrice": 10000000,
    "customPriceMultiplier": 1.5,
    "image": "https://example.com/hall2.jpg",
    "description": "Sảnh tiệc lớn",
    "createdAt": "2023-04-01T10:00:00.000Z",
    "updatedAt": "2023-04-01T10:00:00.000Z"
  }
]
```

#### 1.2. Lấy chi tiết 1 sảnh
- **URL**: `/api/halls/:id`
- **Method**: `GET`
- **Auth**: Không yêu cầu

**Response Example**:
```json
{
  "id": 1,
  "name": "Sảnh Hồng",
  "capacity": 100,
  "price": 5000000,
  "morningPrice": 4000000,
  "afternoonPrice": 4500000,
  "eveningPrice": 5500000,
  "nightPrice": 6000000,
  "customPriceMultiplier": 1.5,
  "image": "https://example.com/hall1.jpg",
  "description": "Sảnh tiệc sang trọng",
  "createdAt": "2023-04-01T10:00:00.000Z",
  "updatedAt": "2023-04-01T10:00:00.000Z"
}
```

#### 1.3. Lấy thông tin khung giờ
- **URL**: `/api/halls/time-slots/info`
- **Method**: `GET`
- **Auth**: Không yêu cầu

**Response Example**:
```json
{
  "morning": {
    "name": "Sáng",
    "startTime": "06:00:00",
    "endTime": "11:00:00",
    "description": "Khung giờ sáng từ 6:00 đến 11:00"
  },
  "afternoon": {
    "name": "Trưa",
    "startTime": "11:00:00",
    "endTime": "15:00:00",
    "description": "Khung giờ trưa từ 11:00 đến 15:00"
  },
  "evening": {
    "name": "Chiều",
    "startTime": "15:00:00",
    "endTime": "19:00:00",
    "description": "Khung giờ chiều từ 15:00 đến 19:00"
  },
  "night": {
    "name": "Tối",
    "startTime": "19:00:00",
    "endTime": "23:00:00",
    "description": "Khung giờ tối từ 19:00 đến 23:00"
  },
  "custom": {
    "name": "Tùy chỉnh",
    "description": "Khung giờ tùy chỉnh theo yêu cầu"
  }
}
```

#### 1.4. Tính giá sảnh theo khung giờ
- **URL**: `/api/halls/:id/calculate-price`
- **Method**: `POST`
- **Auth**: Không yêu cầu

**Request Example**:
```json
{
  "timeSlot": "morning",
  "startTime": "08:00:00",
  "endTime": "10:00:00"
}
```

**Response Example**:
```json
{
  "hallId": 1,
  "timeSlot": "morning",
  "price": 4000000
}
```

#### 1.5. Kiểm tra sảnh có sẵn
- **URL**: `/api/halls/:id/check-availability`
- **Method**: `POST`
- **Auth**: Không yêu cầu

**Request Example**:
```json
{
  "startTime": "08:00:00",
  "endTime": "10:00:00",
  "eventDate": "2023-05-01"
}
```

**Response Example**:
```json
{
  "isAvailable": true
}
```

#### 1.6. Lấy lịch trình của một sảnh trong một ngày
- **URL**: `/api/halls/:id/schedule?date=2023-05-01`
- **Method**: `GET`
- **Auth**: Không yêu cầu

**Response Example**:
```json
[
  {
    "hour": 0,
    "isAvailable": true,
    "events": []
  },
  {
    "hour": 1,
    "isAvailable": true,
    "events": []
  },
  // ... các giờ khác
  {
    "hour": 8,
    "isAvailable": false,
    "events": [
      {
        "id": 1,
        "status": "confirmed",
        "userId": 1,
        "startTime": "08:00:00",
        "endTime": "10:00:00",
        "timeSlot": "morning"
      }
    ]
  },
  {
    "hour": 9,
    "isAvailable": false,
    "events": [
      {
        "id": 1,
        "status": "confirmed",
        "userId": 1,
        "startTime": "08:00:00",
        "endTime": "10:00:00",
        "timeSlot": "morning"
      }
    ]
  }
  // ... các giờ khác
]
```

#### 1.7. Lấy danh sách sảnh còn trống trong một ngày
- **URL**: `/api/halls/available`
- **Method**: `POST`
- **Auth**: Không yêu cầu

**Request Example**:
```json
{
  "date": "2023-05-01"
}
```

**Response Example**:
```json
[
  {
    "id": 1,
    "name": "Sảnh Hồng",
    "capacity": 100,
    "price": 5000000,
    "morningPrice": 4000000,
    "afternoonPrice": 4500000,
    "eveningPrice": 5500000,
    "nightPrice": 6000000,
    "customPriceMultiplier": 1.5,
    "image": "https://example.com/hall1.jpg",
    "description": "Sảnh tiệc sang trọng",
    "availableTimeSlots": [0, 1, 2, 3, 4, 5, 6, 7, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]
  },
  {
    "id": 2,
    "name": "Sảnh Xanh",
    "capacity": 200,
    "price": 8000000,
    "morningPrice": 6000000,
    "afternoonPrice": 7000000,
    "eveningPrice": 9000000,
    "nightPrice": 10000000,
    "customPriceMultiplier": 1.5,
    "image": "https://example.com/hall2.jpg",
    "description": "Sảnh tiệc lớn",
    "availableTimeSlots": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]
  }
]
```

### 2. Event APIs

#### 2.1. Lấy danh sách tất cả sự kiện
- **URL**: `/api/events`
- **Method**: `GET`
- **Auth**: Không yêu cầu

**Response Example**:
```json
[
  {
    "id": 1,
    "userId": 1,
    "hallId": 1,
    "menuId": 1,
    "eventDate": "2023-05-01",
    "timeSlot": "morning",
    "startTime": "08:00:00",
    "endTime": "10:00:00",
    "numberOfTables": 10,
    "numberOfGuests": 100,
    "status": "confirmed",
    "totalPrice": 4500000,
    "advanceBookingDays": 15,
    "createdAt": "2023-04-15T10:00:00.000Z",
    "updatedAt": "2023-04-15T10:00:00.000Z",
    "Hall": {
      "name": "Sảnh Hồng",
      "capacity": 100
    }
  }
]
```

#### 2.2. Lấy chi tiết 1 sự kiện
- **URL**: `/api/events/:id`
- **Method**: `GET`
- **Auth**: Không yêu cầu

**Response Example**:
```json
{
  "id": 1,
  "userId": 1,
  "hallId": 1,
  "menuId": 1,
  "eventDate": "2023-05-01",
  "timeSlot": "morning",
  "startTime": "08:00:00",
  "endTime": "10:00:00",
  "numberOfTables": 10,
  "numberOfGuests": 100,
  "status": "confirmed",
  "totalPrice": 4500000,
  "advanceBookingDays": 15,
  "createdAt": "2023-04-15T10:00:00.000Z",
  "updatedAt": "2023-04-15T10:00:00.000Z",
  "Hall": {
    "name": "Sảnh Hồng",
    "capacity": 100
  }
}
```

#### 2.3. Tạo sự kiện mới
- **URL**: `/api/events`
- **Method**: `POST`
- **Auth**: Yêu cầu

**Request Example**:
```json
{
  "userId": 1,
  "hallId": 1,
  "menuId": 1,
  "eventDate": "2023-05-01",
  "timeSlot": "morning",
  "startTime": "08:00:00",
  "endTime": "10:00:00",
  "numberOfTables": 10,
  "numberOfGuests": 100
}
```

**Response Example**:
```json
{
  "id": 1,
  "userId": 1,
  "hallId": 1,
  "menuId": 1,
  "eventDate": "2023-05-01",
  "timeSlot": "morning",
  "startTime": "08:00:00",
  "endTime": "10:00:00",
  "numberOfTables": 10,
  "numberOfGuests": 100,
  "status": "pending",
  "totalPrice": 4500000,
  "advanceBookingDays": 15,
  "createdAt": "2023-04-15T10:00:00.000Z",
  "updatedAt": "2023-04-15T10:00:00.000Z"
}
```

#### 2.4. Cập nhật sự kiện
- **URL**: `/api/events/:id`
- **Method**: `PUT`
- **Auth**: Yêu cầu

**Request Example**:
```json
{
  "status": "confirmed",
  "numberOfTables": 12,
  "numberOfGuests": 120
}
```

**Response Example**:
```json
{
  "id": 1,
  "userId": 1,
  "hallId": 1,
  "menuId": 1,
  "eventDate": "2023-05-01",
  "timeSlot": "morning",
  "startTime": "08:00:00",
  "endTime": "10:00:00",
  "numberOfTables": 12,
  "numberOfGuests": 120,
  "status": "confirmed",
  "totalPrice": 4800000,
  "advanceBookingDays": 15,
  "createdAt": "2023-04-15T10:00:00.000Z",
  "updatedAt": "2023-04-15T10:00:00.000Z"
}
```

#### 2.5. Xóa sự kiện
- **URL**: `/api/events/:id`
- **Method**: `DELETE`
- **Auth**: Yêu cầu

**Response Example**:
```json
{
  "message": "Đã xóa sự kiện thành công!"
}
```

#### 2.6. Lấy sự kiện theo trạng thái
- **URL**: `/api/events/status/:status`
- **Method**: `GET`
- **Auth**: Không yêu cầu

**Response Example**:
```json
[
  {
    "id": 1,
    "userId": 1,
    "hallId": 1,
    "menuId": 1,
    "eventDate": "2023-05-01",
    "timeSlot": "morning",
    "startTime": "08:00:00",
    "endTime": "10:00:00",
    "numberOfTables": 10,
    "numberOfGuests": 100,
    "status": "confirmed",
    "totalPrice": 4500000,
    "advanceBookingDays": 15,
    "createdAt": "2023-04-15T10:00:00.000Z",
    "updatedAt": "2023-04-15T10:00:00.000Z",
    "Hall": {
      "name": "Sảnh Hồng",
      "capacity": 100
    }
  }
]
```

#### 2.7. Lấy sự kiện theo khoảng thời gian
- **URL**: `/api/events/date-range?startDate=2023-05-01&endDate=2023-05-31`
- **Method**: `GET`
- **Auth**: Không yêu cầu

**Response Example**:
```json
[
  {
    "id": 1,
    "userId": 1,
    "hallId": 1,
    "menuId": 1,
    "eventDate": "2023-05-01",
    "timeSlot": "morning",
    "startTime": "08:00:00",
    "endTime": "10:00:00",
    "numberOfTables": 10,
    "numberOfGuests": 100,
    "status": "confirmed",
    "totalPrice": 4500000,
    "advanceBookingDays": 15,
    "createdAt": "2023-04-15T10:00:00.000Z",
    "updatedAt": "2023-04-15T10:00:00.000Z",
    "Hall": {
      "name": "Sảnh Hồng",
      "capacity": 100
    }
  }
]
```

#### 2.8. Kiểm tra sảnh có sẵn cho sự kiện
- **URL**: `/api/events/check-hall-availability`
- **Method**: `POST`
- **Auth**: Không yêu cầu

**Request Example**:
```json
{
  "hallId": 1,
  "startTime": "08:00:00",
  "endTime": "10:00:00",
  "eventDate": "2023-05-01"
}
```

**Response Example**:
```json
{
  "isAvailable": true
}
```

#### 2.9. Lấy thông tin khung giờ
- **URL**: `/api/events/time-slots/info`
- **Method**: `GET`
- **Auth**: Không yêu cầu

**Response Example**:
```json
{
  "morning": {
    "name": "Sáng",
    "startTime": "06:00:00",
    "endTime": "11:00:00",
    "description": "Khung giờ sáng từ 6:00 đến 11:00"
  },
  "afternoon": {
    "name": "Trưa",
    "startTime": "11:00:00",
    "endTime": "15:00:00",
    "description": "Khung giờ trưa từ 11:00 đến 15:00"
  },
  "evening": {
    "name": "Chiều",
    "startTime": "15:00:00",
    "endTime": "19:00:00",
    "description": "Khung giờ chiều từ 15:00 đến 19:00"
  },
  "night": {
    "name": "Tối",
    "startTime": "19:00:00",
    "endTime": "23:00:00",
    "description": "Khung giờ tối từ 19:00 đến 23:00"
  },
  "custom": {
    "name": "Tùy chỉnh",
    "description": "Khung giờ tùy chỉnh theo yêu cầu"
  }
}
```

## Lưu ý quan trọng

1. **Thời gian đặt trước**: Phải đặt sảnh trước ít nhất 5 ngày
2. **Khung giờ**: Có 5 khung giờ: sáng, trưa, chiều, tối và tùy chỉnh
3. **Tính giá**: 
   - Giá sảnh tùy theo khung giờ
   - Nếu khung giờ tùy chỉnh kéo dài hơn 4 giờ, áp dụng hệ số nhân
   - Tổng giá = (giá sảnh + giá menu * số bàn) * (1 + (số ngày đặt trước / 30))
4. **Xung đột lịch**: Hệ thống sẽ kiểm tra xem sảnh đã được đặt trong khoảng thời gian đó chưa 