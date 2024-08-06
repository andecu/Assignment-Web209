import { useContext } from "react";
import { CategoryCT } from "../../context/CategoryContext";
import { Link } from "react-router-dom";

const ListCategory = () => {
  const { categories, onDeleteCategory } = useContext(CategoryCT);

  return (
    <>
      <div className="flex items-center justify-between mb-12">
        <h1 className="font-medium text-lg">Danh sách danh mục SP</h1>

        <Link
          to="/admin/categories/add"
          className="bg-black px-3 py-2 rounded text-white"
        >
          Thêm danh mục
        </Link>
      </div>

      <table className="w-full">
        <thead>
          <tr>
            <th className="border p-3 border-black">ID</th>
            <th className="border p-3 border-black">Name</th>
            <th className="border p-3 border-black">Image</th>
            <th className="border p-3 border-black">Actions</th>
          </tr>
        </thead>

        <tbody>
          {categories?.map((it) => (
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
              <td className="px-2 py-3 border border-black">
                <div className="flex items-center gap-x-3 justify-center">
                  <Link to={`/admin/categories/${it.id}/edit`}>Edit</Link>

                  <p
                    className="cursor-pointer"
                    onClick={() => onDeleteCategory(it.id)}
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

export default ListCategory;
