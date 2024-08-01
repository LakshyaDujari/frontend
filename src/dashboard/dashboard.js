import React, { useEffect } from 'react'
import Header from './header'
import Sidebar from './sidebar';
import Blog from './blog';
import Message from './message';
import RequestModal from './request';
export default function Dashboard() {
    useEffect(() => {
      document.body.style.backgroundColor = '#fbfaff';
    }, [])
    return (
      <>
        <div className="flex flex-col relative w-screen"></div>
          <Header />
          <div className="flex flex-row h-full w-11/12 gap-8 p-6 mr-14 ml-14 overflow-x-scrool mt-14 top-5 fixed mb-14">
              <Sidebar />
              <Blog/>
              <div className="flex flex-col place-content-start gap-10 sm:w-1/5">
                  <Message />
                  <RequestModal />
              </div>
          </div>
      </>
    )
}
 