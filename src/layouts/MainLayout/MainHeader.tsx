import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { TOKEN_STORAGE_KEY, USER_INFO_STORAGE_KEY } from "../../constants";
import { useQuery } from "@tanstack/react-query";
import api from "../../api/api";

const MainHeader = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<{ name: string }>();

  const isLogged = localStorage.getItem(TOKEN_STORAGE_KEY);
  const userInfo = JSON.parse(
    localStorage.getItem(USER_INFO_STORAGE_KEY) as string
  );

  const { data } = useQuery({
    queryKey: ["CART"],
    queryFn: async () => {
      if (!isLogged) {
        return Promise.resolve(0);
      }

      // lấy id giỏ hàng
      const carts = await api.get("/carts", {
        params: {
          userId: userInfo.id,
        },
      });

      // nếu không có giỏ hàng
      if (!carts.data.length) {
        return Promise.resolve(0);
      }

      const cartId = carts.data[0].id;
      const cartItems = await api.get("/cartItems", {
        params: {
          cartId,
        },
      });
      return Promise.resolve(cartItems.data.length);
    },
  });

  const onSearch = ({ name }: { name: string }) => {
    navigate(`/search/?name=${name}`);
  };

  const onSignOut = () => {
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    localStorage.removeItem(USER_INFO_STORAGE_KEY);

    window.location.href = "/sign-in";
  };

  return (
    <div className="header-wrapper text-white">
      <div className="max-w-[1200px] mx-auto px-3">
        {/* header top */}
        <div className="py-4 flex items-center border-b border-b-[#E3E3E3]">
          <form
            onSubmit={handleSubmit(onSearch)}
            className="flex items-center bg-white px-2 rounded py-2 w-96 max-w-full ml-28"
          >
            <input
              type="text"
              {...register("name")}
              placeholder="Nhập tên sản phẩm"
              className="[&::placeholder]:text-sm outline-none border-none w-full text-black text-sm"
            />

            <div className="text-black px-2 cursor-pointer">
              <i className="fa-solid fa-magnifying-glass"></i>
            </div>
          </form>

          <div className="flex items-center ml-auto gap-x-14">
            <select
              name=""
              id=""
              className="bg-transparent text-white outline-none"
            >
              <option value="en">En</option>
              <option value="vi">Vi</option>
            </select>

            <div className="flex items-center gap-x-6">
              {isLogged ? (
                <div className="flex items-center gap-x-3">
                  <div className="text-2xl">
                    <i className="fa-regular fa-user"></i>
                  </div>

                  <div>

                    <p className="cursor-pointer" onClick={onSignOut}>
                      Đăng xuất
                    </p>
                  </div>
                </div>
              ) : (
                <Link to="/sign-in" className="flex items-center gap-x-2">
                  <div className="text-2xl">
                    <i className="fa-regular fa-user"></i>
                  </div>
                  <p>Đăng nhập</p>
                </Link>
              )}

              {isLogged && (
                <Link to="/cart" className="flex items-center gap-x-2">
                  <div className="text-2xl relative">
                    <i className="fa-solid fa-cart-shopping"></i>

                    {!!data && data > 0 && (
                      <span className="absolute -top-1 -right-2 bg-[#F80808] text-xs rounded-full size-[18px] flex items-center justify-center">
                        {data}
                      </span>
                    )}
                  </div>
                  <p>Giỏ hàng</p>
                </Link>
              )}
            </div>
          </div>
        </div>
        {/* end header top */}

        {/* header bottom */}
        <div className="flex items-center justify-between py-6">
          <Link to="/" className="flex items-center gap-x-2 relative group">
            <p className="font-semibold text-sm">Trang chủ</p>
          </Link>

          <Link to="/" className="flex items-center gap-x-2 relative group">
            <p className="font-semibold text-sm">Hộp trồng trọt</p>

            <div>
              <i className="fa-solid fa-angle-down"></i>
            </div>

            <div className="absolute top-full hidden group-hover:block z-20">
              <div className="mt-2 bg-white rounded py-3 px-2 min-w-36 shadow">
                <Link
                  to=""
                  className="flex items-center gap-x-1 [&:not(:last-child)]:mb-3"
                >
                  <span className="size-[3px] bg-[#505F4E] rounded-full block"></span>

                  <p className="text-sm text-[#665345]">Chậu vuông</p>
                </Link>

                <Link
                  to=""
                  className="flex items-center gap-x-1 [&:not(:last-child)]:mb-3"
                >
                  <span className="size-[3px] bg-[#505F4E] rounded-full block"></span>

                  <p className="text-sm text-[#665345]">Chậu tròn</p>
                </Link>

                <Link
                  to=""
                  className="flex items-center gap-x-1 [&:not(:last-child)]:mb-3"
                >
                  <span className="size-[3px] bg-[#505F4E] rounded-full block"></span>

                  <p className="text-sm text-[#665345]">Đế lót ly</p>
                </Link>

                <Link
                  to=""
                  className="flex items-center gap-x-1 [&:not(:last-child)]:mb-3"
                >
                  <span className="size-[3px] bg-[#505F4E] rounded-full block"></span>

                  <p className="text-sm text-[#665345]">Chậu trồng cây</p>
                </Link>
              </div>
            </div>
          </Link>

          <Link to="/" className="flex items-center gap-x-2 relative group">
            <p className="font-semibold text-sm">Phân bón</p>

            <div>
              <i className="fa-solid fa-angle-down"></i>
            </div>

            <div className="absolute top-full hidden group-hover:block z-20">
              <div className="mt-2 bg-white rounded py-3 px-2 min-w-36 shadow">
                <Link
                  to=""
                  className="flex items-center gap-x-1 [&:not(:last-child)]:mb-3"
                >
                  <span className="size-[3px] bg-[#505F4E] rounded-full block"></span>

                  <p className="text-sm text-[#665345]">Chậu vuông</p>
                </Link>

                <Link
                  to=""
                  className="flex items-center gap-x-1 [&:not(:last-child)]:mb-3"
                >
                  <span className="size-[3px] bg-[#505F4E] rounded-full block"></span>

                  <p className="text-sm text-[#665345]">Chậu tròn</p>
                </Link>

                <Link
                  to=""
                  className="flex items-center gap-x-1 [&:not(:last-child)]:mb-3"
                >
                  <span className="size-[3px] bg-[#505F4E] rounded-full block"></span>

                  <p className="text-sm text-[#665345]">Đế lót ly</p>
                </Link>

                <Link
                  to=""
                  className="flex items-center gap-x-1 [&:not(:last-child)]:mb-3"
                >
                  <span className="size-[3px] bg-[#505F4E] rounded-full block"></span>

                  <p className="text-sm text-[#665345]">Chậu trồng cây</p>
                </Link>
              </div>
            </div>
          </Link>

          <Link to="/" className="flex items-center gap-x-2 relative group">
            <p className="font-semibold text-sm">Đất và chất nền</p>

            <div>
              <i className="fa-solid fa-angle-down"></i>
            </div>

            <div className="absolute top-full hidden group-hover:block z-20">
              <div className="mt-2 bg-white rounded py-3 px-2 min-w-36 shadow">
                <Link
                  to=""
                  className="flex items-center gap-x-1 [&:not(:last-child)]:mb-3"
                >
                  <span className="size-[3px] bg-[#505F4E] rounded-full block"></span>

                  <p className="text-sm text-[#665345]">Chậu vuông</p>
                </Link>

                <Link
                  to=""
                  className="flex items-center gap-x-1 [&:not(:last-child)]:mb-3"
                >
                  <span className="size-[3px] bg-[#505F4E] rounded-full block"></span>

                  <p className="text-sm text-[#665345]">Chậu tròn</p>
                </Link>

                <Link
                  to=""
                  className="flex items-center gap-x-1 [&:not(:last-child)]:mb-3"
                >
                  <span className="size-[3px] bg-[#505F4E] rounded-full block"></span>

                  <p className="text-sm text-[#665345]">Đế lót ly</p>
                </Link>

                <Link
                  to=""
                  className="flex items-center gap-x-1 [&:not(:last-child)]:mb-3"
                >
                  <span className="size-[3px] bg-[#505F4E] rounded-full block"></span>

                  <p className="text-sm text-[#665345]">Chậu trồng cây</p>
                </Link>
              </div>
            </div>
          </Link>

          <Link to="/" className="flex items-center gap-x-2 relative group">
            <p className="font-semibold text-sm">Chậu & Hộp đựng</p>

            <div>
              <i className="fa-solid fa-angle-down"></i>
            </div>

            <div className="absolute top-full hidden group-hover:block z-20">
              <div className="mt-2 bg-white rounded py-3 px-2 min-w-36 shadow">
                <Link
                  to=""
                  className="flex items-center gap-x-1 [&:not(:last-child)]:mb-3"
                >
                  <span className="size-[3px] bg-[#505F4E] rounded-full block"></span>

                  <p className="text-sm text-[#665345]">Chậu vuông</p>
                </Link>

                <Link
                  to=""
                  className="flex items-center gap-x-1 [&:not(:last-child)]:mb-3"
                >
                  <span className="size-[3px] bg-[#505F4E] rounded-full block"></span>

                  <p className="text-sm text-[#665345]">Chậu tròn</p>
                </Link>

                <Link
                  to=""
                  className="flex items-center gap-x-1 [&:not(:last-child)]:mb-3"
                >
                  <span className="size-[3px] bg-[#505F4E] rounded-full block"></span>

                  <p className="text-sm text-[#665345]">Đế lót ly</p>
                </Link>

                <Link
                  to=""
                  className="flex items-center gap-x-1 [&:not(:last-child)]:mb-3"
                >
                  <span className="size-[3px] bg-[#505F4E] rounded-full block"></span>

                  <p className="text-sm text-[#665345]">Chậu trồng cây</p>
                </Link>
              </div>
            </div>
          </Link>

          <Link to="/" className="flex items-center gap-x-2 relative group">
            <p className="font-semibold text-sm">Thủy lợi</p>

            <div>
              <i className="fa-solid fa-angle-down"></i>
            </div>

            <div className="absolute top-full hidden group-hover:block z-20">
              <div className="mt-2 bg-white rounded py-3 px-2 min-w-36 shadow">
                <Link
                  to=""
                  className="flex items-center gap-x-1 [&:not(:last-child)]:mb-3"
                >
                  <span className="size-[3px] bg-[#505F4E] rounded-full block"></span>

                  <p className="text-sm text-[#665345]">Chậu vuông</p>
                </Link>

                <Link
                  to=""
                  className="flex items-center gap-x-1 [&:not(:last-child)]:mb-3"
                >
                  <span className="size-[3px] bg-[#505F4E] rounded-full block"></span>

                  <p className="text-sm text-[#665345]">Chậu tròn</p>
                </Link>

                <Link
                  to=""
                  className="flex items-center gap-x-1 [&:not(:last-child)]:mb-3"
                >
                  <span className="size-[3px] bg-[#505F4E] rounded-full block"></span>

                  <p className="text-sm text-[#665345]">Đế lót ly</p>
                </Link>

                <Link
                  to=""
                  className="flex items-center gap-x-1 [&:not(:last-child)]:mb-3"
                >
                  <span className="size-[3px] bg-[#505F4E] rounded-full block"></span>

                  <p className="text-sm text-[#665345]">Chậu trồng cây</p>
                </Link>
              </div>
            </div>
          </Link>

          <Link to="/" className="flex items-center gap-x-2 relative group">
            <p className="font-semibold text-sm">Cây & Làm vườn</p>

            <div>
              <i className="fa-solid fa-angle-down"></i>
            </div>

            <div className="absolute top-full hidden group-hover:block z-20">
              <div className="mt-2 bg-white rounded py-3 px-2 min-w-36 shadow">
                <Link
                  to=""
                  className="flex items-center gap-x-1 [&:not(:last-child)]:mb-3"
                >
                  <span className="size-[3px] bg-[#505F4E] rounded-full block"></span>

                  <p className="text-sm text-[#665345]">Chậu vuông</p>
                </Link>

                <Link
                  to=""
                  className="flex items-center gap-x-1 [&:not(:last-child)]:mb-3"
                >
                  <span className="size-[3px] bg-[#505F4E] rounded-full block"></span>

                  <p className="text-sm text-[#665345]">Chậu tròn</p>
                </Link>

                <Link
                  to=""
                  className="flex items-center gap-x-1 [&:not(:last-child)]:mb-3"
                >
                  <span className="size-[3px] bg-[#505F4E] rounded-full block"></span>

                  <p className="text-sm text-[#665345]">Đế lót ly</p>
                </Link>

                <Link
                  to=""
                  className="flex items-center gap-x-1 [&:not(:last-child)]:mb-3"
                >
                  <span className="size-[3px] bg-[#505F4E] rounded-full block"></span>

                  <p className="text-sm text-[#665345]">Chậu trồng cây</p>
                </Link>
              </div>
            </div>
          </Link>

          <Link to="/" className="flex items-center gap-x-2 relative group">
            <p className="font-semibold text-sm">
              Thông gió và điều hòa không khí
            </p>

            <div>
              <i className="fa-solid fa-angle-down"></i>
            </div>

            <div className="absolute top-full hidden group-hover:block z-20">
              <div className="mt-2 bg-white rounded py-3 px-2 min-w-36 shadow">
                <Link
                  to=""
                  className="flex items-center gap-x-1 [&:not(:last-child)]:mb-3"
                >
                  <span className="size-[3px] bg-[#505F4E] rounded-full block"></span>

                  <p className="text-sm text-[#665345]">Chậu vuông</p>
                </Link>

                <Link
                  to=""
                  className="flex items-center gap-x-1 [&:not(:last-child)]:mb-3"
                >
                  <span className="size-[3px] bg-[#505F4E] rounded-full block"></span>

                  <p className="text-sm text-[#665345]">Chậu tròn</p>
                </Link>

                <Link
                  to=""
                  className="flex items-center gap-x-1 [&:not(:last-child)]:mb-3"
                >
                  <span className="size-[3px] bg-[#505F4E] rounded-full block"></span>

                  <p className="text-sm text-[#665345]">Đế lót ly</p>
                </Link>

                <Link
                  to=""
                  className="flex items-center gap-x-1 [&:not(:last-child)]:mb-3"
                >
                  <span className="size-[3px] bg-[#505F4E] rounded-full block"></span>

                  <p className="text-sm text-[#665345]">Chậu trồng cây</p>
                </Link>
              </div>
            </div>
          </Link>
        </div>
        {/* header bottom */}
      </div>
    </div>
  );
};

export default MainHeader;
