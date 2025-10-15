export default async function ArchiveSymmary({
  title,
  dataLength = 0,
}: {
  title: string
  dataLength: number | undefined
}) {
  return (
    <div
      className="mb-3 shadow w-full rounded-lg border
            border-slate-200 hover:border-blue-400 bg-white py-2 px-4 
            cursor-pointer flex items-center 
              gap-3 justify-between transition-all duration-300"
    >
      <h2 className="text-slate-500 uppercase text-[15px]">{title}</h2>
      <h4 className="text-2xl">{dataLength}</h4>
    </div>
  )
}
