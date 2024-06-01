import { timelineData } from "../data/Timeline";

export default function Timeline() {
  return (
    <>
      <div className="container px-10 py-10 mx-auto z-1" style={{ zIndex: 1, position: 'relative' }}>
        <h1 className="text-4xl font-bold py-10" style={{ textAlign: 'center' }}>Timeline</h1>
        <ol className="relative border-s border-gray-200 dark:border-gray-700">  
          {
            timelineData.map((data, index) => {
              return (
                <li key={`${data.title}-${index}`} className="mb-10" style={{ position: 'relative' }}>
                  <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -left-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
                    <svg className="w-2.5 h-2.5 text-blue-800 dark:text-blue-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"></path>
                    </svg>
                  </span>
                  <h3 className="flex items-center mb-4 ml-8 text-lg font-bold text-gray-900">{data.title}</h3>
                  <time className="block ml-10 mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">{data.date}</time>
                  <p className="mb-4 text-base ml-10 font-normal text-gray-500 dark:text-gray-400">{data.details}</p>
                </li>
              )
            })
          }
        </ol>
      </div>
    </div>
  );
}
