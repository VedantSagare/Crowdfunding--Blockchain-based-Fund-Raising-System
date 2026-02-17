import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Icon = ({ styles, name, imgUrl, isActive, disabled, handleClick }) => (
    <div
        className={`
            w-[48px] h-[48px] rounded-[12px] 
            flex justify-center items-center
            transition-all duration-300 ease-out
            ${isActive && isActive === name
                ? 'bg-gradient-to-br from-[#667eea] to-[#764ba2] shadow-[0_0_20px_rgba(102,126,234,0.4)]'
                : 'glass-effect hover:bg-[#2a2a35]'
            }
            ${!disabled && 'cursor-pointer hover:scale-110 active:scale-95'}
            ${styles}
        `}
        onClick={handleClick}
    >
        <img
            src={imgUrl}
            alt="icon"
            className={`w-1/2 h-1/2 transition-all duration-300 ${isActive !== name && 'grayscale opacity-60 hover:opacity-100'}`}
        />
    </div>
)

const Sidebar = () => {
    const navigate = useNavigate();
    const [isActive, setIsActive] = useState('dashboard');

    const navlinks = [
        { name: 'dashboard', imgUrl: 'https://cdn-icons-png.flaticon.com/512/1828/1828791.png', link: '/' },
        { name: 'campaign', imgUrl: 'https://cdn-icons-png.flaticon.com/512/1009/1009905.png', link: '/create-campaign' },
        { name: 'profile', imgUrl: 'https://cdn-icons-png.flaticon.com/512/1077/1077114.png', link: '/profile' },
    ];

    return (
        <div className="flex justify-between items-center flex-col sticky top-5 h-[93vh] animate-slideDown">
            {/* Logo */}
            <Link to="/">
                <div className="w-[52px] h-[52px] rounded-[16px] bg-gradient-to-br from-[#667eea] to-[#764ba2] flex items-center justify-center hover:shadow-[0_0_30px_rgba(102,126,234,0.5)] transition-all duration-300 hover:scale-110 active:scale-95">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
            </Link>

            {/* Navigation */}
            <div className="flex-1 flex flex-col justify-between items-center glass-effect rounded-[24px] w-[76px] py-6 mt-12">
                <div className="flex flex-col justify-center items-center gap-4">
                    {navlinks.map((link) => (
                        <Icon
                            key={link.name}
                            {...link}
                            isActive={isActive}
                            handleClick={() => {
                                if (!link.disabled) {
                                    setIsActive(link.name);
                                    navigate(link.link);
                                }
                            }}
                        />
                    ))}
                </div>

                {/* Settings Icon at Bottom */}
                <div className="glass-effect w-[48px] h-[48px] rounded-[12px] flex justify-center items-center cursor-pointer hover:bg-[#2a2a35] transition-all duration-300 hover:scale-110 active:scale-95">
                    <svg className="w-5 h-5 text-white/60 hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                </div>
            </div>
        </div>
    )
}

export default Sidebar
