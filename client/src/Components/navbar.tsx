// const links = [
//   { href: "/", label: "Home" },
//   { href: "/reader", label: "Reader" },
//   { href: "/book", label: "Book" },
//   { href: "/book_borrow", label: "Book Borrow" },
// ];

const Navbar = () => {
  return (
    <nav className="bg-black h-auto flex justify-between pt-1 pb-1 text-xl">
      <h1 className="text-white px-5">Quản lý thư viện sách</h1>
      <div className="flex pr-5">
        <a href="/" className="text-white px-2">
          Độc giả
        </a>
        <a href="author" className="text-white px-2">
          Tác giả
        </a>
        <a href="book" className="text-white px-2">
          Sách
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
