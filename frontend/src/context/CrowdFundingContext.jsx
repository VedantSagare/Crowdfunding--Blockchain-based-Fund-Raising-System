import React, { useContext, createContext, useCallback, useEffect } from 'react';
import { ethers } from 'ethers';
import axios from 'axios';
import CrowdFundingABI from './CrowdFunding.json';
const ABI = CrowdFundingABI.abi;
const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS || '0x5FbDB2315678afecb367f032d93F642f64180aa3';
const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8080';

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
    const [address, setAddress] = React.useState(null);
    const [contract, setContract] = React.useState(null);

    const getContract = useCallback((signerOrProvider) => {
        return new ethers.Contract(CONTRACT_ADDRESS, ABI, signerOrProvider);
    }, []);

    const registerWalletInBackend = useCallback(async (walletAddress) => {
        try {
            await axios.post(`${API_BASE_URL}/api/users/register`, {
                walletAddress,
                username: 'User'
            });
        } catch (err) {
            // Register is idempotent for this flow; ignore conflicts or backend unavailability.
            console.log('Backend registration skipped', err);
        }
    }, []);

    const syncWallet = useCallback(async (walletAddress) => {
        if (!walletAddress || !window.ethereum) {
            setAddress(null);
            setContract(null);
            return;
        }

        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        setAddress(walletAddress);
        setContract(getContract(signer));
    }, [getContract]);

    const connectWallet = async () => {
        try {
            if (!window.ethereum) {
                alert('Please install Metamask');
                return;
            }
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            const walletAddress = accounts?.[0];
            await syncWallet(walletAddress);
            await registerWalletInBackend(walletAddress);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (!window.ethereum) return;

        const initializeWallet = async () => {
            try {
                const accounts = await window.ethereum.request({ method: 'eth_accounts' });
                await syncWallet(accounts?.[0]);
            } catch (error) {
                console.log('Wallet initialization failed', error);
            }
        };

        const handleAccountsChanged = (accounts) => {
            syncWallet(accounts?.[0]);
        };

        initializeWallet();
        window.ethereum.on('accountsChanged', handleAccountsChanged);

        return () => {
            window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        };
    }, [syncWallet]);

    const publishCampaign = async (form) => {
        try {
            if (!window.ethereum || !address) {
                throw new Error('Wallet is not connected');
            }
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const contractInstance = getContract(signer);

            const target = ethers.parseUnits(form.target, 18);
            const deadline = Math.floor(new Date(form.deadline).getTime() / 1000);
            if (!Number.isFinite(deadline)) {
                throw new Error('Invalid campaign deadline');
            }

            const tx = await contractInstance.createCampaign(
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
            if (!window.ethereum) return [];
            const provider = new ethers.BrowserProvider(window.ethereum);
            const contractInstance = getContract(provider);
            const campaigns = await contractInstance.getCampaigns();

            const parsedCampaigns = campaigns.map((campaign, i) => ({
                owner: campaign.owner,
                title: campaign.title,
                description: campaign.description,
                target: ethers.formatEther(campaign.target),
                deadline: Number(campaign.deadline) * 1000,
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
        if (!window.ethereum) {
            throw new Error('Wallet is not available');
        }
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contractInstance = getContract(signer);

        const campaignData = await contractInstance.donateToCampaign(pId, { value: ethers.parseEther(amount) });

        return campaignData;
    };

    const getDonations = async (pId) => {
        if (!window.ethereum) return [];
        const provider = new ethers.BrowserProvider(window.ethereum);
        const contractInstance = getContract(provider);
        const [donators, donations] = await contractInstance.getDonators(pId);
        return donators.map((donator, i) => ({
            donator,
            donation: ethers.formatEther(donations[i])
        }));
    };

    return (
        <StateContext.Provider
            value={{
                address,
                contract,
                connectWallet,
                createCampaign: publishCampaign,
                getCampaigns,
                getDonations,
                donate
            }}
        >
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext);
