export function StatusBar() {
  return (
    <div className="h-10 flex items-center justify-between px-4 text-xs text-gray-500">
      <div>9:41</div>
      <div className="flex items-center space-x-1">
        <div className="w-4 h-4">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M18 9.5C18 5.91 15.09 3 11.5 3C7.91 3 5 5.91 5 9.5C5 13.09 7.91 16 11.5 16C15.09 16 18 13.09 18 9.5Z"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path d="M5.59998 16.5L3.5 18.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
        <div className="w-4 h-4">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2Z"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
        <div className="w-6 h-3 border border-gray-500 rounded-sm relative">
          <div className="absolute inset-0.5 bg-gray-500 right-[30%] rounded-sm"></div>
        </div>
      </div>
    </div>
  )
}

