import { Link, useLocation } from "react-router-dom";
import AsteriskIcon from "./AsteriskIcon";
import UnderlineIcon from "./UnderlineIcon";
import classNames from "classnames";

const MainFooter = () => {
  const location = useLocation();

  const onScrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <div
        className={classNames("contact-form", {
          "bg-[#f8f4f0]": location.pathname === "/",
        })}
      >
        <div className="max-w-[888px] mx-auto px-3 pt-[100px] pb-[70px]">
          <div>
            <div className="flex gap-x-1">
              <p className="text-[40px] leading-tight text-[#505F4E] font-bold baloo-font">
                Đăng ký
              </p>

              <AsteriskIcon />
            </div>

            <div className="flex gap-x-3 items-baseline">
              <UnderlineIcon />

              <p className="text-[40px] leading-tight text-[#505F4E] font-bold baloo-font">
                Nhận thông báo từ chúng tôi
              </p>
            </div>
          </div>

          <div className="flex gap-x-20 pl-12 mt-14">
            <p className="text-sm text-[#555555] w-56 max-w-full leading-6">
              Nhận thông tin cập nhật hàng tuần về sản phẩm của chúng tôi qua
              email của bạn, chúng tôi đảm bảo không có thư rác ✌️
            </p>

            <form className="h-14 p-3 flex items-center gap-x-3 bg-white w-[500px] max-w-full relative shadow-2xl">
              <div className="size-10 flex items-center justify-center bg-[#F8F8F8]">
                <img
                  src="/images/email-icon.png"
                  alt="Email icon"
                  className="block h-5"
                />
              </div>

              <input
                type="text"
                placeholder="youremail123@gmail.com"
                className="text-[#57656C] text-sm flex-1 outline-none border-none [&::placeholder]:text-sm [&::placeholder]:text-[#57656C]"
              />

              <button className="absolute uppercase top-9 h-12 cursor-pointer px-4 bg-[#656C66] right-0 font-semibold text-white font-[inherit] tracking-widest">
                Gửi đi
              </button>
            </form>
          </div>
        </div>
      </div>

      <footer>
        <div className="bg-[#053D29] text-[#F9F3EE] py-10">
          <div className="max-w-[1200px] mx-auto px-3 grid grid-cols-4 gap-12 text-sm">
            <div>
              <p className="mb-6 leading-7 mt-10">
                Việc khách hàng tuân theo quy trình huấn luyện là rất quan
                trọng, nhưng tôi làm Vào lúc đó họ lâm vào tình trạng lao động
                và đau đớn tột độ
              </p>

              <div className="flex items-center gap-x-5">
                <Link to="">
                  <i className="fa-brands fa-facebook"></i>
                </Link>
                <Link to="">
                  <i className="fa-brands fa-twitter"></i>
                </Link>
                <Link to="">
                  <i className="fa-brands fa-linkedin-in"></i>
                </Link>
                <Link to="">
                  <i className="fa-brands fa-youtube"></i>
                </Link>
                <Link to="">
                  <i className="fa-brands fa-instagram"></i>
                </Link>
              </div>
            </div>

            <div>
              <h3 className="mb-5 text-base font-medium">Giới thiệu</h3>

              <ul className="flex flex-col gap-y-3">
                <li>
                  <Link to="">Liên hệ chúng tôi</Link>
                </li>
                <li>
                  <Link to="">Về chúng tôi</Link>
                </li>
                <li>
                  <Link to="">Sự nghiệp</Link>
                </li>
                <li>
                  <Link to="">Thông tin công ty</Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-5 text-base font-medium">Giúp đỡ</h3>

              <ul className="flex flex-col gap-y-3">
                <li>
                  <Link to="">Nhà sản xuất của chúng tôi</Link>
                </li>
                <li>
                  <Link to="">Sự chi trả</Link>
                </li>
                <li>
                  <Link to="">Lô hàng</Link>
                </li>
                <li>
                  <Link to="">Hủy & Trả hàng</Link>
                </li>
                <li>
                  <Link to="">Báo cáo một sự vi phạm</Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-5 text-base font-medium">Chính trị</h3>

              <ul className="flex flex-col gap-y-3">
                <li>
                  <Link to="">Đảm bảo hoàn trả</Link>
                </li>
                <li>
                  <Link to="">Điều khoản sử dụng</Link>
                </li>
                <li>
                  <Link to="">Bảo vệ</Link>
                </li>
                <li>
                  <Link to="">Sự riêng tư</Link>
                </li>
                <li>
                  <Link to="">Thư mục trang</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-[#062F21]">
          <div className="max-w-[1200px] px-3 mx-auto flex justify-between items-center h-12 text-white text-sm">
            <p> 2023 hood.de , Inc.</p>

            <div>
              <img
                src="/images/icons_payment.png"
                alt="Payment icons"
                className="h-5"
              />
            </div>

            <div
              className="flex items-center gap-x-3 cursor-pointer"
              onClick={onScrollTop}
            >
              <p>Lên đầu</p>

              <div>
                <i className="fa-solid fa-arrow-up"></i>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default MainFooter;
