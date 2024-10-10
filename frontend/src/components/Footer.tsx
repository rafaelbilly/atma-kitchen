export const Footer = () => {
  return (
    <footer className="footer p-10 bg-footer text-white font-sans px-4 xl:px-32 py-16 -min-h-screen">
      <nav className="flex flex-col h-full justify-between mx-auto ">
        <div className="text-center mx-auto">
          <h5 className="text-2xl font-serif font-bold">ATMA KITCHEN</h5>
          <p className="font-extralight mt-1">The best baker in Yogyakarata</p>
        </div>
        <p className="font-extralight mt-3">
          Copyright &copy; 2024 All right reserved by: ATMA KITCHEN
        </p>
      </nav>
      <nav className="flex flex-col gap-2">
        <h6 className="footer-title font-serif text-xl my-0">Product</h6>
        <a className="link link-hover font-light">Cake</a>
        <a className="link link-hover font-light">Bread</a>
        <a className="link link-hover font-light">Drink</a>
        <a className="link link-hover font-light">Snack</a>
      </nav>
      <nav className="flex flex-col gap-2">
        <h6 className="footer-title font-serif text-xl">Useful Links</h6>
        <a className="link link-hover font-light">About us</a>
        <a className="link link-hover font-light">How to order</a>
        <a className="link link-hover font-light">Profile</a>
      </nav>
      <nav className="flex flex-col gap-2">
        <h6 className="footer-title font-serif text-xl">Contact</h6>
        <a className="link link-hover font-light">Babarsari, Yogyakarta</a>
        <a className="link link-hover font-light">+621234123412</a>
        <a className="link link-hover font-light">atmakitchen@gmail.com</a>
      </nav>
    </footer>
  );
};
