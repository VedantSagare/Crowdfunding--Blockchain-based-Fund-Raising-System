const { expect } = require("chai");
const hre = require("hardhat");
const { ethers } = hre;

describe("CrowdFunding", function () {
    let CrowdFunding, crowdFunding, owner, addr1, addr2;

    beforeEach(async function () {
        [owner, addr1, addr2] = await ethers.getSigners();
        const CrowdFundingFactory = await ethers.getContractFactory("CrowdFunding");
        crowdFunding = await CrowdFundingFactory.deploy();
        await crowdFunding.waitForDeployment();
    });

    describe("Campaigns", function () {
        it("Should create a new campaign", async function () {
            const deadline = Math.floor(Date.now() / 1000) + 3600; // 1 hour from now
            await crowdFunding.createCampaign(
                owner.address,
                "Test Title",
                "Test Description",
                ethers.parseEther("1"),
                deadline,
                "image.jpg"
            );

            const campaigns = await crowdFunding.getCampaigns();
            expect(campaigns.length).to.equal(1);
            expect(campaigns[0].title).to.equal("Test Title");
        });

        it("Should accept donations", async function () {
            const deadline = Math.floor(Date.now() / 1000) + 3600;
            await crowdFunding.createCampaign(
                owner.address,
                "Test Title",
                "Test Description",
                ethers.parseEther("1"),
                deadline,
                "image.jpg"
            );

            await crowdFunding.connect(addr1).donateToCampaign(0, { value: ethers.parseEther("0.5") });

            const [donators, donations] = await crowdFunding.getDonators(0);
            expect(donators[0]).to.equal(addr1.address);
            expect(donations[0]).to.equal(ethers.parseEther("0.5"));
        });
    });
});
