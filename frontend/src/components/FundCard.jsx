import React from 'react';

const FundCard = ({ owner, title, description, target, deadline, amountCollected, image, handleClick }) => {
    const remainingDays = (deadline - Date.now()) / (1000 * 60 * 60 * 24);
    const progressPercentage = Math.min(100, (amountCollected / target) * 100);

    return (
        <div
            className="sm:w-[288px] w-full rounded-[20px] glass-effect cursor-pointer hover-lift overflow-hidden group animate-slideUp"
            onClick={handleClick}
        >
            {/* Image with overlay */}
            <div className="relative overflow-hidden">
                <img
                    src={image}
                    alt="fund"
                    className="w-full h-[180px] object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Category badge */}
                <div className="absolute top-3 left-3 glass-effect-strong rounded-full px-3 py-1 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-[#43e97b] to-[#38f9d7]"></div>
                    <p className="font-inter font-medium text-[11px] text-white">Active</p>
                </div>
            </div>

            <div className="flex flex-col p-5">
                {/* Title and Description */}
                <div className="mb-4">
                    <h3 className="font-poppins font-semibold text-[18px] text-white leading-[26px] truncate mb-2 group-hover:gradient-text transition-all">
                        {title}
                    </h3>
                    <p className="font-inter font-normal text-[13px] text-[#b2b3bd] leading-[20px] line-clamp-2">
                        {description}
                    </p>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                    <div className="relative w-full h-[6px] bg-[#1a1a24] rounded-full overflow-hidden">
                        <div
                            className="absolute h-full bg-gradient-to-r from-[#43e97b] to-[#38f9d7] rounded-full transition-all duration-500 shadow-[0_0_10px_rgba(67,233,123,0.5)]"
                            style={{ width: `${progressPercentage}%` }}
                        ></div>
                    </div>
                    <p className="mt-2 font-inter text-[11px] text-[#808191]">
                        {progressPercentage.toFixed(1)}% funded
                    </p>
                </div>

                {/* Stats */}
                <div className="flex justify-between items-center mb-4 pb-4 border-b border-[#2a2a35]">
                    <div className="flex flex-col">
                        <h4 className="font-poppins font-bold text-[16px] text-white leading-[22px]">
                            {amountCollected}
                        </h4>
                        <p className="font-inter font-normal text-[11px] leading-[18px] text-[#808191] truncate">
                            of {target} ETH
                        </p>
                    </div>
                    <div className="flex flex-col items-end">
                        <h4 className="font-poppins font-bold text-[16px] text-white leading-[22px]">
                            {Math.max(0, Math.floor(remainingDays))}
                        </h4>
                        <p className="font-inter font-normal text-[11px] leading-[18px] text-[#808191]">
                            Days Left
                        </p>
                    </div>
                </div>

                {/* Creator */}
                <div className="flex items-center gap-3">
                    <div className="w-[36px] h-[36px] rounded-full bg-gradient-to-br from-[#667eea] to-[#764ba2] flex justify-center items-center p-[2px]">
                        <div className="w-full h-full rounded-full bg-[#13131a] flex items-center justify-center">
                            <img
                                src="https://cdn-icons-png.flaticon.com/512/1077/1077114.png"
                                alt="user"
                                className="w-[60%] h-[60%] object-contain"
                            />
                        </div>
                    </div>
                    <div className="flex-1">
                        <p className="font-inter font-normal text-[11px] text-[#808191]">
                            by
                        </p>
                        <p className="font-inter font-medium text-[12px] text-[#b2b3bd] truncate">
                            {owner}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FundCard
