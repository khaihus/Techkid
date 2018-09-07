const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Schema để tạo ra khung, 
//Model: thực hiện thêm, sửa, xoá dựa theo Schema

//di chuột vào Schema để thấy cấu trúc
const QuestionSchema = new Schema({
    // id: Number,
    content: {type: String, require: true},     //bắt buộc phải có content (= not null trong SQL)
    yes: { type: Number, default: 0 },
    no: { type: Number, default: 0 },
    
}, {
    // _id:false,           
    //ko cho tự tạo id mặc định nữa (không cần phải code nó khi ko khai báo id ở bên trên)
    timestamps: true
});
//export để có thể dùng ở file khác
module.exports = mongoose.model('Question', QuestionSchema);

