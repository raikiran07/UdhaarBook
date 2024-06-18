import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'
// load environment variables from .env files

dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
})
