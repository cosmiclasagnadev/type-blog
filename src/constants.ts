export const url = process.env.NEXT_PUBLIC_VERCEL_URL
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api/trpc`
  : "http://localhost:3000/api/trpc";
// we set the url of the trpc server based on if we are in production or not
// of course -- we are going to deploy to vercel so we are able to use the NEXT_PUBLIC_VERCEL_URL env variable above...
