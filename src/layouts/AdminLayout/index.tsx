import { Link, Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      <aside className="w-80 bg-black text-white p-3">
        <header className="py-4 mb-4 text-center">
          <Link to="/" className="text-xl font-medium">
            CLIENT PAGE
          </Link>
        </header>

        <ul className="px-3">
          <li className="py-3">
            <Link to="/admin">Dashboard</Link>
          </li>
          <li className="py-3">
            <Link to="/admin/categories">Danh mục</Link>
          </li>
          <li className="py-3">
            <Link to="/admin/products">Sản phẩm</Link>
          </li>
        </ul>
      </aside>

      <div className="flex-1 flex flex-col">
        <div className="flex justify-end py-3 shadow px-4 items-center gap-x-2">
          <img
            src="https://picsum.photos/100/100"
            alt="Avatar"
            className="w-10 h-10 object-cover rounded-full"
          />

          <p>Admin</p>
        </div>

        <div className="flex-1 p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
