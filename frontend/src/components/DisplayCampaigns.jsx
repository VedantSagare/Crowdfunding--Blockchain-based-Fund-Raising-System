import React from 'react';
import { useNavigate } from 'react-router-dom';
import FundCard from './FundCard';

const DisplayCampaigns = ({ title, isLoading, campaigns }) => {
    const navigate = useNavigate();

    const handleNavigate = (campaign) => {
        navigate(`/campaign-details/${campaign.title}`, { state: campaign })
    }

    return (
        <div className="animate-fadeIn">
            <div className="flex items-center gap-3 mb-8">
                <h1 className="font-poppins font-bold text-[28px] gradient-text">
                    {title}
                </h1>
                <span className="px-4 py-1 rounded-full glass-effect font-inter font-semibold text-[14px] text-white">
                    {campaigns.length}
                </span>
            </div>

            <div className="flex flex-wrap mt-[20px] gap-[26px]">
                {isLoading && (
                    <div className="w-full flex justify-center items-center py-20">
                        <div className="flex flex-col items-center gap-4">
                            <div className="w-16 h-16 border-4 border-transparent border-t-[#667eea] border-r-[#764ba2] rounded-full animate-spin"></div>
                            <p className="font-inter text-[#b2b3bd]">Loading campaigns...</p>
                        </div>
                    </div>
                )}

                {!isLoading && campaigns.length === 0 && (
                    <div className="w-full flex flex-col items-center justify-center py-20 glass-effect rounded-[24px]">
                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#667eea]/20 to-[#764ba2]/20 flex items-center justify-center mb-6">
                            <svg className="w-10 h-10 text-[#667eea]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                            </svg>
                        </div>
                        <h3 className="font-poppins font-semibold text-[20px] text-white mb-2">
                            No Campaigns Yet
                        </h3>
                        <p className="font-inter font-normal text-[14px] text-[#b2b3bd] text-center max-w-[400px]">
                            Be the first to create a campaign and start raising funds for your cause!
                        </p>
                    </div>
                )}

                {!isLoading && campaigns.length > 0 && campaigns.map((campaign) => <FundCard
                    key={campaign.pId}
                    {...campaign}
                    handleClick={() => handleNavigate(campaign)}
                />)}
            </div>
        </div>
    )
}

export default DisplayCampaigns
