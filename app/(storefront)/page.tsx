import { Hero, PopularMedia } from "@components";

export default function Home() {
  return (
    <main className='flex flex-col h-screen gap-2'>
      <Hero media='all' />
      <PopularMedia />
    </main>
  )
}
