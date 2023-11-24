export const emailRegister = (name) => {
  return /*html*/ `
    <div style="font-family: Arial, sans-serif; background-color: #f0f0f0; padding: 10px;">
      <div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1); text-align: center; margin-top: 30px; margin-bottom: 30px;">
        <div style="font-size: 24px; font-weight: bold; color: #333333; margin-bottom: 10px;">
          Cảm ơn bạn đã đăng ký tài khoản!
        </div>
        <div style="font-size: 16px; color: #555555; line-height: 1.6;">
          <p>Kính gửi ${name},</p>
          <p>Chúng tôi xin gửi lời cảm ơn chân thành đến bạn vì đã đăng ký tài khoản trên trang web của chúng tôi.</p>
          <p>Việc đăng ký tài khoản sẽ giúp bạn trải nghiệm các dịch vụ và tiện ích tốt nhất mà chúng tôi cung cấp. Từ việc đặt phòng dễ dàng đến những ưu đãi và khuyến mãi hấp dẫn, chúng tôi cam kết mang đến cho bạn trải nghiệm đặt phòng khách sạn tốt nhất.</p>
          <p>Nếu bạn có bất kỳ câu hỏi hoặc cần sự hỗ trợ, đừng ngần ngại liên hệ với chúng tôi qua địa chỉ email
          <a href="mailto:support@kinghotel.com" style="color: #007bff;  text-decoration: none;" >support@kinghotel.com</a>
          hoặc số điện thoại 1800-203-203.
          </p>
          <p>Một lần nữa, chúng tôi xin chân thành cảm ơn bạn vì đã lựa chọn khách sạn của chúng tôi. Chúng tôi rất mong được phục vụ bạn trong thời gian tới.</p>
          <p>Trân trọng,</p>
          <p>King Hotel</p>
        </div>
      </div>
    </div>
  `;
};

export const emailOauthRegister = (name, password) => {
  return /*html*/ `
    <div style="font-family: Arial, sans-serif; background-color: #f0f0f0; padding: 10px;">
      <div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1); text-align: center; margin-top: 30px; margin-bottom: 30px;">
        <div style="font-size: 24px; font-weight: bold; color: #333333; margin-bottom: 10px;">
          Chào mừng ${name} đến với chúng tôi!
        </div>
        <div style="font-size: 16px; color: #555555; line-height: 1.6;">
          <p>Xin chân thành cảm ơn ${name} đã lựa chọn chúng tôi.</p>
          <p>Tài khoản của bạn đã được tạo thành công trên trang web của chúng tôi.</p>
          <p>Mật khẩu mặc định của bạn là: <strong>${password}</strong></p>
          <p>Bạn có thể đăng nhập bằng tài khoản này và sau đó thay đổi mật khẩu theo ý muốn.</p>
          <p>Nếu bạn có bất kỳ câu hỏi hoặc cần sự hỗ trợ, đừng ngần ngại liên hệ với chúng tôi qua địa chỉ email
          <a href="mailto:support@kinghotel.com" style="color: #007bff;  text-decoration: none;" >support@kinghotel.com</a>
          hoặc số điện thoại 1800-203-203.
          </p>
          <p>Chúng tôi rất mong được phục vụ bạn trong thời gian tới.</p>
          <p>Trân trọng,</p>
          <p>King Hotel</p>
        </div>
      </div>
    </div>
  `;
};



export const emailBooking = (name, room, check_in, check_out, phone, address) => {
  return /*html */ `
<div style="font-family: Arial, sans-serif; background-color: #f0f0f0; padding: 10px;">
      <div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1); text-align: center; margin-top: 30px; margin-bottom: 30px;">
        <div style="font-size: 24px; font-weight: bold; color: #333333; margin-bottom: 10px;">
          Chào mừng ${name} đến với chúng tôi!
        </div>
        <div style="font-size: 16px; color: #555555; line-height: 1.6;">
          <p>Xin chân thành cảm ơn ${name} đã lựa chọn chúng tôi.</p>
          <p>Thông tin đặt phòng của bạn đã được tạo thành công trên trang web của chúng tôi.</p>
          <p>Tên của bạn là: <strong>${name}</strong></p>
          <p>Số điện thoại: <strong>${phone}</strong></p>
          <p>Địa chỉ: <strong>${address}</strong></p>
          <p>Số phòng: <strong>${room}</strong></p>
          <p>Thời gian checkIn: <strong>${check_in}</strong></p>
          <p>Thời gian checkOut: <strong>${check_out}</strong></p>
          <p>Nếu bạn có bất kỳ câu hỏi hoặc cần sự hỗ trợ, đừng ngần ngại liên hệ với chúng tôi qua địa chỉ email
          <a href="mailto:support@kinghotel.com" style="color: #007bff;  text-decoration: none;" >support@kinghotel.com</a>
          hoặc số điện thoại 1800-203-203.
          </p>
          <p>Chúng tôi rất mong được phục vụ bạn trong thời gian tới.</p>
          </div>
          </div>
        </div>
`
}

export const formChangePassword = (name, randomCode) => {

  return /*html*/ `
  <div style="font-family: Arial, sans-serif; background-color: #f0f0f0; padding: 10px;">
  <div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1); text-align: center; margin-top: 30px; margin-bottom: 30px;">
    <div style="font-size: 24px; font-weight: bold; color: #333333; margin-bottom: 10px;">
          Xin chào, ${name}!
        </div>
        <div style="font-size: 16px; color: #555555; line-height: 1.6;">
          <p>Chúng tôi nhận được yêu cầu thay đổi mật khẩu cho tài khoản của bạn.</p>
          <p>Mã xác nhận của bạn là: <strong>${randomCode}</strong></p>
          <p>Vui lòng sử dụng mã này để thay đổi mật khẩu của bạn theo bước tiếp theo trên trang web của chúng tôi.</p>
          <p>Đây là một mã xác nhận duy nhất và chỉ có hiệu lực trong một khoảng thời gian ngắn.</p>
          <p>Nếu bạn không thực hiện yêu cầu này, vui lòng liên hệ chúng tôi ngay lập tức qua địa chỉ email
            <a href="mailto:support@kinghotel.com" style="color: #007bff;  text-decoration: none;" >support@kinghotel.com</a>
            hoặc số điện thoại 1800-203-203.
          </p>
          <p>Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi!</p>
          <p>Trân trọng,</p>
          <p>King Hotel</p>
        </div>
      </div>
    </div>
  `;
};


export const emailBookingError = (name, room, check_in, check_out, phone, address) => {
  return /*html*/ `
  <div style="font-family: Arial, sans-serif; background-color: #f0f0f0; padding: 10px;">
    <div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1); text-align: center; margin-top: 30px; margin-bottom: 30px;">
      <div style="font-size: 24px; font-weight: bold; color: #333333; margin-bottom: 10px;">
        Chào mừng ${name} đến với chúng tôi!
      </div>
      <div style="font-size: 16px; color: #555555; line-height: 1.6;">
        <p>Xin chân thành cảm ơn ${name} đã lựa chọn chúng tôi.</p>
        <p>Thông tin đặt phòng của bạn đã được hủy thành công trên trang web của chúng tôi.</p>
        <p>Tên của bạn là: <strong>${name}</strong></p>
        <p>Số điện thoại: <strong>${phone}</strong></p>
        <p>Địa chỉ: <strong>${address}</strong></p>
        <p>Số phòng: <strong>${room}</strong></p>
        <p>Thời gian checkIn: <strong>${check_in}</strong></p>
        <p>Thời gian checkOut: <strong>${check_out}</strong></p>
        <p>Nếu bạn có bất kỳ câu hỏi hoặc cần sự hỗ trợ, đừng ngần ngại liên hệ với chúng tôi qua địa chỉ email
        <a href="mailto:support@kinghotel.com" style="color: #007bff;  text-decoration: none;" >support@kinghotel.com</a>
        hoặc số điện thoại 1800-203-203.
        </p>
        <p>Chúng tôi rất mong được phục vụ bạn trong thời gian tới.</p>
        </div>
        </div>
        </div>`
}

export const formPasswordChanged = (name) => {

  return /*html*/ `
    <div style="font-family: Arial, sans-serif; background-color: #f0f0f0; padding: 10px;">
      <div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1); text-align: center; margin-top: 30px; margin-bottom: 30px;">
        <div style="font-size: 24px; font-weight: bold; color: #333333; margin-bottom: 10px;">
          Xin chào, ${name}!
        </div>
        <div style="font-size: 16px; color: #555555; line-height: 1.6;">
          <p>Mật khẩu của bạn đã được thay đổi thành công.</p>
          <p>Nếu bạn không thực hiện thay đổi này, vui lòng liên hệ chúng tôi ngay lập tức qua địa chỉ email
            <a href="mailto:support@kinghotel.com" style="color: #007bff;  text-decoration: none;" >support@kinghotel.com</a>
            hoặc số điện thoại 1800-203-203.
          </p>
          <p>Cảm ơn bạn đã tin tưởng và sử dụng dịch vụ của chúng tôi!</p>
          <p>Trân trọng,</p>
          <p>King Hotel</p>
        </div>
      </div>
    </div>
  `;
};

export const formResetPassword = (
  name,
  email,
  randomCode,
  resetPasswordUrl
) => {
  return /*html*/ `
    <div style="font-family: Arial, sans-serif; background-color: #f0f0f0; padding: 10px;">
      <div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1); text-align: center; margin-top: 30px; margin-bottom: 30px;">
        <div style="font-size: 24px; font-weight: bold; color: #333333; margin-bottom: 10px;">
          Xin chào, ${name}!
        </div>
        <div style="font-size: 16px; color: #555555; line-height: 1.6;">
          <p>Chúng tôi nhận được yêu cầu quên mật khẩu cho tài khoản ${email} của bạn.</p>
          <p>Mã xác nhận của bạn là: <strong>${randomCode}</strong></p>
          <p>Vui lòng sử dụng mã này để thay đổi mật khẩu của bạn theo bước tiếp theo trên trang web của chúng tôi.</p>
          <p>Đây là một mã xác nhận duy nhất và chỉ có hiệu lực trong một khoảng thời gian ngắn.</p>
          <p>
            Để đổi mật khẩu, vui lòng nhấn vào
            <a href="${resetPasswordUrl}" style="color: #007bff; text-decoration: none;">đây</a>
          </p>
          <p>Nếu bạn không thực hiện yêu cầu này, vui lòng liên hệ chúng tôi ngay lập tức qua địa chỉ email
            <a href="mailto:support@kinghotel.com" style="color: #007bff; text-decoration: none;">support@kinghotel.com</a>
            hoặc số điện thoại 1800-203-203.
          </p> 
          <p>Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi!</p>
          <p>Trân trọng,</p>
          <p>King Hotel</p>
        </div>
      </div>
    </div>
  `;
};
