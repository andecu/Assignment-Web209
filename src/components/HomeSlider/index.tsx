import "./HomeSlider.css";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay, Navigation } from "swiper/modules";

const HomeSlider = () => {
  return (
    <div className="banner-wrap">
      <Swiper
        autoplay
        loop
        modules={[Autoplay, Navigation]}
        navigation={{
          nextEl: ".slide-next",
          prevEl: ".slide-prev",
        }}
      >
        <SwiperSlide>
          <div>
            <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2">
              <div className="max-w-[1200px] px-3 mx-auto">
                <div className="w-[55%]">
                  <p className="text-[#505F4E] baloo-font text-[55px] font-bold leading-tight">
                    Chúng tôi chăm sóc <br />
                    ngôi nhà và khu vườn xinh đẹp của bạn
                  </p>

                  <p className="text-sm text-[#665345] mt-6 tracking-widest">
                    Lorem Ipsum chỉ đơn giản là văn bản giả được in và ngành sắp
                    chữ. Lorem Ipsum là người đứng đầu ngành văn bản giả tiêu
                    chuẩn kể từ những năm 1500,
                  </p>

                  <button className="border-[3px] border-[#505F4E] h-14 px-4 mt-5 font-[inherit] text-[#505F4E] tracking-widest rounded text-xl">
                    Xem thêm
                  </button>
                </div>
              </div>
            </div>

            <div>
              <img
                src="/images/banner-image.png"
                alt="Banner"
                className="block h-full w-[80vw] object-contain ml-auto"
              />
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div>
            <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2">
              <div className="max-w-[1200px] px-3 mx-auto">
                <div className="w-[55%]">
                  <p className="text-[#505F4E] baloo-font text-[55px] font-bold leading-tight">
                    Chúng tôi chăm sóc <br />
                    ngôi nhà và khu vườn xinh đẹp của bạn
                  </p>

                  <p className="text-sm text-[#665345] mt-6 tracking-widest">
                    Lorem Ipsum chỉ đơn giản là văn bản giả được in và ngành sắp
                    chữ. Lorem Ipsum là người đứng đầu ngành văn bản giả tiêu
                    chuẩn kể từ những năm 1500,
                  </p>

                  <button className="border-[3px] border-[#505F4E] h-14 px-4 mt-5 font-[inherit] text-[#505F4E] tracking-widest rounded text-xl">
                    Xem thêm
                  </button>
                </div>
              </div>
            </div>

            <div>
              <img
                src="/images/banner-image.png"
                alt="Banner"
                className="block h-full w-[80vw] object-contain ml-auto"
              />
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div>
            <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2">
              <div className="max-w-[1200px] px-3 mx-auto">
                <div className="w-[55%]">
                  <p className="text-[#505F4E] baloo-font text-[55px] font-bold leading-tight">
                    Chúng tôi chăm sóc <br />
                    ngôi nhà và khu vườn xinh đẹp của bạn
                  </p>

                  <p className="text-sm text-[#665345] mt-6 tracking-widest">
                    Lorem Ipsum chỉ đơn giản là văn bản giả được in và ngành sắp
                    chữ. Lorem Ipsum là người đứng đầu ngành văn bản giả tiêu
                    chuẩn kể từ những năm 1500,
                  </p>

                  <button className="border-[3px] border-[#505F4E] h-14 px-4 mt-5 font-[inherit] text-[#505F4E] tracking-widest rounded text-xl">
                    Xem thêm
                  </button>
                </div>
              </div>
            </div>

            <div>
              <img
                src="/images/banner-image.png"
                alt="Banner"
                className="block h-full w-[80vw] object-contain ml-auto"
              />
            </div>
          </div>
        </SwiperSlide>
      </Swiper>

      <button className="slide-prev absolute top-1/2 text-3xl -translate-y-1/2 text-[#000000B2] cursor-pointer left-9 z-10">
        <i className="fa-solid fa-chevron-left"></i>
      </button>
      <button className="slide-next absolute top-1/2 text-3xl -translate-y-1/2 right-9 z-10 text-[#000000B2] cursor-pointer">
        <i className="fa-solid fa-chevron-right"></i>
      </button>
    </div>
  );
};

export default HomeSlider;
