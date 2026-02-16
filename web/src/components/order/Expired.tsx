function Expired() {
  return (
    <div className="group bg-surface-light dark:bg-surface-dark rounded-xl border border-border-light dark:border-border-dark p-4 flex gap-4 transition-all cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800">
      <div className="w-20 h-20 rounded-lg overflow-hidden shrink-0 bg-gray-200 dark:bg-gray-700 relative grayscale opacity-70">
        <img
          alt="Art Exhibition"
          className="w-full h-full object-cover opacity-60"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAIhxwcU_j8RcFtEC-10oHJf4CyCrYYTNZxrFhCA-evKOH1fPp_5h97XvHO0oxjOZuhB2XBUrZJXEOFsAvmoCH1v-JY8-DmCgBXziDIJYfsOYUqJeE3p3StPZ6i-2UMC18lj3xSL_090WwnnArkiORrD40b7eXHB4KsdBPMcTo2wcOUs2411GUlnOU5lw6V-jcrcfxJen9Zgp8DxJhXjGpX1xR24-Hud7tx2VRWb5NX33BNrTYLY7zhN9LuuhkBg5f_ypmkL0EiYUo"
        />
      </div>
      <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
        <div className="flex justify-between items-start">
          <div>
            <h4 className="font-bold text-gray-500 dark:text-gray-400 truncate pr-4 text-lg">
              Modern Art Exhibition
            </h4>
            <div className="flex items-center gap-2 text-xs text-text-secondary-light dark:text-text-secondary-dark mt-1">
              <span className="material-icons text-[14px]">event</span>
              Nov 10, 2023
              <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600"></span>
              <span className="material-icons text-[14px]">location_on</span>
              Gallery One
            </div>
          </div>
          <div className="flex flex-col items-end gap-1">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-600">
              EXPIRED
            </span>
            <span className="text-xs font-bold text-gray-500 dark:text-gray-500 mt-1">
              $20.00
            </span>
          </div>
        </div>
        <div className="flex justify-between items-end mt-2">
          <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark truncate">
            Early Bird • 1 Ticket
          </p>
        </div>
      </div>
    </div>
  );
}

export default Expired;
