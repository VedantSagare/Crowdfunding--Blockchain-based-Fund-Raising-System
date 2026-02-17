import React from 'react'

const CustomButton = ({ btnType, title, styles, handleClick, disabled }) => {
    return (
        <button
            type={btnType}
            disabled={disabled}
            className={`
                relative overflow-hidden
                font-epilogue font-semibold text-[16px] leading-[26px] text-white 
                min-h-[52px] px-6 rounded-[12px]
                bg-gradient-to-r from-[#667eea] to-[#764ba2]
                hover:from-[#764ba2] hover:to-[#667eea]
                transform transition-all duration-300 ease-out
                hover:scale-105 hover:shadow-[0_0_30px_rgba(102,126,234,0.5)]
                active:scale-95
                disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
                ${styles}
            `}
            onClick={handleClick}
        >
            <span className="relative z-10">{title}</span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 hover:opacity-20 transition-opacity duration-500 transform -skew-x-12"></div>
        </button>
    )
}

export default CustomButton
