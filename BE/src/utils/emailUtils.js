import nodemailer from "nodemailer";
import dotenv from "dotenv";

import {
    formChangePassword,
    emailOauthRegister,
    emailRegister,
    formPasswordChanged,
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




//TODO quên mật khẩu
export const FormEmail = (name, email, randomCode, resetPasswordUrl) => {
    return /*html*/ `
        <div style="margin: 5px auto 5px; padding: 5px; max-width: 600px; background: linear-gradient(to left,#7347c1,#0674ec); border: 5px solid transparent; background-repeat: no-repeat; background-origin: padding-box,border-box">
            <table cellpadding="0" cellspacing="0" border="0" align="center" style="background:white">
                <tbody>
                    <table cellpadding="0" cellspacing="0" border="0" align="center" width="600">
                        <tbody>
                            <tr>
                                <td width="100%" colspan="3" align="center" style="padding-bottom:10px;padding-top:25px">
                                    <div align="center">
                                        <h2>Khôi phục tài khoản</h2>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td width="100">&nbsp;</td>
                                <td width="400" align="center">
                                    <div align="left">
                                        <p>
                                            Xin chào <b style="color:#0674ec">${name ? name : "bạn"}</b>
                                            <div>&nbsp;</div>
                                            Email: <b style="color:#0674ec">${email}</b>
                                            <div>&nbsp;</div>
                                            Mã bảo mật: <b style="color:red">${randomCode}</b>
                                            <div>&nbsp;</div>
                                            Bấm vào nút <b style="color:#0674ec">Khôi Phục</b> bên dưới để đổi mật khẩu<br>
                                            <div>&nbsp;</div>
                                            <span style="color:red">Thư này chỉ tồn tại trong 3 phút</span>
                                        </p>
                                    </div>
                                </td>
                                <td width="100">&nbsp;</td>
                            </tr>
                        </tbody>
                    </table>
                    <table cellpadding="0" cellspacing="0" border="0" align="center" width="600">
                        <tbody>
                            <tr>
                                <td width="200">&nbsp;</td>
                                <td width="200" align="center" style="padding-top:25px">
                                    <table cellpadding="0" cellspacing="0" border="0" align="center" width="200" height="50">
                                        <tbody>
                                            <tr>
                                                <td bgcolor="#0674ec" align="center" style="border-radius:4px" width="200" height="50">
                                                    <a href=${resetPasswordUrl} target="_blank" style="color: white; text-decoration: none">
                                                        <div align="center">
                                                            <p>Khôi phục</p>
                                                        </div>
                                                    </a>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                                <td width="200">&nbsp;</td>
                            </tr>
                        </tbody>
                    </table>
                </tbody>
                <div>&nbsp;</div>
                <div>&nbsp;</div>
            </table>
        </div>
    `;
};

export const sendMail = async (name, email, randomCode, resetPasswordUrl) => {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        auth: {
            user: "nghichtest226@gmail.com",
            pass: "iciu eoev xinm jhcb",
        },
    });

    let info = await transporter.sendMail({
        from: "nghichtest226@gmail.com",
        to: email,
        subject: "Quên mật khẩu",
        text: "Chào bạn, " + email,
        html: `${FormEmail(name, email, randomCode, resetPasswordUrl)}`,
    });
};