import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

import { useStateContext } from '../context/CrowdFundingContext';
import { CustomButton, FormField, Loader } from '../components';

const CreateCampaign = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const { createCampaign } = useStateContext();
    const [form, setForm] = useState({
        name: '',
        title: '',
        description: '',
        target: '',
        deadline: '',
        image: ''
    });

    const handleFormFieldChange = (fieldName, e) => {
        setForm({ ...form, [fieldName]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.title.trim() || !form.description.trim() || !form.target || !form.deadline || !form.image.trim()) {
            setError('Please fill all required fields.');
            return;
        }
        if (Number(form.target) <= 0) {
            setError('Goal must be greater than 0.');
            return;
        }
        if (new Date(form.deadline).getTime() <= Date.now()) {
            setError('End date must be in the future.');
            return;
        }

        try {
            setError('');
            setIsLoading(true);
            await createCampaign({ ...form, target: form.target });
            navigate('/');
        } catch (submitError) {
            setError('Failed to create campaign. Please try again.');
            console.log(submitError);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="bg-[#1c1c24] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4">
            {isLoading && <Loader />}
            <div className="flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#3a3a43] rounded-[10px]">
                <h1 className="font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-white">Start a Campaign</h1>
            </div>

            <form onSubmit={handleSubmit} className="w-full mt-[65px] flex flex-col gap-[30px]">
                <div className="flex flex-wrap gap-[40px]">
                    <FormField
                        labelName="Your Name"
                        placeholder="John Doe"
                        inputType="text"
                        value={form.name}
                        handleChange={(e) => handleFormFieldChange('name', e)}
                    />
                    <FormField
                        labelName="Campaign Title"
                        placeholder="Write a title"
                        inputType="text"
                        value={form.title}
                        handleChange={(e) => handleFormFieldChange('title', e)}
                    />
                </div>

                <FormField
                    labelName="Story"
                    placeholder="Write your story"
                    isTextArea
                    value={form.description}
                    handleChange={(e) => handleFormFieldChange('description', e)}
                />

                <div className="w-full flex justify-start items-center p-4 bg-[#8c6dfd] h-[120px] rounded-[10px]">
                    <img src="https://cdn-icons-png.flaticon.com/512/2991/2991148.png" alt="money" className="w-[40px] h-[40px] object-contain" />
                    <h4 className="font-epilogue font-bold text-[25px] text-white ml-[20px]">You will get 100% of the raised amount</h4>
                </div>

                <div className="flex flex-wrap gap-[40px]">
                    <FormField
                        labelName="Goal *"
                        placeholder="ETH 0.50"
                        inputType="text"
                        value={form.target}
                        handleChange={(e) => handleFormFieldChange('target', e)}
                    />
                    <FormField
                        labelName="End Date *"
                        placeholder="End Date"
                        inputType="date"
                        value={form.deadline}
                        handleChange={(e) => handleFormFieldChange('deadline', e)}
                    />
                </div>

                <FormField
                    labelName="Campaign image *"
                    placeholder="Place image URL of your campaign"
                    inputType="url"
                    value={form.image}
                    handleChange={(e) => handleFormFieldChange('image', e)}
                />

                <div className="flex justify-center items-center mt-[40px]">
                    <CustomButton
                        btnType="submit"
                        title="Submit new campaign"
                        styles="bg-[#1dc071]"
                    />
                </div>
                {error && (
                    <p className="font-inter text-[13px] text-[#ff6b6b] text-center">{error}</p>
                )}
            </form>
        </div>
    )
}

export default CreateCampaign
