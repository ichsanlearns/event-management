import { Link } from "react-router";

function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 border-t border-[#e7e7f3] bg-white py-3 z-20">
      <div className=" max-w-screen mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-6 cursor-pointer">
        <Link to="/" className="flex items-center gap-2 text-[#0d0d1b]">
          <div className="size-6 text-primary">
            <span className="material-symbols-outlined filled">
              confirmation_number
            </span>
          </div>
          <span className="font-bold text-lg">Event__</span>
        </Link>
        <div className="text-[#6e6e91] text-sm">
          © 2024 EventConnect Inc. All rights reserved.
        </div>
        <div className="flex gap-6">
          <a
            className="text-[#6e6e91] hover:text-primary transition-colors"
            href="#"
          >
            <span className="material-symbols-outlined">dataset</span>
          </a>
          <a
            className="text-[#6e6e91] hover:text-primary transition-colors"
            href="#"
          >
            <span className="material-symbols-outlined">public</span>
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
