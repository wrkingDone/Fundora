import React from 'react'

const Card = ({ allcampaign, setOpenModel, setDonate, title }) => {

  // const daysLeft = (deadline) => {
  //   const difference = new Date(deadline).getTime() - Date.now();
  //   const remainingDays = difference / (1000 * 3600 * 24);
  //   return remainingDays.toFixed(0);
  // };

  const daysLeft = (deadline) => {
  // Convert BigInt to Number and multiply by 1000
    const convertedDeadlineDate = Number(deadline)
    const deadlineTimeConverted = new Date(convertedDeadlineDate)
    const dateCheck = new Date(Date.now());
    const fundingDeadline = deadlineTimeConverted - dateCheck
    const fundingDeadlineToDay = fundingDeadline / (1000 * 60 * 60 * 24) 
    return Math.floor(fundingDeadlineToDay) 
  };
  

  return (
    <div className='px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20 relative'>
      {/* Subtle background animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-purple-200/20 to-pink-200/20 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-float-2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-200/20 to-cyan-200/20 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-float-1" />
      </div>

      <div className="relative z-10">
        <p className='py-16 text-3xl font-extrabold leading-5 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent'>
          {title}
        </p>
        <div className='grid gap-5 lg:grid-cols-3 sm:max-w-sm sm:mx-auto lg:max-w-full'>
          {allcampaign?.map((campaign, i) => (
            <div 
            onClick={() => (setDonate(campaign), setOpenModel(true))}
            key={i + 1}
            className='cursor-pointer border-2 border-transparent overflow-hidden transition-all duration-300 bg-white/90 backdrop-blur-sm rounded-2xl hover:border-purple-300 hover:shadow-2xl hover:shadow-purple-500/20 hover:-translate-y-2 group'
            >
              <div className="relative overflow-hidden">
                <img 
                src="https://images.pexels.com/photos/932638/pexels-photo-932638.jpeg?auto=compress&amp;cs=tinyrgb&amp;h=750&amp;w=1260" 
                alt="" 
                className='object-cover w-full h-64 rounded-t-2xl group-hover:scale-110 transition-transform duration-300'
                />
                <div className="absolute top-4 right-4 px-3 py-1 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white text-xs font-bold rounded-full shadow-lg">
                  {daysLeft(campaign.deadline)} Days Left
                </div>
              </div>
              <div className='py-5 pl-4 pr-4'>
                <a 
                href="/"
                aria-label='Article'
                className='inline-block mb-3 transition-all duration-200'
                >
                  <p className='text-2xl font-extrabold leading-5 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent group-hover:from-purple-600 group-hover:to-pink-600 transition-all'>
                    {campaign.title}
                  </p>
                </a>
                <p className='mb-4 text-gray-600 group-hover:text-gray-800 transition-colors line-clamp-2'>{campaign.description}</p>
                <div className='flex flex-col space-y-2'>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-gray-600">Target:</span>
                    <span className="text-sm font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                      {campaign.target} HBAR
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-gray-600">Raised:</span>
                    <span className="text-sm font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      {campaign.amountCollected} HBAR
                    </span>
                  </div>
                  {/* Progress bar */}
                  <div className="mt-3 w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 transition-all duration-500"
                      style={{ width: `${Math.min((campaign.amountCollected / campaign.target) * 100, 100)}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Card;
