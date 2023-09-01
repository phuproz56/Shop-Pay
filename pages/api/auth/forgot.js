import nc from "next-connect";
import db from "@/utils/db";
import { validateEmail } from "@/utils/validation";
import User from "@/models/User";
import bcrypt from "bcrypt";
import { createResetToken } from "@/utils/tokens";
import { sendEmail } from "@/utils/sendEmails";
import { resetEmailTemplate } from "@/emails/resetEmailTemplate";

const handler = nc();

handler.post(async (req, res) => {
  try {
    await db.connectDb();
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Email này không tồn tại!" });
    }
    const user_id = createResetToken({
      id: user._id.toString(),
    });
    const url = `${process.env.BASE_URL}/auth/reset/${user_id}`;
    sendEmail(email, url, "", "Reset your Password.", resetEmailTemplate);
    await db.disconnectDb();
    res.json({
      message: "Một email đã gửi cho bạn, dùng nó để reset password.",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default handler;
