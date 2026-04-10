"use client";

import { ArrowRight } from "lucide-react";

export default function Button({ 
  children, 
  onClick,
  className = "",
  showArrow = true,
}: { 
  children: React.ReactNode, 
  onClick?: () => void;
  className?: string;
  showArrow?: boolean;
}) {
  return (
    <button 
      onClick={onClick}
      className={`group relative px-4 py-2.5 bg-[#FE4A55] text-white 
                  rounded-xl font-medium text-sm transition-all duration-300 
                  overflow-hidden flex items-center 
                  active:scale-95 cursor-pointer w-full md:w-auto ${className}`}
    >
      {/* Left to Right Hover Background */}
      <div className="absolute inset-0 bg-[#221638] translate-x-[-100%] 
                      group-hover:translate-x-0 transition-transform duration-500 ease-out
                      dark:bg-white" />

      {/* Content Container */}
      <div className="relative flex items-center justify-between w-full z-10">
        <span className="group-hover:dark:text-[#FE4A55]">{children}</span>
        
        {showArrow && (
          <div className="w-6 h-6 flex items-center justify-center rounded-full 
                          border border-white/70 group-hover:border-white 
                          transition-all duration-300 group-hover:bg-white/10
                          dark:group-hover:border-[#FE4A55] ml-4   ">
            <ArrowRight 
              size={16} 
              className="transition-transform duration-300 group-hover:translate-x-0 
                         group-hover:dark:text-[#FE4A55]  " 
            />
          </div>
        )}
      </div>
    </button>
  );
}