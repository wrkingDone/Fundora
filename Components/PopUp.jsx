import React, { useState, useEffect } from "react";

const PopUp = ({ setOpenModel, donate, donateFunction, getDonations }) => {
  const [amount, setAmount] = useState("");
  const [allDonationData, setallDonationData] = useState();

  const createDonation = async () => {
    try {
      const data = await donateFunction(donate.pId, amount);
      console.log("donate pId", donate.pId);
      console.log(data);
    } catch (error) {
      console.log("donation err", error);
      console.log("donation amount", amount);
      console.log("donation pId", donate.pId);
    }
  };

  const [showPopup, setShowPopup] = useState(false);

  const handleDonateClick = async () => {
    try {
      await createDonation();
      setShowPopup(true); // then show popup
    } catch (error) {
      console.error("Donation failed:", error);
    }
  };

  const closePopup = () => setShowPopup(false);

  useEffect(() => {
    const donationsListData = getDonations(donate.pId);
    return async () => {
      const donationData = await donationsListData;
      setallDonationData(donationData);
    };
  }, []);

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          {/* content */}
          <div className="border-0 rounded-2xl relative flex flex-col w-full bg-white/95 backdrop-blur-md shadow-2xl outline-none focus:outline-none border-2 border-purple-200/50">
            {/* header */}
            <div className="flex items-start justify-between p-5 border-b border-solid border-purple-100 rounded-t-2xl bg-gradient-to-r from-purple-50 to-pink-50">
              <h3 className="text-3xl font-extrabold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
                {donate.title}
              </h3>
              <button
                className="p-1 ml-auto bg-transparent border-0 text-gray-400 hover:text-purple-600 float-right text-3xl leading-none font-semibold outline-none focus:outline-none transition-colors"
                onClick={() => setOpenModel(false)}
              >
                <span className="bg-transparent h-6 w-6 text-2xl block outline-none focus:outline-none">
                  ×
                </span>
              </button>
            </div>
            {/* body */}
            <div className="relative p-6 flex-auto">
              <p className="my-4 text-gray-700 text-lg leading-relaxed font-medium">
                {donate.description}
              </p>
              <div className="my-6">
                <label className="block mb-2 text-sm font-semibold text-gray-700">
                  Donation Amount (HBAR)
                </label>
                <input
                  type="text"
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter amount"
                  required
                  className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border-2 border-gray-200 rounded-lg shadow-sm appearance-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none"
                  id="donationAmount"
                  name="donationAmount"
                />
              </div>

              <div className="mt-6">
                <h4 className="text-lg font-bold mb-3 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Recent Donations
                </h4>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {allDonationData?.map((donate, i) => (
                    <div key={i} className="p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-100">
                      <p className="text-gray-700 text-sm leading-relaxed">
                        <span className="font-bold text-purple-600">{i + 1}.</span> {donate.donation} HBAR from{" "}
                        <span className="font-semibold text-gray-800">{donate.donator.slice(0, 35)}</span>
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* footer */}
            <div className="flex items-center justify-end p-6 border-t border-purple-100 bg-gradient-to-r from-purple-50/50 to-pink-50/50 rounded-b-2xl">
              <button
                className="text-gray-600 hover:text-purple-600 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-3 mb-1 ease-linear transition-all duration-150 hover:bg-purple-50 rounded-lg"
                type="button"
                onClick={() => setOpenModel(false)}
              >
                Close
              </button>
              <div className="">
                <button
                  className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white hover:from-purple-700 hover:via-pink-700 hover:to-blue-700 font-bold uppercase text-sm px-6 py-3 rounded-lg shadow-lg hover:shadow-xl hover:shadow-purple-500/50 outline-none focus:outline-none transition-all duration-150 hover:scale-105"
                  type="button"
                  onClick={handleDonateClick}
                >
                  Donate
                </button>

                {showPopup && (
                  <>
                    <div
                      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
                      onClick={closePopup}
                    ></div>

                    <div className="fixed inset-0 flex items-center justify-center z-50">
                      <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-8 w-96 text-center border-2 border-purple-200/50">
                        <div className="mb-4">
                          <div className="w-16 h-16 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                        </div>
                        <h2 className="text-2xl font-extrabold mb-4 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
                          Thank You!
                        </h2>
                        <p className="text-gray-600 mb-6 font-medium">
                          Your donation was successful.
                        </p>
                        <button
                          onClick={closePopup}
                          className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white px-6 py-2 rounded-lg hover:from-purple-700 hover:via-pink-700 hover:to-blue-700 transition-all shadow-lg hover:shadow-xl hover:scale-105 font-semibold"
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-30 fixed inset-0 z-40 bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900"></div>
    </>
  );
};

export default PopUp;
