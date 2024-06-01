import React from 'react'

const timelineData = [
  {
    date: "8th June 2024",
    title: "Registration Begins",
    details: `At 1:00 PM, the registration form will go live. It must be filled completely to be a part of the program.`,
  },
  {
    date: "12th June 2024",
    title: "Registration Ends",
    details: `At 11:00 PM, the form will become inactive and no more entries will be entertained. Registered Participants will be notified regarding the further events.`,
  },
  {
    date: "15th June 2024",
    title: "Opening Ceremony",
    details: `This will be the kickstart of the program where the mentors will be introduced and the participants can interact with them for any questions.`,
  },
  {
    date: "16th June 2024",
    title: "Phase 1 Begins",
    details: `It will be the mentorship phase where participants will be assigned mentors. During this phase, participants will have to complete and submit the tasks given to them within the stipulated timeframe.`,
  },
  {
    date: "10th July 2024",
    title: "Phase 1 Ends",
    details: `By the end, the participants would have got extensive preparation and experience in their respective domains, ensuring that they are ready to work on some good projects.`,
  },
  {
    date: "?? 2024",
    title: "Phase 2 ( Locked )",
    details: `Will be communicated soon...`,
  }
];

export default function Timeline() {
  return (
    <>
      <div class="container px-10 py-10 mx-auto z-1" style={{ zIndex: 1, position: 'relative' }}>
        <h1 class="text-4xl font-bold py-10" style={{ textAlign: 'center' }}>Timeline</h1>
        <ol class="relative border-s border-gray-200 dark:border-gray-700">  
          {
            timelineData.map((data, index) => {
              return (
                <li key={`${data.title}-${index}`} class="mb-10" style={{ position: 'relative' }}>
                  <span class="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -left-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
                    <svg class="w-2.5 h-2.5 text-blue-800 dark:text-blue-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"></path>
                    </svg>
                  </span>
                  <h3 class="flex items-center mb-4 ml-8 text-lg font-bold text-gray-900">{data.title}</h3>
                  <time class="block ml-10 mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">{data.date}</time>
                  <p class="mb-4 text-base ml-10 font-normal text-gray-500 dark:text-gray-400">{data.details}</p>
                </li>
              )
            })
          }
        </ol>
      </div>
    </>
  )
}
