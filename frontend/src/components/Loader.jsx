import React from 'react'

const Loader = () => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-black/60 animate-fadeIn">
            <div className="glass-effect-strong rounded-[24px] p-8 flex flex-col items-center gap-6 animate-scaleIn">
                {/* Custom Spinner */}
                <div className="relative w-20 h-20">
                    <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-[#667eea] border-r-[#764ba2] animate-spin"></div>
                    <div className="absolute inset-2 rounded-full border-4 border-transparent border-t-[#4facfe] border-r-[#00f2fe] animate-spin" style={{ animationDirection: 'reverse', animationDuration: '0.8s' }}></div>
                    <div className="absolute inset-4 rounded-full bg-gradient-to-br from-[#667eea]/20 to-[#764ba2]/20 animate-pulse"></div>
                </div>

                {/* Text */}
                <div className="text-center">
                    <h3 className="font-poppins font-bold text-[22px] text-white mb-2 gradient-text">
                        Processing Transaction
                    </h3>
                    <p className="font-inter font-normal text-[14px] text-[#b2b3bd] max-w-[280px]">
                        Please wait while we process your request on the blockchain...
                    </p>
                </div>

                {/* Animated dots */}
                <div className="flex gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#667eea] animate-pulse" style={{ animationDelay: '0s' }}></div>
                    <div className="w-2 h-2 rounded-full bg-[#764ba2] animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 rounded-full bg-[#4facfe] animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                </div>
            </div>
        </div>
    )
}

export default Loader
