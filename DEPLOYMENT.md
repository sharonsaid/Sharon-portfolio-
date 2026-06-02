# Deployment Guide

## Backend on Render

1. Create a new Render Web Service.
2. Set the `Root Directory` to `portfolio-backend`.
3. Use these commands:
   - Build Command: `npm install`
   - Start Command: `npm start`
4. Deploy the service.

The backend service runs `portfolio-backend/index.js` and exposes `/api/profile`.

## Frontend on Vercel

1. Create a new Vercel project.
2. Point the project to this repository.
3. Set the `Root Directory` to `portfolio-frontend`.
4. Vercel will use `portfolio-frontend/vercel.json` for static deployment.

## Configure the frontend API URL

Open `portfolio-frontend/config.js` and replace the placeholder URL with your Render backend URL, for example:

```js
window.API_URL = "https://your-backend-name.onrender.com/api/profile";
```

Then redeploy the Vercel frontend.

## Notes

- `portfolio-frontend/script.js` now reads `window.API_URL` first.
- If `window.API_URL` is not updated, the frontend will still try `http://localhost:5000/api/profile`.
- The backend service and frontend service are separate, so both must be deployed independently.
