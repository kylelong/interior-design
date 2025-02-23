import ImageGenerator from './components/ImageGenerator'
import SlideShow from './components/SlideShow'
// https://www.guggenheim.org/
// https://www.asylum.vc/

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-3">
      {/* <ImageGenerator prompt="Modern living room with ocen views from backyard" /> */}
      <SlideShow />
    </main>
  )
}
