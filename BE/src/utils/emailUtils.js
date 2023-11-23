import nodemailer from "nodemailer";
import dotenv from "dotenv";

import {
  formChangePassword,
  emailOauthRegister,
  emailRegister,
  formPasswordChanged,
  formResetPassword,
} from "../views";

dotenv.config();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  auth: {
    user: process.env.MAIL,
    pass: process.env.PASS,
  },
});

export const sendMailRegister = async (name, email) => {
  await transporter.sendMail({
    from: process.env.MAIL,
    to: email,
    subject: "Đăng ký tài khoản thành công",
    text: `Chào bạn, ${name}`,
    html: emailRegister(name),
  });
};

export const sendMailOauthRegister = async (name, email, password) => {
  await transporter.sendMail({
    from: process.env.MAIL,
    to: email,
    subject: "Đăng ký tài khoản thành công",
    text: `Chào bạn, ${name}`,
    html: emailOauthRegister(name, password),
  });
};

export const sendRestPassword = async (name, email, randomCode) => {
  await transporter.sendMail({
    from: "bavuongnganhthuongcung4@gmail.com",
    to: email,
    subject: "Thay đổi mật khẩu",
    text: `Chào bạn, ${name}`,
    html: formChangePassword(name, randomCode),
  });
};

export const sendChangedPassword = async (name, email) => {
  await transporter.sendMail({
    from: "bavuongnganhthuongcung4@gmail.com",
    to: email,
    subject: "Thay đổi mật khẩu",
    text: `Chào bạn, ${name}`,
    html: formPasswordChanged(name),
  });
};

export const sendForgotPassword = async (
  name,
  email,
  randomCode,
  resetPasswordUrl
) => {
  await transporter.sendMail({
    from: "bavuongnganhthuongcung4@gmail.com",
    to: email,
    subject: "Quên mật khẩu",
    text: `Chào bạn, ${name}`,
    html: formResetPassword(name, email, randomCode, resetPasswordUrl),
  });
};
