const express = require('express');
const cors = require('cors');
const app = express();

// Cho phép Frontend gọi API mà không bị lỗi bảo mật CORS
app.use(cors());

// Một API Endpoint đơn giản trả về dữ liệu trạng thái
app.get('/api/status', (req, res) => {
  res.json({
    status: "success",
    message: "Máy chủ backend đang hoạt động trực tuyến!",
    time: new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' }),
    platform: "Hosted on Render 🚀"
  });
});

app.get('/', (req, res) => {
  res.send('Backend Server is running. Truy cập /api/status để xem dữ liệu JSON.');
});

// Chạy máy chủ (Render tự động cung cấp biến môi trường PORT)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server đang chạy tại port ${PORT}`);
});