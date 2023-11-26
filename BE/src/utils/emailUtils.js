import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

import {
  formChangePassword,
  emailOauthRegister,
  emailRegister,
  formPasswordChanged,
  formResetPassword,
} from "../views";

import { emailBooking, emailBookingError } from "../views/formEmail";

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

export const sendMailBook = async (
  name,
  email,
  room,
  check_in,
  check_out,
  phone,
  address
) => {
  await transporter.sendMail({
    from: process.env.MAIL,
    to: email,
    subject: "Đặt phòng thành công",
    text: `Chào bạn, ${name}`,
    html: emailBooking(name, room, check_in, check_out, phone, address),
  });
};

export const sendMailBookError = async (
  name,
  email,
  room,
  check_in,
  check_out,
  phone,
  address
) => {
  await transporter.sendMail({
    from: process.env.MAIL,
    to: email,
    subject: "Hủy đặt phòng thành công",
    text: `Chào bạn, ${name}`,
    html: emailBookingError(name, room, check_in, check_out, phone, address),
  });
};
