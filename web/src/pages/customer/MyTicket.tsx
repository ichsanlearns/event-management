function MyTicket() {
  return (
    <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-background-light dark:bg-background-dark">
      <div className="mb-8">
        <nav className="flex text-sm text-subtext-light dark:text-subtext-dark mb-2">
          <a className="hover:text-primary" href="#">
            Dashboard
          </a>
          <span className="mx-2">/</span>
          <span className="font-medium text-text-light dark:text-white">
            My Profile
          </span>
        </nav>
        <h2 className="text-3xl font-bold text-text-light dark:text-white">
          My Profile
        </h2>
        <p className="text-subtext-light dark:text-subtext-dark mt-1">
          Manage your Digital Ticket Wallet - Feedback &amp; Rewards
        </p>
      </div>
      <div className="bg-card-light dark:bg-card-dark rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <img
              alt="Profile Picture"
              className="w-16 h-16 rounded-full object-cover ring-2 ring-primary ring-offset-2 dark:ring-offset-gray-900"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAwmy6TYkp1NwYJlRXvOdoGXP-dV8i-qatbqIYB0RXRWNXwBxs9W5vBLgH7wMa0zpDeYzFthwwDZUPn3p-kGSPHEoKaqfh1EjbLe8aORmPWnctkqIWPEaK66A2DSEM1tc7EDqmDaHfyUa688fjnMs7W7v799abmtgkWrTDxahAn4HPkPw19s7FYw--IPIal59ZNtLvd9BOM_6ojVThNHeQVcjXMZyUqqEBFHLYIhmb_G-40rHXGwIdHut2mKBrQDxsIsz40_k3YBwQ"
            />
          </div>
          <div>
            <h3 className="text-xl font-bold text-text-light dark:text-white">
              test
            </h3>
            <div className="flex items-center mt-1">
              <span className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-xs px-2 py-1 rounded font-mono">
                Referral Code: NAQQTEH
              </span>
            </div>
          </div>
        </div>
        <button className="flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-sm font-medium dark:text-white">
          <span className="material-icons-outlined mr-2 text-lg">logout</span>
          Logout
        </button>
      </div>
      <div className="bg-card-light dark:bg-card-dark rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-1 mb-8 flex">
        <button className="flex-1 py-3 text-sm font-medium text-subtext-light dark:text-subtext-dark hover:text-primary dark:hover:text-primary transition-colors relative">
          Active
        </button>
        <button className="flex-1 py-3 text-sm font-bold bg-primary text-white rounded-lg shadow-md transition-colors relative">
          Need Review
          <span className="absolute top-2 right-4 w-2 h-2 bg-red-400 rounded-full animate-pulse"></span>
        </button>
        <button className="flex-1 py-3 text-sm font-medium text-subtext-light dark:text-subtext-dark hover:text-primary dark:hover:text-primary transition-colors">
          All Orders
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-card-dark rounded-2xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-800 flex flex-col transition-transform hover:translate-y-[-4px] duration-300">
          <div className="relative h-48">
            <div className="absolute inset-0 bg-black/40 z-10 flex flex-col items-center justify-center backdrop-blur-[1px]">
              <span className="bg-green-500/90 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide mb-2 flex items-center shadow-lg">
                <span className="material-icons-outlined text-sm mr-1">
                  check_circle
                </span>
                Event Completed
              </span>
            </div>
            <img
              alt="Concert Crowd"
              className="w-full h-full object-cover grayscale-[30%]"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDZnRROcvjiC1AISHnN6DLwOirgEU4JBmsOGkPsDmkughWIecf3v_XPJjPyJYjdUHBpPtpY2qp93fVckUJkGcbWTqO5O8WD2wpsyeDsELld9SqJFUPzSf1rMYR3kFohOa0efTU7Yx8mdPDok6qsus0Sb4CbLFOC0DbRHUiRjgtst9yLKadDp0ro-6qSxyYSHBLzB6qKQmXA6fuACrRs1yJFoc1bqkupWp02IPgMMqadk3H9JJG3l2df5W-MJDhnOjJqjmzNQ1bu-Qs"
            />
            <div className="absolute top-4 right-4 z-20 bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center animate-bounce">
              <span className="material-icons-outlined text-sm mr-1">
                stars
              </span>
              +50 pts
            </div>
          </div>
          <div className="p-6 flex flex-col flex-1">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white leading-tight">
                Neon Nights Festival 2024
              </h3>
            </div>
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
              <span className="material-icons-outlined text-sm mr-1">
                event
              </span>
              Dec 15-17, 2024
              <span className="mx-2">•</span>
              <span className="material-icons-outlined text-sm mr-1">
                place
              </span>
              Gelora Bung Karno
            </div>
            <div className="bg-primary-soft/50 dark:bg-gray-800 rounded-lg p-4 mb-6 flex flex-col items-center justify-center border border-dashed border-primary/30 dark:border-gray-600">
              <p className="text-sm text-gray-600 dark:text-gray-300 font-medium mb-2">
                How was your experience?
              </p>
              <div className="flex space-x-1">
                <span className="material-icons-outlined text-gray-300 dark:text-gray-600 hover:text-yellow-400 cursor-pointer text-2xl transition-colors">
                  star
                </span>
                <span className="material-icons-outlined text-gray-300 dark:text-gray-600 hover:text-yellow-400 cursor-pointer text-2xl transition-colors">
                  star
                </span>
                <span className="material-icons-outlined text-gray-300 dark:text-gray-600 hover:text-yellow-400 cursor-pointer text-2xl transition-colors">
                  star
                </span>
                <span className="material-icons-outlined text-gray-300 dark:text-gray-600 hover:text-yellow-400 cursor-pointer text-2xl transition-colors">
                  star
                </span>
                <span className="material-icons-outlined text-gray-300 dark:text-gray-600 hover:text-yellow-400 cursor-pointer text-2xl transition-colors">
                  star
                </span>
              </div>
            </div>
            <div className="mt-auto">
              <button className="w-full py-3 rounded-xl border-2 border-primary text-primary dark:text-primary-soft dark:border-primary font-semibold hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-all duration-200 flex items-center justify-center group">
                <span className="material-icons-outlined mr-2 group-hover:animate-pulse">
                  rate_review
                </span>
                Review &amp; Earn Points
              </button>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-card-dark rounded-2xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-800 flex flex-col transition-transform hover:translate-y-[-4px] duration-300">
          <div className="relative h-48">
            <div className="absolute inset-0 bg-black/40 z-10 flex flex-col items-center justify-center backdrop-blur-[1px]">
              <span className="bg-green-500/90 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide mb-2 flex items-center shadow-lg">
                <span className="material-icons-outlined text-sm mr-1">
                  check_circle
                </span>
                Event Completed
              </span>
            </div>
            <img
              alt="Tech Summit Stage"
              className="w-full h-full object-cover grayscale-[30%]"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuC_Mw2Ho4uzfd0K1YP654eM9tRwAYSlZO0410177XOfS2883YODuwTgDScVlGjVKCQUf_KweY10RfpfZrdtRcz0th83CMlEhX-LXDRiRE4GnTUDclBn_X2DdhnasrazZq6Aez9viXsNC1gEVnAXIYcuF7RliSQxgnI6tosFJXHw6UD4i8r7F8eL1o7kI0we7KdncakQjB9eCXumrZ1ph-hi7w2P6d7bR05BIk-ESUNz_oTlH3azM6xbTYQsXA_ddYKsRI2Ex9EVftk"
            />
            <div className="absolute top-4 right-4 z-20 bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center animate-bounce delay-100">
              <span className="material-icons-outlined text-sm mr-1">
                stars
              </span>
              +50 pts
            </div>
          </div>
          <div className="p-6 flex flex-col flex-1">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white leading-tight">
                TechSummit Indonesia 2024
              </h3>
            </div>
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
              <span className="material-icons-outlined text-sm mr-1">
                event
              </span>
              Jan 20, 2024
              <span className="mx-2">•</span>
              <span className="material-icons-outlined text-sm mr-1">
                place
              </span>
              ICE BSD, Tangerang
            </div>
            <div className="bg-primary-soft/50 dark:bg-gray-800 rounded-lg p-4 mb-6 flex flex-col items-center justify-center border border-dashed border-primary/30 dark:border-gray-600">
              <p className="text-sm text-gray-600 dark:text-gray-300 font-medium mb-2">
                How was your experience?
              </p>
              <div className="flex space-x-1">
                <span className="material-icons-outlined text-gray-300 dark:text-gray-600 hover:text-yellow-400 cursor-pointer text-2xl transition-colors">
                  star
                </span>
                <span className="material-icons-outlined text-gray-300 dark:text-gray-600 hover:text-yellow-400 cursor-pointer text-2xl transition-colors">
                  star
                </span>
                <span className="material-icons-outlined text-gray-300 dark:text-gray-600 hover:text-yellow-400 cursor-pointer text-2xl transition-colors">
                  star
                </span>
                <span className="material-icons-outlined text-gray-300 dark:text-gray-600 hover:text-yellow-400 cursor-pointer text-2xl transition-colors">
                  star
                </span>
                <span className="material-icons-outlined text-gray-300 dark:text-gray-600 hover:text-yellow-400 cursor-pointer text-2xl transition-colors">
                  star
                </span>
              </div>
            </div>
            <div className="mt-auto">
              <button className="w-full py-3 rounded-xl border-2 border-primary text-primary dark:text-primary-soft dark:border-primary font-semibold hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-all duration-200 flex items-center justify-center group">
                <span className="material-icons-outlined mr-2 group-hover:animate-pulse">
                  rate_review
                </span>
                Review &amp; Earn Points
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default MyTicket;
