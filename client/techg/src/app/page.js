export default function Home() {
  console.log(process.env.NEXT_PUBLIC_API_BASE_URL)
  return (
    <div className="h-[100vh] flex justify-center items-center">
      <h1 className="text-[2.5em]">
        Content Comming Soon...
      </h1>
    </div>
  )
}
