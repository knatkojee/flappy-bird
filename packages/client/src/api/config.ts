export const BASE_URL =
  typeof window !== 'undefined' && (window as any).VITE_API_URL
    ? (window as any).VITE_API_URL
    : process.env.VITE_API_URL || 'http://localhost:3001/api'
