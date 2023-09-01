import nc from "next-connect";
import db from "@/utils/db";
import { validateEmail } from "@/utils/validation";
import User from "@/models/User";
import bcrypt from "bcrypt";
import { createActivationToken } from "@/utils/tokens";
import { sendEmail } from "@/utils/sendEmails";
import { activateEmailTemplate } from "@/emails/activateEmailTemplate";

const handler = nc();

handler.post(async (req, res) => {
  try {
    await db.connectDb();
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Vui lòng nhập đầy đủ." });
    }
    if (!validateEmail(email)) {
      return res
        .status(400)
        .json({ message: "Email bạn nhập không đúng định dạng." });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "Email đã tồn tại." });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password phải ít nhất 6 kí tự." });
    }
    const cryptedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({ name, email, password: cryptedPassword });
    const addedUser = await newUser.save();
    const activation_token = createActivationToken({
      id: addedUser._id.toString(),
    });
    const url = `${process.env.BASE_URL}/activate/${activation_token}`;
    sendEmail(email, url, "", "Activate your account.", activateEmailTemplate);
    await db.disconnectDb();
    res.json({
      message: "Đăng ký thành công! vui lòng kính hoạt email để bắt đầu!",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default handler;
