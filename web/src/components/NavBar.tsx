import { Link } from "react-router";

function Navbar() {
  return (
    <nav className="absolute top-0 z-50 w-full bg-transparent">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex items-center justify-between h-20 sm:h-24">
          <div className="flex items-center gap-3 cursor-pointer">
            <div className="size-8 text-white">
              <svg fill="currentColor" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path
                  clip-rule="evenodd"
                  d="M39.475 21.6262C40.358 21.4363 40.6863 21.5589 40.7581 21.5934C40.7876 21.655 40.8547 21.857 40.8082 22.3336C40.7408 23.0255 40.4502 24.0046 39.8572 25.2301C38.6799 27.6631 36.5085 30.6631 33.5858 33.5858C30.6631 36.5085 27.6632 38.6799 25.2301 39.8572C24.0046 40.4502 23.0255 40.7407 22.3336 40.8082C21.8571 40.8547 21.6551 40.7875 21.5934 40.7581C21.5589 40.6863 21.4363 40.358 21.6262 39.475C21.8562 38.4054 22.4689 36.9657 23.5038 35.2817C24.7575 33.2417 26.5497 30.9744 28.7621 28.762C30.9744 26.5497 33.2417 24.7574 35.2817 23.5037C36.9657 22.4689 38.4054 21.8562 39.475 21.6262ZM4.41189 29.2403L18.7597 43.5881C19.8813 44.7097 21.4027 44.9179 22.7217 44.7893C24.0585 44.659 25.5148 44.1631 26.9723 43.4579C29.9052 42.0387 33.2618 39.5667 36.4142 36.4142C39.5667 33.2618 42.0387 29.9052 43.4579 26.9723C44.1631 25.5148 44.659 24.0585 44.7893 22.7217C44.9179 21.4027 44.7097 19.8813 43.5881 18.7597L29.2403 4.41187C27.8527 3.02428 25.8765 3.02573 24.2861 3.36776C22.6081 3.72863 20.7334 4.58419 18.8396 5.74801C16.4978 7.18716 13.9881 9.18353 11.5858 11.5858C9.18354 13.988 7.18717 16.4978 5.74802 18.8396C4.58421 20.7334 3.72865 22.6081 3.36778 24.2861C3.02574 25.8765 3.02429 27.8527 4.41189 29.2403Z"
                  fill-rule="evenodd"
                ></path>
              </svg>
            </div>
            <span className="text-white text-xl font-bold tracking-tight drop-shadow-md">Event___</span>
          </div>
          <div className="hidden md:flex flex-1 justify-end items-center gap-8">
            <nav className="flex gap-8">
              <a className="text-white/90 hover:text-white text-sm font-semibold transition-colors drop-shadow-sm" href="#">
                Explore
              </a>
              <Link to={"/organizer"} className="text-white/90 hover:text-white text-sm font-semibold transition-colors drop-shadow-sm">
                Host an Event
              </Link>
            </nav>
            <div className="flex items-center gap-3">
              <button className="flex items-center justify-center rounded-lg h-10 px-4 text-white hover:bg-white/10 text-sm font-bold transition-colors cursor-pointer">Login</button>
              <button className="flex items-center justify-center rounded-lg h-10 px-5 bg-white text-gray-900 hover:bg-gray-100 text-sm font-bold transition-colors shadow-lg shadow-black/10 cursor-pointer">Sign Up</button>
            </div>
          </div>
          <div className="md:hidden flex items-center">
            <button className="text-white hover:text-white/80">
              <span className="material-symbols-outlined">menu</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
