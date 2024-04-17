import { useCookies } from "react-cookie";
import toast from "react-hot-toast";

import { BillInfo, BookingInfo, Container } from "../../../components";
import {
  useCreateBookingMutation,
  useVnPayPaymentMutation,
  useZaloPayPaymentMutation,
} from "../../../api";
import { useState } from "react";

const PaymentPage = () => {
  const [cookie, , removeCookie] = useCookies<string>();
  const [booking] = useCreateBookingMutation();
  const [paymentVnPay] = useVnPayPaymentMutation();
  const [paymentZaloPay] = useZaloPayPaymentMutation();
  const [isDepositAmount, setIsDepositAmount] = useState(false);
  const [dataBooking, setDataBooking] = useState(cookie?.booking);

  const toggleDepositAmount = () => {
    setIsDepositAmount(!isDepositAmount);

    const newDataBooking = { ...dataBooking };

    if (!isDepositAmount) {
      newDataBooking.total_price = (dataBooking.total_price * 30) / 100;
    } else {
      newDataBooking.total_price = cookie?.booking.total_price;
    }

    setDataBooking(newDataBooking);
  };

  const onToggleBooking = (method: string) => {
    dataBooking.payment_method = method;
    dataBooking.is_deposit_amount = isDepositAmount;

    booking(dataBooking)
      .unwrap()
      .then((response) => {
        toast.success(response.message);
        removeCookie("booking");

        const { _id, total_price, payment_method } = response.data;

        const dataPayment = {
          amount: total_price,
          total_payment: dataBooking.total_price,
          bookingId: _id,
        };

        payment_method === "VN Pay" &&
          paymentVnPay(dataPayment)
            .unwrap()
            .then((res) => {
              window.location.href = res.data;
            })
            .catch((error) => {
              console.log(error);
            });

        payment_method === "Zalo Pay" &&
          paymentZaloPay(dataPayment)
            .unwrap()
            .then((res) => {
              window.location.href = res.data;
            })
            .catch((error) => {
              console.log(error);
            });
      })
      .catch((error) => {
        toast.error(error.data.message);
      });
  };

  return (
    <>
      <Container>
        <div className="py-12 pb-16">
          <div className="relative flex items-center justify-center mb-5">
            <h2 className="mb-0 font-normal text-2xl text-center uppercase text-textLight dark:text-textDark">
              Thông tin đặt phòng
            </h2>
          </div>

          <div className="block mt-0">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <BillInfo onToggleBooking={(value) => onToggleBooking(value)} />

              <BookingInfo
                booking={dataBooking}
                isDepositAmount={isDepositAmount}
                setIsDepositAmount={toggleDepositAmount}
              />
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default PaymentPage;
