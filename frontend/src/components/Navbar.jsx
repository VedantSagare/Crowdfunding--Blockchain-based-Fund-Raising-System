import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useStateContext } from '../context/CrowdFundingContext';

const Navbar = () => {
    const navigate = useNavigate();
    const [isActive, setIsActive] = useState('dashboard');
    const [toggleDrawer, setToggleDrawer] = useState(false);
    const [searchFocused, setSearchFocused] = useState(false);
    const { connectWallet, address } = useStateContext();

    return (
        <div className="flex md:flex-row flex-col-reverse justify-between mb-[35px] gap-6 animate-slideDown">
            {/* Search Bar */}
            <div className={`
                lg:flex-1 flex flex-row max-w-[458px] h-[52px] 
                glass-effect rounded-full overflow-hidden
                transition-all duration-300
                ${searchFocused ? 'shadow-[0_0_20px_rgba(102,126,234,0.3)]' : ''}
            `}>
                <input
                    type="text"
                    placeholder="Search for campaigns..."
                    className="flex-1 px-6 font-inter font-normal text-[14px] placeholder:text-[#4b5264] text-white bg-transparent outline-none"
                    onFocus={() => setSearchFocused(true)}
                    onBlur={() => setSearchFocused(false)}
                />
                <button className="w-[100px] h-full bg-gradient-to-r from-[#43e97b] to-[#38f9d7] flex justify-center items-center cursor-pointer hover:shadow-[0_0_15px_rgba(67,233,123,0.5)] transition-all duration-300">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </button>
            </div>

            {/* Action Buttons */}
            <div className="sm:flex hidden flex-row justify-end gap-4">
                <button
                    className={`
                        font-poppins font-semibold text-[16px] leading-[26px] text-white 
                        min-h-[52px] px-6 rounded-full
                        bg-gradient-to-r from-[#667eea] to-[#764ba2]
                        hover:from-[#764ba2] hover:to-[#667eea]
                        transform transition-all duration-300 ease-out
                        hover:scale-105 hover:shadow-[0_0_30px_rgba(102,126,234,0.5)]
                        active:scale-95
                        flex items-center gap-2
                    `}
                    onClick={() => {
                        if (address) navigate('create-campaign')
                        else connectWallet()
                    }}
                >
                    {address ? (
                        <>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            Create Campaign
                        </>
                    ) : (
                        <>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                            Connect Wallet
                        </>
                    )}
                </button>

                <Link to="/profile">
                    <div className="w-[44px] h-[44px] rounded-full glass-effect flex justify-center items-center cursor-pointer hover-lift group">
                        <div className="w-[30px] h-[30px] rounded-full bg-gradient-to-br from-[#667eea] to-[#764ba2] flex justify-center items-center p-[2px] group-hover:shadow-[0_0_20px_rgba(102,126,234,0.5)] transition-all duration-300">
                            <div className="w-full h-full rounded-full bg-[#13131a] flex items-center justify-center">
                                <img src="https://cdn-icons-png.flaticon.com/512/1077/1077114.png" alt="user" className="w-[52%] h-[52%] object-contain" />
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default Navbar
