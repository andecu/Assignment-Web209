import { useMutation, useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { TOKEN_STORAGE_KEY, USER_INFO_STORAGE_KEY } from "../../constants";
import api from "../../api/api";
import { IProduct } from "../../interfaces/product";
import { formatPrice } from "../../utils";
import { useMemo } from "react";
import { queryClient } from "../../main";

export interface ICart {
  id: number;
  cartId: number;
  product: IProduct;
  quantity: number;
  productId: string;
}

const CartPage = () => {
  const isLogged = localStorage.getItem(TOKEN_STORAGE_KEY);
  const userInfo = JSON.parse(
    localStorage.getItem(USER_INFO_STORAGE_KEY) as string
  );

  const { data, refetch } = useQuery({
    queryKey: ["CART_DATA"],
    queryFn: async () => {
      if (!isLogged) {
        return Promise.resolve([]);
      }

      // lấy id giỏ hàng
      const carts = await api.get("/carts", {
        params: {
          userId: userInfo.id,
        },
      });

      // nếu không có giỏ hàng
      if (!carts.data.length) {
        return Promise.resolve([]);
      }

      const cartId = carts.data[0].id;
      const cartItems = await api.get("/cartItems", {
        params: {
          cartId,
          _expand: "product",
        },
      });
      return Promise.resolve(cartItems.data);
    },
  });



  const deleteProductMutation = useMutation({
    mutationFn: (cartItemId: number) => {
      return api.delete(`/cartItems/${cartItemId}`);
    },
    onSuccess: () => {
      refetch();
      queryClient.invalidateQueries({ queryKey: ["CART"] });
    },
  });

  const totalPrice = useMemo(() => {
    if (!data) {
      return 0;
    }

    return data.reduce((total: number, curr: ICart) => {
      return (total += curr.quantity * curr.product.price);
    }, 0);
  }, [data]);

  if (!data?.length) {
    return (
      <div className="mt-12 text-center">
        <p>Không có sản phẩm nào trong giỏ hàng!</p>
      </div>
    );
  }

  return (
    <div className="max-w-[1200px] mx-auto px-3 mb-6 mt-12">
      <ul className="flex justify-center items-center">
        <li className="text-2xl px-2">
          <span className="text-black cursor-pointer uppercase transition ease-linear duration-200 hover:text-black">
            SHOPPING CART
          </span>
        </li>
        <li className="text-md text-gray-400 px-2 hidden md:block">
          <i className="fa-solid fa-chevron-right"></i>
        </li>
        <li className="text-2xl px-2">
          <span className="text-gray-400 cursor-pointer uppercase transition ease-linear duration-200 hover:text-black">
            Checkout details
          </span>
        </li>
        <li className="text-md text-gray-400 px-2 hidden md:block">
          <i className="fa-solid fa-chevron-right"></i>
        </li>
        <li className="text-2xl px-2">
          <span className="text-gray-400 cursor-pointer uppercase transition ease-linear duration-200 hover:text-black">
            Order Complete
          </span>
        </li>
      </ul>

      <section className="container max-w-6xl mx-auto px-3 mt-10 grid grid-cols-12 mb-9">
        <form
          action=""
          method="POST"
          className="col-span-12 lg:col-span-8 lg:pr-6"
        >
          <table className="table-auto w-full text-left border-collapse">
            <thead>
              <tr className="uppercase border-b-2">
                <th></th>
                <th className="pb-1 uppercase text-sm text-gray-500">
                  Sản phẩm
                </th>
                <th className="pb-1 uppercase text-sm text-gray-500">Giá</th>
                <th className="pb-1 uppercase text-sm text-gray-500">
                  Số lượng
                </th>
                <th className="pb-1 uppercase text-sm text-gray-500 text-right">
                  Tạm tính
                </th>
              </tr>
            </thead>
            <tbody>
              {data?.map((it: ICart) => (
                <tr className="border-b" key={it.id}>
                  <td>
                    <button
                      type="button"
                      className="p-2 text-gray-400 text-xl transition ease-linear duration-200 hover:text-black"
                      onClick={() => {
                        const isConfirm = confirm("Xác nhận xoá sản phẩm?");

                        isConfirm && deleteProductMutation.mutate(it.id);
                      }}
                    >
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </td>
                  <td className="p-2">
                    <div className="flex items-center gap-x-1">
                      <img
                        src={it.product.image}
                        alt=""
                        className="size-14 rounded object-cover"
                      />

                      <Link
                        className="font-semibold"
                        to={`/products/${it.productId}`}
                      >
                        {it.product.name}
                      </Link>
                    </div>
                  </td>
                  <td className="font-bold">{formatPrice(it.product.price)}</td>
                  <td className="p-2">
                    <div className="flex items-center h-9">
                      <button
                        type="button"
                        className="px-2 bg-gray-100 border-gray-200 h-full border-l border-y transition ease-linear duration-300 hover:shadow-[inset_0_0_100px_rgba(0,0,0,0.2)]"

                      >
                        -
                      </button>
                      <input
                        type="text"
                        className="border border-gray-200 h-full w-10 text-center outline-none shadow-[inset_0_1px_2px_rgba(0,0,0,0.1)] hover:shadow-none focus:shadow-[0_0_5px_#ccc]"
                        readOnly
                        value={it.quantity}
                      />
                      <button
                        type="button"
                        className="px-2 bg-gray-100 border-gray-200 h-full border-r border-y transition ease-linear duration-300 hover:shadow-[inset_0_0_100px_rgba(0,0,0,0.2)]"

                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td className="font-bold text-right">
                    {formatPrice(it.quantity * it.product.price)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <ul className="flex mt-6 items-center">
            <li>
              <Link
                to="/"
                type="button"
                className="block flex items-center select-none uppercase h-8 text-[#4e7c32] font-semibold text-sm border-[#4d8a54] border-2 px-3 transition ease-linear duration-300 hover:bg-[#4d8a54] hover:text-white"
              >
                <i className="fa-solid fa-arrow-left"></i>

                <span> Tiếp tục xem sản phẩm</span>
              </Link>
            </li>
          </ul>
        </form>
        <div className="mt-8 lg:mt-0 col-span-12 lg:col-span-4 lg:border-l lg:pl-6">
          <table className="table-fixed w-full text-left">
            <thead>
              <tr className="uppercase border-b-2">
                <th className="pb-1 text-sm text-gray-500" colSpan={2}>
                  Cộng giỏ hàng
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td>Tạm tính</td>
                <td className="py-2 text-right font-semibold">
                  {formatPrice(totalPrice)}
                </td>
              </tr>
              <tr className="border-b">
                <td>Tổng</td>
                <td className="py-2 text-right font-semibold">
                  {formatPrice(totalPrice)}
                </td>
              </tr>
            </tbody>
          </table>
          <Link
            to=""
            className="mt-4 block text-center w-full px-3 py-2 bg-[#4e7c32] font-semibold uppercase text-white text-sm transition ease-linear duration-300 hover:shadow-[inset_0_0_100px_rgba(0,0,0,0.2)]"
          >
            Tiến hành thanh toán
          </Link>
        </div>
      </section>
    </div>
  );
};

export default CartPage;
