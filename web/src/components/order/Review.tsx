import type { Order } from "../../api/types";

function Review({ onClick, data }: { onClick: () => void; data: Order }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-card-dark w-full max-w-md rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] relative animate-in fade-in zoom-in-95 duration-200">
        <div className="p-5 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between sticky top-0 bg-white dark:bg-card-dark z-10">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 shadow-sm">
              <img
                alt="Event Thumbnail"
                className="w-full h-full object-cover"
                src={data.ticket.eventName.heroImage}
              />
            </div>
            <div>
              <h3 className="font-bold text-text-light dark:text-white text-sm leading-tight">
                {data.ticket.eventName.name}
              </h3>
              <p className="text-xs text-subtext-light dark:text-subtext-dark">
                Rate your experience
              </p>
            </div>
          </div>
          <button
            onClick={onClick}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        <div className="overflow-y-auto p-6 space-y-8">
          <div className="flex flex-col items-center justify-center space-y-3">
            <div className="flex items-center space-x-2">
              <button className="group focus:outline-none">
                <span className="material-symbols-outlined text-4xl text-yellow-400 fill-1 transition-transform group-hover:scale-110">
                  star
                </span>
              </button>
              <button className="group focus:outline-none">
                <span className="material-symbols-outlined text-4xl text-yellow-400 fill-1 transition-transform group-hover:scale-110">
                  star
                </span>
              </button>
              <button className="group focus:outline-none">
                <span className="material-symbols-outlined text-4xl text-yellow-400 fill-1 transition-transform group-hover:scale-110">
                  star
                </span>
              </button>
              <button className="group focus:outline-none">
                <span className="material-symbols-outlined text-4xl text-yellow-400 fill-1 transition-transform group-hover:scale-110">
                  star
                </span>
              </button>
              <button className="group focus:outline-none">
                <span className="material-symbols-outlined text-4xl text-gray-300 dark:text-gray-600 hover:text-yellow-400 transition-colors group-hover:scale-110">
                  star
                </span>
              </button>
            </div>
            <span className="text-primary font-semibold text-lg">Amazing</span>
          </div>
          <div className="space-y-2">
            <label
              className="block text-sm font-medium text-text-light dark:text-gray-300"
              htmlFor="review"
            >
              Write a review
            </label>
            <div className="relative">
              <textarea
                className="w-full bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl p-3 text-sm text-text-light dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-primary focus:border-transparent resize-none transition-all"
                id="review"
                placeholder="Share details about the venue, atmosphere, or performances..."
                rows={4}
              ></textarea>
              <div className="absolute bottom-3 right-3 text-xs text-gray-400">
                0/500
              </div>
            </div>
          </div>
          {/* <div className="space-y-3">
            <label className="block text-sm font-medium text-text-light dark:text-gray-300">
              Add photos
              <span className="text-xs font-normal text-gray-400 ml-1">
                (Optional, max 3)
              </span>
            </label>
            <div className="flex space-x-3">
              <button className="w-20 h-20 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl flex flex-col items-center justify-center text-gray-400 hover:text-primary hover:border-primary hover:bg-primary-soft/20 dark:hover:bg-gray-800 transition-all group">
                <span className="material-symbols-outlined mb-1 group-hover:scale-110 transition-transform">
                  add_a_photo
                </span>
              </button>
              <div className="w-20 h-20 bg-gray-50 dark:bg-gray-800/30 rounded-xl border border-gray-100 dark:border-gray-700/50"></div>
              <div className="w-20 h-20 bg-gray-50 dark:bg-gray-800/30 rounded-xl border border-gray-100 dark:border-gray-700/50"></div>
            </div>
          </div> */}
        </div>
        <div className="p-5 border-t border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-card-dark/50 backdrop-blur-sm sticky bottom-0">
          <div className="flex flex-col space-y-3">
            <div className="flex items-center justify-center space-x-2 text-yellow-600 dark:text-yellow-500 bg-yellow-50 dark:bg-yellow-900/20 py-1.5 px-3 rounded-full w-max mx-auto border border-yellow-200 dark:border-yellow-700/30">
              <span className="material-symbols-outlined text-lg">
                monetization_on
              </span>
              <span className="text-xs font-bold uppercase tracking-wide">
                +50 pts reward
              </span>
            </div>
            <button
              className="w-full py-3.5 rounded-xl bg-primary/40 text-white font-semibold cursor-not-allowed shadow-none transition-all flex items-center justify-center"
              disabled
            >
              Submit Review
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Review;
