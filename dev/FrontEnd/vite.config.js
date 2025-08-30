import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    'import.meta.env.VITE_FIREBASE_API_KEY': JSON.stringify("AIzaSyCjPKMwzZTLZHxM_vGKvg5fsOnwT3a7mEM"),
    'import.meta.env.VITE_FIREBASE_AUTH_DOMAIN': JSON.stringify("momentum-ab390.firebaseapp.com"),
    'import.meta.env.VITE_FIREBASE_PROJECT_ID': JSON.stringify("momentum-ab390"),
    'import.meta.env.VITE_FIREBASE_STORAGE_BUCKET': JSON.stringify("momentum-ab390.firebasestorage.app"),
    'import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID': JSON.stringify("232640338800"),
    'import.meta.env.VITE_FIREBASE_APP_ID': JSON.stringify("1:232640338800:web:a082a82f842f79650b8db5"),
    'import.meta.env.VITE_FIREBASE_MEASUREMENT_ID': JSON.stringify("G-Q3KZG70H8C"),
    'import.meta.env.VITE_APP_SECRET': JSON.stringify("MomentumAppSecret")
  }
})


// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })
