/* eslint-disable @typescript-eslint/no-explicit-any */

export async function makePostRequestImageUrl(
  e: any,
  setIsLoadingImageUrl: any,
) {
  try {
    setIsLoadingImageUrl(true)
    const data = new FormData()
    data.append('file', e.target?.files[0])
    data.append('upload_preset', 'electronicPreset')
    if (e.target?.files[0]) {
      const response: any = await fetch(
        `https://api.cloudinary.com/v1_1/electronicmanagement/image/upload`,
        {
          method: 'POST',
          body: data,
        },
      )
      const result = await response.json()
      if (response.ok) {
        setIsLoadingImageUrl(false)
        return { data: result.secure_url, status: 200 }
      }else{
        setIsLoadingImageUrl(false)
      }
    }
  } catch (error) {
    setIsLoadingImageUrl(false)
    return { data: null, status: 500 }
  }
}
