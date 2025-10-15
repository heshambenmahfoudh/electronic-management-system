'use client'

// import { Button } from "@/components/ui/button"
// import type { EmployeeData } from "@/types/employee"
import { Download, Printer } from 'lucide-react'
import { useRef } from 'react'
import html2canvas from 'html2canvas'
import { Employee } from '@prisma/client'
import jsPDF from "jspdf"

// interface EmployeeInvoicePreviewProps {
//   employeeData: EmployeeData
// }

export function InvoiceData({ initialData }: { initialData: Employee }) {
//   const invoiceRef = useRef<HTMLDivElement>(null)

//   const handlePrint = () => {
//     window.print()
//   }

//   //   const handleDownloadPDF = async () => {
//   //     if (!invoiceRef.current) return

//   //     try {
//   //       const canvas = await html2canvas(invoiceRef.current, {
//   //         scale: 2,
//   //         useCORS: true,
//   //         logging: false,
//   //         backgroundColor: "#f5f5dc",
//   //       })

//   //       const imgData = canvas.toDataURL("image/png")
//   //       const pdf = new jsPDF({
//   //         orientation: "portrait",
//   //         unit: "mm",
//   //         format: "a4",
//   //       })

//   //       const imgWidth = 210
//   //       const imgHeight = (canvas.height * imgWidth) / canvas.width

//   //       pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight)
//   //       pdf.save(`Employee_Invoice_${employeeData.employeeId || "document"}.pdf`)
//   //     } catch (error) {
//   //       console.error("[v0] Error generating PDF:", error)
//   //     }
//   //   }

//   return (
//     <div className="space-y-4">
//       {/* <div className="flex gap-2 no-print">
//         <Button onClick={handlePrint} className="flex-1">
//           <Printer className="mr-2 h-4 w-4" />
//           Print Invoice
//         </Button>
//         <Button onClick={handleDownloadPDF} variant="secondary" className="flex-1">
//           <Download className="mr-2 h-4 w-4" />
//           Download PDF
//         </Button>
//       </div> */}

//       <div ref={invoiceRef} className="bg-[#f5f5sc] p-8 min-h-[1000px]">
//         <div className="bg-white p-12 shadow-lg">
//           {/* Header Section */}
//           <div className="flex justify-between items-start mb-12">
//             {/* Logo and Branding */}
//             <div className="flex items-center gap-4">
//               <div className="w-16 h-16 border-4 border-black flex items-center justify-center">
//                 <svg
//                   viewBox="0 0 24 24"
//                   className="w-10 h-10"
//                   fill="none"
//                   stroke="currentColor"
//                   strokeWidth="2"
//                 >
//                   <path d="M12 2L2 7l10 5 10-5-10-5z" />
//                   <path d="M2 17l10 5 10-5" />
//                   <path d="M2 12l10 5 10-5" />
//                 </svg>
//               </div>
//               <div>
//                 <h1 className="text-3xl font-bold tracking-tight text-black">
//                   {'UNIVERSITY'}
//                 </h1>
//                 <p className="text-sm text-gray-600 tracking-wide mt-1">
//                   EMPLOYEE DOCUMENTATION
//                 </p>
//               </div>
//             </div>

//             {/* Invoice Details */}
//             <div className="text-right">
//               <p className="text-sm text-gray-600 mb-1">
//                 Document No.
//                 {'----'}
//               </p>
//               {/* <p className="text-sm text-gray-600 mb-1">
//                 {new Date(employeeData.dateIssued || Date.now()).toLocaleDateString("en-US", {
//                   year: "numeric",
//                   month: "long",
//                   day: "numeric",
//                 })}
//               </p> */}
//               {/* <p className="text-sm text-gray-600">{employeeData.college || "College Name"}</p> */}
//             </div>
//           </div>

//           {/* Divider */}
//           <div className="border-t-2 border-black mb-8"></div>

//           {/* Main Content */}
//           <div className="flex gap-12 mb-12">
//             {/* Employee Information */}
//             <div className="flex-1">
//               <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">
//                 EMPLOYEE TO
//               </h2>
//               <div className="space-y-2">
//                 {/* <p className="text-2xl font-bold text-gray-800">{employeeData.name || "Employee Name"}</p>
//                 <p className="text-gray-600">{employeeData.position || "Position"}</p>
//                 <p className="text-gray-600">{employeeData.employeeId || "Employee ID"}</p> */}
//               </div>
//             </div>

//             {/* Details Table */}
//             <div className="flex-[2]">
//               <table className="w-full">
//                 <thead>
//                   <tr className="border-b-2 border-black">
//                     <th className="text-left py-3 text-sm font-bold text-gray-700 uppercase tracking-wider">
//                       DESCRIPTION
//                     </th>
//                     <th className="text-right py-3 text-sm font-bold text-gray-700 uppercase tracking-wider">
//                       DETAILS
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   <tr className="border-b border-gray-200">
//                     <td className="py-4 text-gray-700">Department</td>
//                     <td className="py-4 text-right text-gray-900 font-medium">
//                       {/* {employeeData.department || "Not specified"} */}
//                     </td>
//                   </tr>
//                   <tr className="border-b border-gray-200">
//                     <td className="py-4 text-gray-700">Administrative Unit</td>
//                     <td className="py-4 text-right text-gray-900 font-medium">
//                       {/* {employeeData.administrative || "Not specified"} */}
//                     </td>
//                   </tr>
//                   <tr className="border-b border-gray-200">
//                     <td className="py-4 text-gray-700">College</td>
//                     <td className="py-4 text-right text-gray-900 font-medium">
//                       {/* {employeeData.college || "Not specified"} */}
//                     </td>
//                   </tr>
//                   <tr className="border-b border-gray-200">
//                     <td className="py-4 text-gray-700">University</td>
//                     <td className="py-4 text-right text-gray-900 font-medium">
//                       {/* {employeeData.university || "Not specified"} */}
//                     </td>
//                   </tr>
//                 </tbody>
//               </table>

//               {/* Summary Section */}
//               <div className="mt-8 space-y-2">
//                 <div className="flex justify-between py-2">
//                   <span className="text-gray-700 font-medium">STATUS:</span>
//                   <span className="text-gray-900 font-bold">ACTIVE</span>
//                 </div>
//                 <div className="flex justify-between py-2 border-t-2 border-black">
//                   <span className="text-gray-700 font-medium">
//                     VERIFICATION:
//                   </span>
//                   <span className="text-gray-900 font-bold">CONFIRMED</span>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Divider */}
//           <div className="border-t-2 border-black my-8"></div>

//           {/* Footer Section */}
//           <div className="bg-white">
//             <div className="flex justify-between items-start">
//               {/* Payment/Additional Details */}
//               <div className="flex-1 pr-8">
//                 <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">
//                   DOCUMENT DETAILS
//                 </h3>
//                 <p className="text-sm text-gray-600 leading-relaxed mb-2">
//                   This document certifies the employment status and
//                   organizational affiliation of the named employee. All
//                   information is accurate as of the date of issue.
//                 </p>
//                 <p className="text-sm text-gray-600 leading-relaxed">
//                   For verification purposes, please reference document number:
//                   {/* {employeeData.employeeId || "N/A"}. */}
//                 </p>
//               </div>

//               {/* Thank You Section with Decorative Element */}
//               <div className="flex-1 flex flex-col items-end justify-center">
//                 <div className="text-right">
//                   {/* Decorative floral element */}
//                   <div className="mb-4 flex justify-end gap-2">
//                     <svg
//                       className="w-12 h-12 text-gray-300"
//                       viewBox="0 0 24 24"
//                       fill="currentColor"
//                     >
//                       <circle cx="12" cy="12" r="3" />
//                       <circle cx="12" cy="6" r="2" />
//                       <circle cx="12" cy="18" r="2" />
//                       <circle cx="6" cy="12" r="2" />
//                       <circle cx="18" cy="12" r="2" />
//                     </svg>
//                     <svg
//                       className="w-10 h-10 text-gray-300"
//                       viewBox="0 0 24 24"
//                       fill="currentColor"
//                     >
//                       <circle cx="12" cy="12" r="2.5" />
//                       <circle cx="12" cy="7" r="1.5" />
//                       <circle cx="12" cy="17" r="1.5" />
//                       <circle cx="7" cy="12" r="1.5" />
//                       <circle cx="17" cy="12" r="1.5" />
//                     </svg>
//                   </div>
//                   <h2 className="text-4xl font-serif text-gray-800 mb-2">
//                     Thank you!
//                   </h2>
//                   <div className="flex justify-end gap-1 mt-2">
//                     <svg
//                       className="w-8 h-16 text-gray-200"
//                       viewBox="0 0 24 48"
//                       fill="currentColor"
//                     >
//                       <path
//                         d="M12 0 L12 48 M8 40 L12 48 L16 40"
//                         stroke="currentColor"
//                         strokeWidth="2"
//                         fill="none"
//                       />
//                       <circle cx="12" cy="8" r="3" />
//                     </svg>
//                     <svg
//                       className="w-8 h-16 text-gray-200"
//                       viewBox="0 0 24 48"
//                       fill="currentColor"
//                     >
//                       <path
//                         d="M12 0 L12 48 M8 40 L12 48 L16 40"
//                         stroke="currentColor"
//                         strokeWidth="2"
//                         fill="none"
//                       />
//                       <circle cx="12" cy="10" r="2.5" />
//                     </svg>
//                     <svg
//                       className="w-8 h-16 text-gray-200"
//                       viewBox="0 0 24 48"
//                       fill="currentColor"
//                     >
//                       <path
//                         d="M12 0 L12 48 M8 40 L12 48 L16 40"
//                         stroke="currentColor"
//                         strokeWidth="2"
//                         fill="none"
//                       />
//                       <circle cx="12" cy="6" r="3" />
//                     </svg>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
}




// import React, { useEffect, useState } from 'react'
// import { useRef } from 'react';
// import InvoiceButton from './InvoiceButton';
// import InvoiceHeader from './InvoiceHeader';
// import InvoiceFooter from './InvoiceFooter';
// import { useSession } from 'next-auth/react';
// import { redirect } from 'next/navigation';

// export default function SaleInvoice ({saleData  ,saleId}){
// const invoiceReferance = useRef(null)
// const [timeNow, setTimeNow] = useState('')
// const {data:session,status} = useSession()
// if (status === 'unauthenticated') {
//   return redirect('/')
// }
// const date= new Date()
// const dateNow = date.toLocaleDateString('en-GB')  
// const dayNow = date.toLocaleDateString('en-GB',{weekday:'long'})  
// useEffect(() => {
//   const intervalTimeNow=setTimeNow(date.toLocaleTimeString('en-GB') )
//   const timeInterval = setInterval(intervalTimeNow,1000)
//   return ()=> clearInterval(timeInterval)
// }, [])

//   return (
//       <div >
//             <InvoiceButton saleData={saleData} invoiceReferance={invoiceReferance} />
//       <div className="overflow-x-auto   mx-3   ">
//         <div ref={invoiceReferance} className="overflow-auto bg-white min-w-fit 
//          p-8 rounded-lg shadow-lg shadow-blue-400 ">
//           {/* Header with Logo */}
//           <div className='flex justify-between items-center  border-b-[2px]'>
//              <InvoiceHeader/>
//               <div className="text-center">
//                   <h1 className="text-16 font-medium uppercase underline">Sale Invoice# {saleData?.[0]?.order}</h1>
//                   <p className='text-16 font-medium capitalize'>{timeNow}</p>
//               </div>
//               <div >
//                   <p className='text-16 font-medium uppercase'>
//                   <span className='capitalize'>Date</span> : {dateNow}</p>
//                   <p className='text-16 font-medium capitalize'>
//                   <span className='capitalize'>Day</span> : {dayNow}</p>
//               </div>
//           </div>
//           {/* Company Info  */}
//            <div className="mt-5 mb-7   flex items-center gap-2">
//             <h2 className="text-15 font-medium">Name :</h2>
//             <p className="text-gray-700 font-medium capitalize">
//               {saleData?.[0]?.customer?.name||saleData?.[0]?.cashCustomer}</p>
//           </div>
//           <div className='flex justify-between items-center gap-4 mt-3 mb-5'>
//             <article className='border-1 p-2 w-full text-center bg-blue-50  rounded-md'>
//               <h2 className='capitalize text-gray-500 font-medium'>INVOICE DATE</h2>
//               <h1 className='font-medium'>{saleData?.[0]?.date?.slice(0,10)}</h1>
//             </article>
//             <article className='border-1 p-2 w-full text-center bg-blue-50  rounded-md'>
//               <h2 className='capitalize text-gray-500 font-medium'>ORDER NUMBER</h2>
//               <h1 className='font-medium'>{saleId}</h1>
//             </article>
//             <article className='border-1 p-2 w-full text-center bg-blue-50 rounded-md'>
//               <h2 className='capitalize text-gray-500 font-medium'>STATUS</h2>
//               <h1 className='font-medium'>22/2/2020</h1>
//             </article>
//           </div>

//           {/* START HEADER */}
//          <div className={`  p-1.5 rounded-t-md 
//             flex bg-blue-200  
//           justify-between items-center gap-1  text-14 sms:text-13 font-bold text-center `}>
//               <h2  className={` text-center min-w-[30px] font-medium uppercase text-14 `}>
//               id
//               </h2>
//               <h2  className={` text-center smd:min-w-[250px] w-full font-medium uppercase text-14 `}>
//                product
//               </h2>
//               <h2  className={` text-center min-w-[150px] font-medium uppercase text-14 `}>
//                brand
//               </h2>
//               <h2  className={` text-center min-w-[100px] font-medium uppercase text-14 `}>
//                unit
//               </h2>
//               <h2  className={` text-center min-w-[60px] font-medium uppercase text-14 `}>
//                qty
//               </h2>
//               <h2  className={` text-center min-w-[60px] font-medium uppercase text-14 `}>
//                price
//               </h2>
//               <h2  className={` text-center min-w-[120px] font-medium uppercase text-14 `}>
//                total price
//               </h2>
//          </div>
//           {/* END HEADER */}
//           {/* Items Table */}
//           <div className="mb-6 rounded-md ">
//           {saleData?.map(
//             (
//               {
//                 _id,
//                 product,
//                 brand,
//                 unit,
//                 qty,
//                 price,
//                 totalPrice,
//               },
//               i,
//             ) => (
//               <article
//                 key={_id}
//                 className=" min-h-[40px] p-3 border-b-[1px]  border-gray-200
//              gap-1 bg-blue-50 
//              flex justify-between items-center text-15  font-medium capitalize"
//               >
//                 <p className="min-w-[30px] text-center text-15 sms:text-14">
//                   {i+1}
//                 </p>
//                   <p className=" text-center smd:min-w-[250px] w-full">{product?.title}</p>
//                   <p className=" text-center min-w-[150px]">{brand?.title}</p>
//                   <p className=" text-center min-w-[100px]">{unit?.title}</p>
//                   <p className=" text-center min-w-[60px]">{qty}</p>
//                   <p className=" text-center min-w-[60px]">{price}$</p>
//                   <p className=" text-center min-w-[120px]">{totalPrice}$</p>
//               </article>
//             ),
//           )}
//           </div>
    
//           {/* Totals Section */}
//           <div className='flex flex-col flex-start justify-start gap-2 border-1 border-blue-100 bg-blue-50 w-fit p-3 rounded-md'>
//             <div className="flex items-center gap-2">
//               <h2 className='text-15 font-medium mr-3'>Total :</h2>
//               <p className='text-15 font-medium px-5 py-.5 
              
//               rounded-md
//               '>{saleData?.[0]?.totalItemsPrice}$</p>
//             </div>
//             <div className="flex items-center gap-2">
//               <h2 className='text-15 font-medium mr-5'>Pay    {' '}:</h2>
//               <p className='text-15 font-medium px-5 py-.5 
              
//               rounded-md
//               '>{saleData?.[0]?.pay}$</p>
//             </div>
//             <div className="flex items-center gap-2">
//               <h2 className='text-15 font-medium'>Abider :</h2>
//               <p className='text-15 font-medium px-5 py-.5 
              
//               rounded-md
//               '>{saleData?.[0]?.abider | 0}$</p>
//             </div>
//           </div>

//           {/* Terms & Conditions */}
//             {/* <InvoiceFooter/> */}
//         </div>
//       </div>
//       </div>
//   );
// };
