/* eslint-disable @next/next/no-img-element */
import React from 'react'
import ThemeLink from './ThemLink'
export default function Hero() {
  return (
    <div className=" bg-gradient-to-b from-gray-900 flex flex-col py-14 md:py-32 px-4 md:px-16 text-slate-50 items-center gap-6">
      <div className="flex flex-col sm:space-y-8 space-y-6  items-center
       md:max-w-4xl w-full mx-auto text-center ">
        <h2 className="text-xl md:text-4xl font-bold md:mt-14 mt-10 ">
          Electronic management software for Management Messages.
        </h2>
        <p className="text-base md:text-xl text-[15px]">
          Electronic Management that connects multiple offices, allowing
          seamless exchange between them.The system also features powerfull
          message archivivg.
        </p>
        <div
          className="py-4 flex md:space-x-4 gap-2.5 items-center 
        flex-wrap  justify-center"
        >
          <>
            <ThemeLink
              className="bg-rose-600 hover:bg-rose-700 focus:ring-rose-300
               text-white"
              title="Access Electronic System"
              href="/dashboard/home/overview"
            />
            <ThemeLink
              className="bg-slate-50 hover:bg-slate-100 focus:ring-slate-300 text-slate-900"
              title="Access Your Account"
              href="/dashboard/settings/user-profile/update"
            />
          </>
        </div>
      </div>
      <div className="md:w-[90%] md:h-[80%] opacity-75
       w-[90%] h-[90%] mx-auto rounded-xl">
        <img
          src="/images/preview.png"
          className="w-full h-full
         rounded-xl object-cover object-center mx-auto"
          alt="previwDashboard"
        />
      </div>
    </div>
  )
}
