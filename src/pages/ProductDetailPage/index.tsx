import { Link, useParams } from "react-router-dom";
import ListReview from "./ListReview";
import { getProductById } from "../../services/product";
import { useEffect, useState } from "react";
import { IProduct } from "../../interfaces/product";
import { formatPrice } from "../../utils";
import { useMutation } from "@tanstack/react-query";
import { TOKEN_STORAGE_KEY, USER_INFO_STORAGE_KEY } from "../../constants";
import { toast } from "react-toastify";
import api from "../../api/api";
import { queryClient } from "../../main";

const ProductDetailPage = () => {
  const params = useParams();
  const productId = params.id;

  const [product, setProduct] = useState<IProduct | null>();
  const [quantity, setQuantity] = useState(1);

  const isLogged = localStorage.getItem(TOKEN_STORAGE_KEY);
  const userInfo = JSON.parse(
    localStorage.getItem(USER_INFO_STORAGE_KEY) as string
  );

  const mutation = useMutation({
    mutationFn: async () => {
      // check user có giỏ hàng chưa
      const checkCart = await api.get("/carts", {
        params: {
          userId: userInfo.id,
        },
      });

      let cartId;
      // nếu chưa có giỏ hàng => tạo giỏ hàng
      if (!checkCart.data.length) {
        const addCart = await api.post("/carts", {
          userId: userInfo.id,
        });

        cartId = addCart.data.id;
      } else {
        cartId = checkCart.data[0].id;
      }

      // kiểm tra giỏ hàng có sp chưa
      const checkProduct = await api.get("/cartItems", {
        params: {
          cartId,
          productId,
        },
      });

      // nếu đã tồn tại sp
      if (checkProduct.data.length) {
        const cartItemId = checkProduct.data[0].id;
        const currQnt = checkProduct.data[0].quantity;
        // cập nhật số lượng
        await api.put(`/cartItems/${cartItemId}`, {
          ...checkProduct.data[0],
          quantity: currQnt + quantity,
        });
      } else {
        // thêm sp vào giỏ
        await api.post("/cartItems", {
          cartId,
          productId,
          quantity,
        });
      }

      return Promise.resolve();
    },
    onSuccess: () => {
      toast.success("Đã thêm SP vào giỏ hàng");
      queryClient.invalidateQueries({ queryKey: ["CART"] });
      setQuantity(1);
    },
  });

  useEffect(() => {
    productId && fetchProduct(productId);
  }, [productId]);

  const onAddCart = () => {
    if (!isLogged) {
      return toast.error("Vui lòng đăng nhập tài khoản");
    }

    mutation.mutate();
  };

  const fetchProduct = async (id: string) => {
    try {
      const data = await getProductById(id, {
        _expand: "category",
      });
      setProduct(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-[1200px] mx-auto px-3 mt-24">
      <div className="grid grid-cols-2 gap-x-8">
        <div>
          <div className="flex mb-12">
            <img
              src={product?.image}
              alt="Image"
              className="size-[355px] m-auto"
            />
          </div>

          <div className="flex gap-x-6">
            <img
              src={product?.image}
              alt="Image"
              className="block size-24 object-contain border border-[#000000] p-2 rounded-lg"
            />
            <img
              src={product?.image}
              alt="Image"
              className="block size-24 object-contain border border-transparent p-2 rounded-lg"
            />
            <img
              src={product?.image}
              alt="Image"
              className="block size-24 object-contain border border-transparent p-2 rounded-lg"
            />
          </div>
        </div>

        <div>
          <Link to="" className="uppercase font-bold text-[#4E7C32] text-sm">
            {product?.category.name}
          </Link>

          <h1 className="mt-5 mb-6 text-[#1D2025] font-bold text-[44px]">
            {product?.name}
          </h1>

          <p className="font-medium text-[#68707D]">
            Dịch vụ của Google, được cung cấp miễn phí, dịch nhanh các từ, cụm
            từ và trang web giữa tiếng Anh và hơn 100 ngôn ngữ khác.
          </p>

          <div className="flex items-center gap-x-4 mt-8">
            <p className="font-bold text-3xl text-[#1D2025]">
              {formatPrice(product?.price)}
            </p>

            <button className="rounded px-3 py-1 bg-[#FFEDE0] font-bold text-[#505F4E]">
              50%
            </button>
          </div>

          <p className="mt-3 text-[#1D2025] font-bold line-through">$250.00</p>

          <div className="mt-4 flex gap-x-4">
            <div className="rounded-lg bg-[#F7F8FD] h-12 flex items-center">
              <button
                className="text-[#505F4E] px-4"
                onClick={() => {
                  const qnt = quantity - 1;
                  setQuantity(qnt > 0 ? qnt : 1);
                }}
              >
                <i className="fa-solid fa-minus"></i>
              </button>

              <input
                type="text"
                value={quantity}
                className="bg-transparent text-center w-14 outline-none"
                readOnly
              />

              <button
                className="text-[#505F4E] px-4"
                onClick={() => setQuantity(quantity + 1)}
              >
                <i className="fa-solid fa-plus"></i>
              </button>
            </div>

            <div
              onClick={onAddCart}
              className="flex items-center w-[273px] max-w-full rounded-lg bg-[#4E7C32] justify-center gap-x-3 text-white font-bold cursor-pointer"
            >
              <div>
                <i className="fa-solid fa-cart-shopping"></i>
              </div>

              <p>Thêm vào giỏ hàng</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-28">
        <div className="mb-6">
          <p className="text-3xl text-[#4E7C32]">Mô tả</p>

          <p className="text-lg text-[#665345] font-light leading-7 mt-2">
            Dịch vụ của Google, được cung cấp miễn phí, dịch nhanh các từ, cụm
            từ và trang web giữa tiếng Anh và hơn 100 ngôn ngữ khác.
          </p>
        </div>

        <div className="mb-6">
          <p className="text-3xl text-[#4E7C32]">Giới thiệu</p>

          <p className="text-lg text-[#665345] font-light leading-7 mt-2">
            Dịch vụ của Google, được cung cấp miễn phí, dịch nhanh các từ, cụm
            từ và trang web giữa tiếng Anh và hơn 100 ngôn ngữ khác.
          </p>
        </div>
      </div>

      <div className="mt-14 grid grid-cols-2 gap-x-4">
        <div>
          <div className="flex gap-x-4 items-center">
            <img
              src="/images/product-image-1.jpeg"
              alt="Image"
              className="block size-[183px]"
            />

            <div>
              <div className="flex items-center">
                <div className="text-3xl text-gray-700">
                  <i className="fa-solid fa-star"></i>
                </div>
                <div className="text-3xl text-gray-700">
                  <i className="fa-solid fa-star"></i>
                </div>
                <div className="text-3xl text-gray-700">
                  <i className="fa-solid fa-star"></i>
                </div>
                <div className="text-3xl text-gray-700">
                  <i className="fa-solid fa-star"></i>
                </div>
                <div className="text-3xl text-gray-700">
                  <i className="fa-solid fa-star"></i>
                </div>
              </div>

              <p className="mt-2 text-center">
                <span className="text-3xl text-[#4E7C32]">5.0</span>
                <span className="text-lg text-[#00000099]"> (388)</span>
              </p>
            </div>
          </div>

          <div className="mt-11 mb-14">
            <div className="flex items-center gap-x-3 mb-3">
              <div className="flex items-center gap-x-1">
                <p className="text-xs min-w-2">1</p>

                <div className="text-xs">
                  <i className="fa-solid fa-star"></i>
                </div>
              </div>

              <div className="rounded-[2px] bg-[#A2A0A0] h-[10px] flex-1"></div>

              <p className="text-[#00000099]">(388)</p>
            </div>

            <div className="flex items-center gap-x-3 mb-3">
              <div className="flex items-center gap-x-1">
                <p className="text-xs min-w-2">2</p>

                <div className="text-xs">
                  <i className="fa-solid fa-star"></i>
                </div>
              </div>

              <div className="w-16 rounded-[2px] bg-[#D9D9D9] h-[10px]"></div>
            </div>

            <div className="flex items-center gap-x-3 mb-3">
              <div className="flex items-center gap-x-1">
                <p className="text-xs min-w-2">3</p>

                <div className="text-xs">
                  <i className="fa-solid fa-star"></i>
                </div>
              </div>

              <div className="w-16 rounded-[2px] bg-[#D9D9D9] h-[10px]"></div>
            </div>

            <div className="flex items-center gap-x-3 mb-3">
              <div className="flex items-center gap-x-1">
                <p className="text-xs min-w-2">4</p>

                <div className="text-xs">
                  <i className="fa-solid fa-star"></i>
                </div>
              </div>

              <div className="w-16 rounded-[2px] bg-[#D9D9D9] h-[10px]"></div>
            </div>

            <div className="flex items-center gap-x-3 mb-3">
              <div className="flex items-center gap-x-1">
                <p className="text-xs min-w-2">5</p>

                <div className="text-xs">
                  <i className="fa-solid fa-star"></i>
                </div>
              </div>

              <div className="w-16 rounded-[2px] bg-[#D9D9D9] h-[10px]"></div>
            </div>
          </div>
        </div>

        <div>
          <button className="h-9 px-4 flex items-center text-white rounded-xl bg-[#4E7C32] cursor-pointer ml-auto">
            Viết đánh giá
          </button>
        </div>
      </div>

      <ListReview />
    </div>
  );
};

export default ProductDetailPage;
