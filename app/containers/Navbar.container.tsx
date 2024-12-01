import { Button } from "@/components"
import { useFetchStore } from "@/context/firstStore"

export const Navbar = () => {
  const setFetch = useFetchStore((action) => (action.setFetch))

  const showContent = () => {
    setFetch(true);
  }
  return (
    <>
      <nav className="fixed flex items-center justify-start w-full gap-4 p-2 bg-bg-color backdrop-blur-sm">
        <h1 className='p-2 text-xl font-black'>Bienvenido a BiblioStream</h1>
        <Button className="p-2 font-bold text-black bg-gray-400 border border-white rounded-lg" parentMethod={showContent}>Show</Button>
      </nav>
    </>
  )
}