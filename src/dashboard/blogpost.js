import React ,{useState} from "react";
import { Carosel } from "./carasel";
export default function BlogPost(
    { title, content, images }
) {
    const [bheight, setBheight] = useState(14);
    return (
        
        <div className="w-3/4 max-w-xl2 bg-white rounded-lg shadow dark:bg-white dark:border-gray-700 mt-5 relative text-center p-4 group items-center flex flex-col hover:shadow-2xl transition-all duration-500 ">
            {/* <a href="#"> */}
                <div className="w-full m-auto">
                    <Carosel 
                        slides={images}
                    />
                </div>
            {/* </a> */}
            <div className="p-5">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-grey-800">{title}</h5>
                <p className={`mb-3 h-${bheight} font-normal text-gray-700 dark:text-gray-400 overflow-hidden`}>{content}</p>
                <h1 
                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    onClick={(e) => {
                        e.preventDefault();
                        if(bheight === 14)
                            setBheight('auto');
                        else
                            setBheight('14');
                    }}
                    >
                    Read more
                    <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                    </svg>
                </h1>
            </div>
        </div>
    )
}
