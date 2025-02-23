import ImageGenerator from './components/ImageGenerator'

export default function Home() {
  const getPhotos = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/designs`,
      )

      const data = await response.json()
      if (response.ok) {
        console.log(data)
      } else {
        throw new Error('No photos')
      }
    } catch (err) {
      console.log(err)
      return []
    }
  }
  getPhotos()
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-10">
      <h1 className="mb-6 text-2xl font-bold">AI Image Generator</h1>
      {/* <ImageGenerator prompt="Modern living room with ocen views from backyard" /> */}
    </main>
  )
}
