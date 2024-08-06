import { useContext } from "react";
import { Link } from "react-router-dom";
import { ProductCT } from "../../context/ProductContext";
import { formatPrice } from "../../utils";

const ListProduct = () => {
  const { products, onDeleteProduct } = useContext(ProductCT);

  return (
    <>
      <div className="flex items-center justify-between mb-12">
        <h1 className="font-medium text-lg">Danh sách SP</h1>

        <Link
          to="/admin/products/add"
          className="bg-black px-3 py-2 rounded text-white"
        >
          Thêm SP
        </Link>
      </div>

      <table className="w-full">
        <thead>
          <tr>
            <th className="border p-3 border-black">ID</th>
            <th className="border p-3 border-black">Name</th>
            <th className="border p-3 border-black">Image</th>
            <th className="border p-3 border-black">Price</th>
            <th className="border p-3 border-black">Category</th>
            <th className="border p-3 border-black">Actions</th>
          </tr>
        </thead>

        <tbody>
          {products?.map((it) => (
            <tr key={it.id}>
              <td className="px-2 py-3 border border-black text-center">
                {it.id}
              </td>
              <td className="px-2 py-3 border border-black text-center">
                {it.name}
              </td>
              <td className="px-2 py-3 border border-black">
                <img
                  src={it.image}
                  alt="Image"
                  className="size-24 object-cover rounded block mx-auto"
                />
              </td>
              <td className="px-2 py-3 border border-black text-center">
                {formatPrice(+it.price)}
              </td>
              <td className="px-2 py-3 border border-black text-center">
                {it.category.name}
              </td>
              <td className="px-2 py-3 border border-black">
                <div className="flex items-center gap-x-3 justify-center">
                  <Link to={`/admin/products/${it.id}/edit`}>Edit</Link>

                  <p
                    className="cursor-pointer"
                    onClick={() => onDeleteProduct(it.id)}
                  >
                    Delete
                  </p>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default ListProduct;
