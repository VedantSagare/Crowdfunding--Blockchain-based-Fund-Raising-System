import React, { useContext, createContext } from 'react';
import { ethers } from 'ethers';
import axios from 'axios';
import CrowdFundingABI from './CrowdFunding.json';
const ABI = CrowdFundingABI.abi;

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
    const [address, setAddress] = React.useState(null);
    const [contract, setContract] = React.useState(null);

    const connectWallet = async () => {
        try {
            if (!window.ethereum) return alert("Please install Metamask");
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            setAddress(accounts[0]);

            // Integrate Backend: Register User
            try {
                await axios.post('http://localhost:8080/api/users/register', {
                    walletAddress: accounts[0],
                    username: 'User', // Placeholder
                    email: '' // Placeholder
                });
                console.log("User registered in backend");
            } catch (err) {
                console.log("Backend registration check failed or user exists", err);
            }

        } catch (error) {
            console.log(error);
        }
    }

    const getContract = async (signerOrProvider) => {
        const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
        const contract = new ethers.Contract(contractAddress, ABI, signerOrProvider);
        return contract;
    }

    const publishCampaign = async (form) => {
        try {
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const contract = await getContract(signer);

            const target = ethers.parseUnits(form.target, 18);
            const deadline = new Date(form.deadline).getTime();

            const tx = await contract.createCampaign(
                address, // owner
                form.title, // title
                form.description, // description
                target,
                deadline, // deadline
                form.image
            );

            await tx.wait();
            console.log("Contract Call Success", tx);
        } catch (error) {
            console.log("Contract Call Failure", error);
        }
    }

    const getCampaigns = async () => {
        try {
            const provider = new ethers.BrowserProvider(window.ethereum);
            const contract = await getContract(provider);
            const campaigns = await contract.getCampaigns();

            const parsedCampaigns = campaigns.map((campaign, i) => ({
                owner: campaign.owner,
                title: campaign.title,
                description: campaign.description,
                target: ethers.formatEther(campaign.target),
                deadline: Number(campaign.deadline),
                amountCollected: ethers.formatEther(campaign.amountCollected),
                image: campaign.image,
                pId: i
            }));
            return parsedCampaigns;
        } catch (error) {
            console.log("Error fetching campaigns", error);
            return [];
        }
    }

    const donate = async (pId, amount) => {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = await getContract(signer);

        const campaignData = await contract.donateToCampaign(pId, { value: ethers.parseEther(amount) });

        return campaignData;
    }

    return (
        <StateContext.Provider
            value={{
                address,
                contract,
                connectWallet,
                createCampaign: publishCampaign,
                getCampaigns,
                donate
            }}
        >
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext);
