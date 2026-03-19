// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

contract CrowdFunding {
    struct Campaign {
        address owner;
        string title;
        string description;
        uint256 target;
        uint256 deadline;
        uint256 amountCollected;
        address[] donators;
        uint256[] donations;
        bool claimed;
    }
    mapping(uint256 => Campaign) public campaigns;

    uint256 public numberOfCampaigns = 0;

    event CampaignCreated(
        uint256 indexed id,
        address indexed owner,
        string title,
        uint256 target,
        uint256 deadline
    );
    event Donated(uint256 indexed id, address indexed donator, uint256 amount);
    event FundsClaimed(
        uint256 indexed id,
        address indexed owner,
        uint256 amount
    );

    function createCampaign(
        address _owner,
        string memory _title,
        string memory _description,
        uint256 _target,
        uint256 _deadline
    ) public returns (uint256) {
        Campaign storage campaign = campaigns[numberOfCampaigns];
        require(
            _deadline > block.timestamp,
            "The deadline must be in the future."
        );

        campaign.owner = _owner;
        campaign.title = _title;
        campaign.description = _description;
        campaign.target = _target;
        campaign.deadline = _deadline;
        campaign.amountCollected = 0;
        campaign.claimed = false;

        emit CampaignCreated(
            numberOfCampaigns,
            _owner,
            _title,
            _target,
            _deadline
        );
        numberOfCampaigns++;

        return numberOfCampaigns - 1;
    }

    function donateToCampaign(uint256 _id) public payable {
        uint256 amount = msg.value;
        require(amount > 0, "Donation amount must be greater than 0.");

        Campaign storage campaign = campaigns[_id];
        require(
            block.timestamp < campaign.deadline,
            "Campaign deadline has passed."
        );
        require(!campaign.claimed, "Campaign funds have already been claimed.");

        campaign.donators.push(msg.sender);
        campaign.donations.push(amount);

        // Funds are held securely in escrow in the smart contract
        campaign.amountCollected += amount;

        emit Donated(_id, msg.sender, amount);
    }

    // Escrow Milestone Payout: Target must be met for owner to claim funds
    function claim(uint256 _id) public {
        Campaign storage campaign = campaigns[_id];

        require(
            msg.sender == campaign.owner,
            "Only the campaign owner can claim funds."
        );
        require(!campaign.claimed, "Funds have already been claimed.");
        require(
            campaign.amountCollected >= campaign.target,
            "Funding target has not been met."
        );

        uint256 amountToTransfer = campaign.amountCollected;
        campaign.claimed = true; // Prevent re-entrancy

        (bool sent, ) = payable(campaign.owner).call{value: amountToTransfer}(
            ""
        );
        require(sent, "Failed to send funds to campaign owner.");

        emit FundsClaimed(_id, campaign.owner, amountToTransfer);
    }

    // Refund logic in case the target was not met and deadline passed
    function refund(uint256 _id) public {
        Campaign storage campaign = campaigns[_id];
        require(
            block.timestamp > campaign.deadline,
            "Campaign is still active."
        );
        require(
            campaign.amountCollected < campaign.target,
            "Target was met, no refunds."
        );

        uint256 totalDonated = 0;
        for (uint256 i = 0; i < campaign.donators.length; i++) {
            if (campaign.donators[i] == msg.sender) {
                totalDonated += campaign.donations[i];
                campaign.donations[i] = 0; // Prevent re-entrancy
            }
        }
        require(totalDonated > 0, "No funds to refund.");

        (bool sent, ) = payable(msg.sender).call{value: totalDonated}("");
        require(sent, "Failed to refund.");
    }

    function getDonators(
        uint256 _id
    ) public view returns (address[] memory, uint256[] memory) {
        return (campaigns[_id].donators, campaigns[_id].donations);
    }

    function getCampaign() public view returns (Campaign[] memory) {
        Campaign[] memory allCampaigns = new Campaign[](numberOfCampaigns);

        for (uint i = 0; i < numberOfCampaigns; i++) {
            Campaign storage item = campaigns[i];
            allCampaigns[i] = item;
        }

        return allCampaigns;
    }
}
