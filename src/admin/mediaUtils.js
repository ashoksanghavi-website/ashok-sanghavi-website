// Read an image File, downscale it in the browser, and return a compact payload
// ready to POST to /api/media. Keeping the heavy lifting client-side means the
// database only ever stores small, web-ready images (fast + free).
export async function fileToUpload(file, { maxDim = 1600, quality = 0.85 } = {}) {
  if (!file.type.startsWith('image/')) throw new Error('Please choose an image file')

  const dataUrl = await new Promise((res, rej) => {
    const r = new FileReader()
    r.onload = () => res(r.result)
    r.onerror = () => rej(new Error('Could not read the file'))
    r.readAsDataURL(file)
  })

  const img = await new Promise((res, rej) => {
    const i = new Image()
    i.onload = () => res(i)
    i.onerror = () => rej(new Error('Could not load the image'))
    i.src = dataUrl
  })

  const scale = Math.min(1, maxDim / Math.max(img.width, img.height))
  const w = Math.max(1, Math.round(img.width * scale))
  const h = Math.max(1, Math.round(img.height * scale))

  const canvas = document.createElement('canvas')
  canvas.width = w
  canvas.height = h
  const ctx = canvas.getContext('2d')
  ctx.drawImage(img, 0, 0, w, h)

  // Prefer WebP (small, keeps transparency); fall back to JPEG if unsupported.
  let out = canvas.toDataURL('image/webp', quality)
  if (!out.startsWith('data:image/webp')) out = canvas.toDataURL('image/jpeg', quality)

  const m = out.match(/^data:([^;]+);base64,(.*)$/)
  const mime = m[1]
  const ext = mime === 'image/webp' ? '.webp' : '.jpg'
  const base = (file.name || 'image').replace(/\.[^.]+$/, '')
  return { filename: `${base}${ext}`, mime, data: m[2], dataUrl: out }
}
