import React, { useState } from 'react';
// import { FaPlus, FaCalendarPlus, FaThList, FaStar, FaCog, FaSignOutAlt } from 'react-icons/fa';
import { AiFillAppstore } from 'react-icons/ai';
import { GrOverview } from "react-icons/gr";
import { FaCamera, FaCalendarAlt, FaImages, FaHeart, FaCog, FaSignOutAlt } from 'react-icons/fa';
import { IoGridSharp } from "react-icons/io5";
import { RiGalleryFill } from "react-icons/ri";

const Sidebar = ({ onSelect, isOpen, isMobile, theme }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const sidebarClass = `
        sidebar transition-all duration-300
        ${isExpanded && !isMobile ? 'w-64' : 'w-16'} 
        ${isMobile ? 
            'fixed top-0 left-0 h-full z-50 w-64 transform ' + 
            (isOpen ? 'translate-x-0' : '-translate-x-full') 
            : 'relative h-screen'
        }
        ${theme.gradient} ${theme.textColor}
    `;

    const handleMouseEnter = () => {
        if (!isMobile) setIsExpanded(true);
    };

    const handleMouseLeave = () => {
        if (!isMobile) setIsExpanded(false);
    };

    const handleSelect = (view) => {
        onSelect(view);
        if (isMobile) {
            onSelect(view);
        }
    };

    return (
        <>
            {/* Overlay for mobile */}
            {isMobile && isOpen && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-50 z-40"
                    onClick={() => onSelect(null)}
                />
            )}
            
            <div 
                className={sidebarClass}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <div className="flex flex-col h-full ">
                    <h2 className={`text-2xl font-bold p-4 flex items-center gap-2 ${!isExpanded && !isMobile ? 'text-center text-sm ' : ''}`}>
                        {isExpanded || isMobile ? (
                            <>
                                <FaCamera className="text-gray-500" />
                                <span>Snap Diary</span>
                            </>
                        ) : (
                            <FaCamera className="text-gray-500 mx-auto" />
                        )}
                    </h2>
                    
                    <nav className="flex-1 flex flex-col gap-2 p-3 overflow-y-auto">
                        <SidebarButton 
                            icon={<IoGridSharp className="text-gray-500" />} 
                            text="Overview" 
                            onClick={() => handleSelect("overview")} 
                            expanded={isExpanded || isMobile} 
                        />
                        <SidebarButton 
                            icon={<FaCamera className="text-gray-500" />} 
                            text="New Memory" 
                            onClick={() => handleSelect("addEntry")} 
                            expanded={isExpanded || isMobile} 
                        />
                        <SidebarButton 
                            icon={<FaCalendarAlt className="text-gray-500" />} 
                            text="New Collection" 
                            onClick={() => handleSelect("createEvent")} 
                            expanded={isExpanded || isMobile} 
                        />
                        <SidebarButton 
                            icon={<RiGalleryFill className="text-gray-500" />} 
                            text="My Memories" 
                            onClick={() => handleSelect("viewEntries")} 
                            expanded={isExpanded || isMobile} 
                        />
                        <SidebarButton 
                            icon={<FaImages className="text-gray-500" />} 
                            text="Collections" 
                            onClick={() => handleSelect("viewEvents")} 
                            expanded={isExpanded || isMobile} 
                        />
                        <SidebarButton 
                            icon={<FaHeart className="text-gray-500" />} 
                            text="Favorites" 
                            onClick={() => handleSelect("viewFavorites")} 
                            expanded={isExpanded || isMobile} 
                        />
                    </nav>
                    
                    <div className="p-3 border-t border-gray-800/10">
                        <SidebarButton 
                            icon={<FaCog className="text-gray-700" />} 
                            text="Settings" 
                            onClick={() => handleSelect("settings")} 
                            expanded={isExpanded || isMobile} 
                        />
                        <SidebarButton 
                            icon={<FaSignOutAlt className="text-gray-700" />} 
                            text="Logout" 
                            onClick={() => handleSelect("logout")} 
                            expanded={isExpanded || isMobile} 
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

const SidebarButton = ({ icon, text, onClick, expanded }) => {
    return (
        <button 
            onClick={onClick} 
            className="w-full p-3 rounded-lg hover:bg-black/10 transition-colors flex items-center gap-4 text-left text-gray-700"
            title={text}
        >
            <span className="text-xl min-w-[24px]">{icon}</span>
            {expanded && <span className="truncate">{text}</span>}
        </button>
    );
};

export default Sidebar;
