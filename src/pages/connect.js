import React, { useEffect, useContext, useState } from 'react'
//INTERNAL IMPORTS
import { CrowdFundingContext } from "../../Context/CrowdFunding"
import { Hero, Card, PopUp } from "../../Components"
import AnimatedBackground from "../components/animated-background"
import Link from 'next/link';

const Index = () => {
  const { titleData, getCampaigns, createCampaign, donate, getUserCampaigns, getDonations } = useContext(CrowdFundingContext);
  const [allcampaign, setAllcampaign] = useState([]);
  const [usercampaign, setUsercampaign] = useState();


  useEffect(() => {
    const fetchData = async () => {
      try {
        const allData = await getCampaigns();
        const userData = await getUserCampaigns();

        setAllcampaign(allData || []);   // ensure array
        setUsercampaign(userData || []); // ensure array
      } catch (error) {
        console.error("Error fetching campaigns:", error);
        setAllcampaign([]); // fallback to empty array
      }
    };

    fetchData();
  });

  useEffect(() => {
  const fetchData = async () => {
    const allData = await getCampaigns();
    console.log("All Campaigns Data:", allData);
    setAllcampaign(allData || []); 
  };

    fetchData();
  });


  //DONATE POPUP MODEL
  const [openModel, setOpenModel] = useState(false);
  const [donateCampaign, setDonateCampaign] = useState();

  console.log("donate campaign state", donateCampaign);

  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-purple-50/20 to-blue-50/20 relative overflow-hidden">
      {/* Animated Background */}
      <AnimatedBackground />
      
      {/* Content with relative z-index */}
      <div className="relative z-10">
        <Hero titleData={titleData} createCampaign={createCampaign} />
        <Card
          title="All Listed Campaign"
          allcampaign={allcampaign}
          setOpenModel={setOpenModel}
          setDonate={setDonateCampaign} 
        />
        <Card
          title="Your Created Campaign"
          allcampaign={usercampaign}
          setOpenModel={setOpenModel}
          setDonate={setDonateCampaign}
        />
        {openModel && (
          <PopUp 
            setOpenModel={setOpenModel}
            getDonations={getDonations}
            donate={donateCampaign}
            donateFunction={donate}
          />
        )}
      </div>
    </main>
  );
};

export default Index;

