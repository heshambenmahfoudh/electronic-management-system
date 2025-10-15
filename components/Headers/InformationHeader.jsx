
export default function InformationHeader ({data,fixedSize}) {
  return (
   <div className={`  p-2 rounded-t-lg  
      flex ${fixedSize} bg-blue-300  
     justify-between items-center gap-1 sticky top-0  text-center `}>
     { data?.map(({ text, size }) => (
         <h2 key={ text } className={` text-center font-medium sms:text-13 text-14 uppercase ${size}`}>
            {text}
          </h2>
     ))}
   </div>
  )
}

