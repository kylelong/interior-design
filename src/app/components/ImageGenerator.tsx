import Image from 'next/image'
import { fal } from '@fal-ai/client'

fal.config({
  proxyUrl: '/api/fal/proxy',
})

export default async function ImageGenerator({ prompt }: { prompt: string }) {
  if (!prompt) {
    return <p>Prompt is required to generate an image.</p>
  }

  try {
    const result = await fal.subscribe('fal-ai/recraft-v3', {
      input: {
        prompt: prompt,
        image_size: 'square_hd',
        style: 'realistic_image',
        style_id: '389a2206-9ea8-4ce5-8c41-0f1e16231666',
      },
      pollInterval: 1000,
      logs: true,
      onQueueUpdate(update) {
        console.log('queue update', update, prompt)
      },
    })

    // Ensure that result.data.images is not empty
    const imageUrl = result.data?.images?.[0]?.url || '' // Default to empty string if not found
    // const imageUrl =
    //   'https://v3.fal.media/files/zebra/NB5ktV2brNMcava-gfjvR_image.webp'

    if (!imageUrl) {
      return <p>Failed to generate image. No image URL found.</p>
    }

    return (
      <div className="flex flex-col items-center space-y-4">
        <h2 className="text-xl font-bold">Generated Image</h2>
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt="Generated Image"
            width={512}
            height={512}
            className="rounded-lg shadow-lg"
          />
        ) : (
          <p>
            Failed to generate image. Please check your prompt or try again
            later.
          </p>
        )}
      </div>
    )
  } catch (error) {
    console.error('Error generating image:', error)
    return <p>Error generating image. Please try again later.</p>
  }
}
