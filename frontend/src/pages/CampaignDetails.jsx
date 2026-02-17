import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';

import { useStateContext } from '../context/CrowdFundingContext';
import { CustomButton, Loader } from '../components';

const CampaignDetails = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const { donate, getDonations, contract, address } = useStateContext();

    const [isLoading, setIsLoading] = useState(false);
    const [amount, setAmount] = useState('');
    const [donators, setDonators] = useState([]);

    const remainingDays = (state.deadline - Date.now()) / (1000 * 60 * 60 * 24);

    // We need to implement getDonators in context or here
    // In context we didn't implement getDonators yet!
    // I will add it to the component directly or context if needed.
    // But contract is available in context.

    // Fetch donators
    const fetchDonators = async () => {
        // We can call contract directly if context exposes it, or use context method
        // In context we have 'contract' object.
        const donatorsData = await contract.getDonators(state.pId);

        // donatorsData is [addresses[], amounts[]]
        const numberOfDonations = donatorsData[0].length;
        const parsedDonations = [];

        for (let i = 0; i < numberOfDonations; i++) {
            parsedDonations.push({
                donator: donatorsData[0][i],
                donation: ethers.formatEther(donatorsData[1][i].toString())
            })
        }

        setDonators(parsedDonations);
    }

    useEffect(() => {
        if (contract) fetchDonators();
    }, [contract, address])

    const handleDonate = async () => {
        setIsLoading(true);
        await donate(state.pId, amount);
        navigate('/')
        setIsLoading(false);
    }

    return (
        <div className="animate-fadeIn">
            {isLoading && <Loader />}

            <div className="w-full flex md:flex-row flex-col mt-10 gap-[30px]">
                {/* Campaign Image and Progress */}
                <div className="flex-1 flex-col">
                    <div className="relative overflow-hidden rounded-[24px] group">
                        <img
                            src={state.image}
                            alt="campaign"
                            className="w-full h-[410px] object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    </div>

                    {/* Progress Bar */}
                    <div className="relative w-full h-[8px] bg-[#1a1a24] rounded-full mt-4 overflow-hidden">
                        <div
                            className="absolute h-full bg-gradient-to-r from-[#43e97b] to-[#38f9d7] rounded-full transition-all duration-500 shadow-[0_0_15px_rgba(67,233,123,0.6)]"
                            style={{ width: `${Math.min(100, (state.amountCollected / state.target) * 100)}%`, maxWidth: '100%' }}
                        >
                        </div>
                    </div>
                    <p className="mt-2 font-inter text-[13px] text-[#b2b3bd]">
                        {Math.min(100, (state.amountCollected / state.target) * 100).toFixed(1)}% funded
                    </p>
                </div>

                {/* Stats Cards */}
                <div className="flex md:w-[150px] w-full flex-wrap justify-between gap-[20px]">
                    <div className="flex flex-col items-center w-[150px] glass-effect rounded-[16px] overflow-hidden hover-lift">
                        <div className="w-full p-4 bg-gradient-to-br from-[#667eea]/20 to-[#764ba2]/20">
                            <h4 className="font-poppins font-bold text-[32px] text-white text-center gradient-text">
                                {Math.max(0, Math.floor(remainingDays))}
                            </h4>
                        </div>
                        <p className="font-inter font-medium text-[14px] text-[#b2b3bd] px-3 py-3 w-full text-center">
                            Days Left
                        </p>
                    </div>
                    <div className="flex flex-col items-center w-[150px] glass-effect rounded-[16px] overflow-hidden hover-lift">
                        <div className="w-full p-4 bg-gradient-to-br from-[#43e97b]/20 to-[#38f9d7]/20">
                            <h4 className="font-poppins font-bold text-[32px] text-white text-center truncate">
                                {state.amountCollected}
                            </h4>
                        </div>
                        <p className="font-inter font-medium text-[14px] text-[#b2b3bd] px-3 py-3 w-full text-center">
                            of {state.target} ETH
                        </p>
                    </div>
                    <div className="flex flex-col items-center w-[150px] glass-effect rounded-[16px] overflow-hidden hover-lift">
                        <div className="w-full p-4 bg-gradient-to-br from-[#4facfe]/20 to-[#00f2fe]/20">
                            <h4 className="font-poppins font-bold text-[32px] text-white text-center">
                                {donators.length}
                            </h4>
                        </div>
                        <p className="font-inter font-medium text-[14px] text-[#b2b3bd] px-3 py-3 w-full text-center">
                            Total Backers
                        </p>
                    </div>
                </div>
            </div>

            <div className="mt-[60px] flex lg:flex-row flex-col gap-8">
                {/* Left Column - Campaign Info */}
                <div className="flex-[2] flex flex-col gap-8">
                    {/* Creator */}
                    <div className="glass-effect rounded-[20px] p-6">
                        <h4 className="font-poppins font-semibold text-[20px] gradient-text mb-5">Creator</h4>
                        <div className="flex flex-row items-center gap-4">
                            <div className="w-[52px] h-[52px] rounded-full bg-gradient-to-br from-[#667eea] to-[#764ba2] flex items-center justify-center p-[2px]">
                                <div className="w-full h-full rounded-full bg-[#13131a] flex items-center justify-center">
                                    <img src="https://cdn-icons-png.flaticon.com/512/1077/1077114.png" alt="user" className="w-[60%] h-[60%] object-contain" />
                                </div>
                            </div>
                            <div className="flex-1">
                                <p className="font-inter text-[12px] text-[#808191] mb-1">Campaign Owner</p>
                                <h4 className="font-inter font-semibold text-[14px] text-white break-all">{state.owner}</h4>
                            </div>
                        </div>
                    </div>

                    {/* Story */}
                    <div className="glass-effect rounded-[20px] p-6">
                        <h4 className="font-poppins font-semibold text-[20px] gradient-text mb-5">Campaign Story</h4>
                        <p className="font-inter font-normal text-[15px] text-[#b2b3bd] leading-[28px]">
                            {state.description}
                        </p>
                    </div>

                    {/* Donators */}
                    <div className="glass-effect rounded-[20px] p-6">
                        <h4 className="font-poppins font-semibold text-[20px] gradient-text mb-5">
                            Backers ({donators.length})
                        </h4>
                        <div className="flex flex-col gap-3 max-h-[400px] overflow-y-auto pr-2">
                            {donators.length > 0 ? donators.map((item, index) => (
                                <div
                                    key={`${item.donator}-${index}`}
                                    className="flex justify-between items-center gap-4 p-4 glass-effect rounded-[12px] hover:bg-[#2a2a35] transition-all"
                                >
                                    <div className="flex items-center gap-3 flex-1">
                                        <span className="w-8 h-8 rounded-full bg-gradient-to-br from-[#667eea] to-[#764ba2] flex items-center justify-center font-poppins font-bold text-[12px]">
                                            {index + 1}
                                        </span>
                                        <p className="font-inter font-normal text-[14px] text-[#b2b3bd] truncate flex-1">
                                            {item.donator}
                                        </p>
                                    </div>
                                    <p className="font-poppins font-semibold text-[14px] text-white">
                                        {item.donation} ETH
                                    </p>
                                </div>
                            )) : (
                                <div className="text-center py-8">
                                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#667eea]/20 to-[#764ba2]/20 flex items-center justify-center mx-auto mb-4">
                                        <svg className="w-8 h-8 text-[#667eea]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                        </svg>
                                    </div>
                                    <p className="font-inter font-normal text-[14px] text-[#808191]">
                                        No backers yet. Be the first one!
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Right Column - Fund Card */}
                <div className="flex-1">
                    <div className="glass-effect-strong rounded-[20px] p-6 sticky top-5">
                        <h4 className="font-poppins font-semibold text-[22px] gradient-text mb-6">Fund This Campaign</h4>

                        <div className="space-y-5">
                            <div>
                                <label className="font-inter text-[13px] text-[#b2b3bd] mb-2 block">
                                    Amount (ETH)
                                </label>
                                <input
                                    type="number"
                                    placeholder="0.1"
                                    step="0.01"
                                    className="w-full py-4 px-5 glass-effect rounded-[12px] font-inter text-white text-[16px] placeholder:text-[#4b5264] focus:shadow-[0_0_20px_rgba(102,126,234,0.3)] transition-all outline-none"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                />
                            </div>

                            <div className="p-5 glass-effect rounded-[16px] border border-[#667eea]/20">
                                <div className="flex items-start gap-3">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#667eea]/20 to-[#764ba2]/20 flex items-center justify-center flex-shrink-0">
                                        <svg className="w-5 h-5 text-[#667eea]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="font-poppins font-semibold text-[15px] text-white mb-2">
                                            Back it because you believe in it
                                        </h4>
                                        <p className="font-inter font-normal text-[13px] leading-[22px] text-[#b2b3bd]">
                                            Support this project with no reward, just because it speaks to you.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <CustomButton
                                btnType="button"
                                title="Fund Campaign"
                                styles="w-full"
                                handleClick={handleDonate}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CampaignDetails
