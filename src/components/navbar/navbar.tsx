import { Menu } from "antd";
import { useNavigate } from "react-router-dom";

const listMenu = [
  { key: "/", label: "Home", path: "/" },
  { key: "/movies", label: "Movies", path: "/movies" },
];

const Navbar = () => {
  const navigate = useNavigate();

  const handleMenuClick = ({ key }: { key: string }) => {
    const target = listMenu.find((item) => item.key === key);
    if (target) {
      navigate(target.path);
    }
  };

  return (
    <>
      <Menu
        className="navbar_color"
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={[window.location.pathname]}
        onClick={handleMenuClick}
        items={listMenu}
      />
    </>
  );
};

export default Navbar;
