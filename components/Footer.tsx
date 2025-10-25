import Link from 'next/link'
import React from 'react'

export default function Footer() {
  return (
    <footer className="p-4 bg-white md:p-8 lg:p-10 dark:bg-gray-800">
      <div className="mx-auto max-w-screen-xl text-center">
        <Link
          href="/"
          className="flex justify-center items-center text-2xl font-semibold text-gray-900 dark:text-white"
        >
          Electronic Management System
        </Link>
        <p className="my-6 md:w-[740px] w-fit mx-auto text-gray-500 dark:text-gray-400">
          Electronic Management that connects multiple offices, allowing
          seamless exchange between them.The system also features powerfull
          message archivivg.This was was made By Hisham Mahfoudh
        </p>
        <ul className="flex flex-wrap justify-center items-center mb-6 text-gray-900 dark:text-white">
          <li>
            <a href="#" className="mr-4 hover:underline md:mr-6 ">
              About
            </a>
          </li>
          <li>
            <a href="#" className="mr-4 hover:underline md:mr-6">
              Blog
            </a>
          </li>
          <li>
            <a href="#" className="mr-4 hover:underline md:mr-6">
              Affiliate Program
            </a>
          </li>
          <li>
            <a href="#" className="mr-4 hover:underline md:mr-6">
              FAQs
            </a>
          </li>
          <li>
            <a href="#" className="mr-4 hover:underline md:mr-6">
              Contact
            </a>
          </li>
        </ul>
        <span className="text-sm text-gray-500 underline sm:text-center dark:text-gray-400">
          © 2024-2025{' '}
          <a href="#" className="hover:underline">
            Electronic System
          </a>
          .All Rights Reserved.
        </span>
      </div>
    </footer>
  )
}
