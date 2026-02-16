import React, { useState, useEffect } from 'react'
import { useStateContext } from '../context/CrowdFundingContext'
import DisplayCampaigns from '../components/DisplayCampaigns'

const Profile = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [campaigns, setCampaigns] = useState([]);

    const { address, contract, getCampaigns } = useStateContext();

    const fetchCampaigns = async () => {
        setIsLoading(true);
        const data = await getCampaigns();
        const filteredCampaigns = data.filter((campaign) => campaign.owner === address);
        setCampaigns(filteredCampaigns);
        setIsLoading(false);
    }

    useEffect(() => {
        if (contract) fetchCampaigns();
    }, [address, contract]);

    return (
        <DisplayCampaigns
            title="All Campaigns"
            isLoading={isLoading}
            campaigns={campaigns}
        />
    )
}

export default Profile
