/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import html2canvas from 'html2canvas'
import { Download, Printer } from 'lucide-react'
import { useReactToPrint } from 'react-to-print'
import jsPDF from 'jspdf'
import { Employee } from '@prisma/client'

export default function InvoiceButton({
  initialData,
  invoiceReferance,
}: {
  initialData: Employee
  invoiceReferance: any
}) {
  const printInvoice = useReactToPrint({
    contentRef: invoiceReferance,
  })

  const generateInvoicePDF = () => {
    html2canvas(invoiceReferance, {
      scale: 2,
      logging: false,
      useCORS: true,
      allowTaint: true,
    }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF('p', 'mm', 'a4')
      const imgProps = pdf.getImageProperties(imgData)
      const pdfWidth = pdf.internal.pageSize.getWidth()
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight)
      pdf.save(`invoice_${initialData?.id}.pdf`)
    })
  }
  return (
    <div className="flex justify-end mx-3 items-end mb-3 no-print mt-2">
      <div className="flex gap-2">
        <button
          onClick={printInvoice}
          className="flex items-center gap-2
                px-5 py-2 shadow-sm border-1 border-gray-300 
            font-medium text-[14px]   bg-whitefont-medium text-14  rounded-md bg-white"
        >
          <Printer className="h-[16px]" />
          Print
        </button>
        <button
          onClick={generateInvoicePDF}
          className="flex items-center gap-2 px-5 py-2 shadow-sm border-1 border-gray-300 
            font-medium text-[14px]   bg-whitefont-medium text-14  rounded-md bg-white"
        >
          <Download className="h-[16px]" />
          Download PDF
        </button>
      </div>
    </div>
  )
}
