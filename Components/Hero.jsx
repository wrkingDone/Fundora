import React, { useState } from "react";

const Hero = ({ titleData, createCampaign }) => {
  const [campaign, setCampaign] = useState({
    title: "",
    description: "",
    amount: "",
    deadline: "",
  });

  const createNewCampaign = async (e) => {
    e?.preventDefault();
    try {
      const data = await createCampaign(campaign);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600">
      {/* Colorful animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-pink-400/30 via-purple-400/30 to-pink-500/30 rounded-full mix-blend-multiply filter blur-3xl animate-float-1" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-cyan-400/30 via-blue-400/30 to-blue-500/30 rounded-full mix-blend-multiply filter blur-3xl animate-float-2" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-br from-indigo-400/20 via-purple-400/20 to-pink-400/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse-slow" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:24px_24px] opacity-40 animate-grid-shift" />
      </div>

      <div className="relative px-4 py-16 mx-auto overflow-hidden sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20 z-10">
          <div className="flex flex-col items-center justify-between xl:flex-row">
            <div className="w-full max-w-xl mb-12 xl:mb-0 xl:pr-16 xl:w-7/12">
              <h2 className="max-w-lg mb-6 font-extrabold text-3xl tracking-tight sm:text-5xl sm:leading-none bg-gradient-to-r from-white via-pink-100 to-blue-100 bg-clip-text text-transparent animate-gradient-text">
                Fundora <br className="hidden md:block" />
                Crowd Funding FX
              </h2>
              <p className="max-w-xl mb-4 text-base text-white/90 md:text-lg font-medium">
                Create and manage your crowdfunding campaigns with ease. Launch your project, set goals, and start raising funds on the Hedera network.
              </p>
              <a
                href="/"
                aria-label=""
                className="inline-flex items-center font-semibold tracking-wider transition-all duration-200 text-white hover:text-pink-200 group"
              >
                Learn More
                <svg
                  className="inline-block w-3 ml-2 group-hover:translate-x-1 transition-transform"
                  fill="currentColor"
                  viewBox="0 0 12 12"
                >
                  <path d="M9.707,5.293l-5-5A1,1,0,0,0,3.293,1.707L7.586,6,3.293,10.293a1,1,0,1,0,1.414,1.414l5-5A1,1,0,0,0,9.707,5.293Z" />
                </svg>
              </a>
            </div>
            <div className="w-full max-w-xl xl:px-8 xl:w-5/12">
              <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-7 sm:p-10 border-2 border-white/20 hover:border-purple-300/50 transition-all">
                <h3 className="mb-4 text-xl font-extrabold sm:text-center sm:mb-6 sm:text-2xl bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
                  Create Campaign
                </h3>
                <form>
                  <div className="mb-1 sm:mb-2">
                    <label
                      htmlFor="firstName"
                      className="inline-block mb-1 font-semibold text-gray-700"
                    >
                      Title
                    </label>
                    <input
                      type="text"
                      onChange={(e) =>
                        setCampaign({
                          ...campaign,
                          title: e.target.value,
                        })
                      }
                      placeholder="Enter campaign title"
                      required
                      className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border-2 border-gray-200 rounded-lg shadow-sm appearance-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none"
                      id="firstName"
                      name="firstName"
                    />
                  </div>
                  <div className="mb-1 sm:mb-2">
                    <label
                      htmlFor="lastName"
                      className="inline-block mb-1 font-semibold text-gray-700"
                    >
                      Description
                    </label>
                    <input
                      type="text"
                      onChange={(e) =>
                        setCampaign({
                          ...campaign,
                          description: e.target.value,
                        })
                      }
                      placeholder="Enter campaign description"
                      required
                      className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border-2 border-gray-200 rounded-lg shadow-sm appearance-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none"
                      id="lastName"
                      name="lastName"
                    />
                  </div>
                  <div className="mb-1 sm:mb-2">
                    <label
                      htmlFor="email"
                      className="inline-block mb-1 font-semibold text-gray-700"
                    >
                      Target Amount (HBAR)
                    </label>
                    <input
                      type="text"
                      onChange={(e) =>
                        setCampaign({
                          ...campaign,
                          amount: e.target.value,
                        })
                      }
                      placeholder="Enter target amount"
                      required
                      className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border-2 border-gray-200 rounded-lg shadow-sm appearance-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none"
                      id="email"
                      name="email"
                    />
                  </div>
                  <div className="mb-1 sm:mb-2">
                    <label
                      htmlFor="deadline"
                      className="inline-block mb-1 font-semibold text-gray-700"
                    >
                      Target Date
                    </label>
                    <input
                      type="date"
                      onChange={(e) =>
                        setCampaign({
                          ...campaign,
                          deadline: e.target.value,
                        })
                      }
                      placeholder="Select deadline"
                      required
                      className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border-2 border-gray-200 rounded-lg shadow-sm appearance-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none"
                      id="deadline"
                      name="deadline"
                    />
                  </div>
                  <div className="mt-4 mb-2 sm:mb-4">
                      <button 
                          onClick={(e) => createNewCampaign(e)}
                          type="submit"
                          className="inline-flex items-center justify-center w-full h-12 px-6 font-bold tracking-wide text-white transition-all duration-200 rounded-lg shadow-lg bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 hover:from-purple-700 hover:via-pink-700 hover:to-blue-700 focus:shadow-outline focus:outline-none hover:scale-105 hover:shadow-xl hover:shadow-purple-500/50"
                      >
                          Create Campaign
                      </button>
                  </div>
                  <p className="text-xs text-gray-600 sm:text-sm text-center font-medium">
                      Create your campaign to raise funds on Hedera
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}

export default Hero;
