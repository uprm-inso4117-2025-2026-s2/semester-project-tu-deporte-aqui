import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Tu Deporte",
    short_name: "Tu Deporte",
    icons: [
      {
        src: "/icons/web-app-manifest-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any"
      },
      {
        src: "/icons/web-app-manifest-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any"
      }
    ],
    screenshots: [
      {
        "src": "/screenshots/black.jpg",
        "sizes": "1280x720",
        "type": "image/jpg",
        "form_factor": "wide"
      },
      {
        "src": "/screenshots/black.jpg",
        "sizes": "1280x720",
        "type": "image/jpg",
      }
    ],
    theme_color: "#ffffff",
    background_color: "#ffffff",
    display: "standalone",
    start_url: "/"
  }
}