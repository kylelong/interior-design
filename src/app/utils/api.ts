export async function fetchPhotos() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/designs`,
    )
    if (!response.ok) {
      throw new Error('Failed to fetch photos')
    }
    return await response.json()
  } catch (err) {
    console.log(err)
    return []
  }
}
