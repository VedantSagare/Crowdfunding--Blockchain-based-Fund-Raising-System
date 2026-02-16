import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useStateContext } from '../context/CrowdFundingContext';

const Navbar = () => {
    const navigate = useNavigate();
    const [isActive, setIsActive] = useState('dashboard');
    const [toggleDrawer, setToggleDrawer] = useState(false);
    const { connectWallet, address } = useStateContext();

    return (
        <div className="flex md:flex-row flex-col-reverse justify-between mb-[35px] gap-6">
            <div className="lg:flex-1 flex flex-row max-w-[458px] py-2 pl-4 pr-2 h-[52px] bg-[#1c1c24] rounded-[100px]">
                <input type="text" placeholder="Search for campaigns" className="flex w-full font-epilogue font-normal text-[14px] placeholder:text-[#4b5264] text-white bg-transparent outline-none" />
                <div className="w-[72px] h-full rounded-[20px] bg-[#4acd8d] flex justify-center items-center cursor-pointer">
                    <span className="text-white text-xs">Search</span>
                </div>
            </div>

            <div className="sm:flex hidden flex-row justify-end gap-4">
                <div
                    className={`font-epilogue font-semibold text-[16px] leading-[26px] text-white min-h-[52px] px-4 rounded-[10px] bg-[#8c6dfd] flex items-center cursor-pointer`}
                    onClick={() => {
                        if (address) navigate('create-campaign')
                        else connectWallet()
                    }}
                >
                    {address ? 'Create Campaign' : 'Connect Wallet'}
                </div>

                <Link to="/profile">
                    <div className="w-[52px] h-[52px] rounded-full bg-[#2c2f32] flex justify-center items-center cursor-pointer">
                        <img src="https://cdn-icons-png.flaticon.com/512/1077/1077114.png" alt="user" className="w-[60%] h-[60%] object-contain" />
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default Navbar
