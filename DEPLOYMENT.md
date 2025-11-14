# Deployment Guide

This guide will help you deploy both the frontend and backend of your Virtual Assistant application.

## Backend Deployment (Render/Railway)

### Option 1: Deploy to Render (Recommended)

1. **Create a Render account** at https://render.com
2. **Create a new Web Service**:
   - Connect your GitHub repository
   - Root Directory: `backend`
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Environment: `Node`

3. **Set Environment Variables** in Render dashboard:
   ```
   NODE_ENV=production
   PORT=10000
   FRONTEND_URL=https://yourusername.github.io/virtual-assistent-project
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   GEMINI_API_KEY=your_gemini_api_key
   ```

4. **Deploy** - Render will automatically deploy your backend
5. **Copy the backend URL** (e.g., `https://virtual-assistant-backend.onrender.com`)

### Option 2: Deploy to Railway

1. **Create a Railway account** at https://railway.app
2. **Create a new project** and connect your GitHub repo
3. **Add a new service** and select your repository
4. **Configure the service**:
   - Root Directory: `backend`
   - Build Command: `npm install`
   - Start Command: `npm start`

5. **Set Environment Variables** (same as Render above)
6. **Deploy** and copy the backend URL

## Frontend Deployment (GitHub Pages)

### Step 1: Set GitHub Secrets

1. Go to your GitHub repository
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Add a new secret:
   - Name: `VITE_API_URL`
   - Value: Your backend URL from Render/Railway (e.g., `https://virtual-assistant-backend.onrender.com`)

### Step 2: Enable GitHub Pages

1. Go to **Settings** → **Pages**
2. Under **Source**, select **GitHub Actions**
3. The workflow will automatically deploy on push to `main` branch

### Step 3: Update Backend CORS

After getting your GitHub Pages URL, update the `FRONTEND_URL` environment variable in your backend deployment:
```
FRONTEND_URL=https://yourusername.github.io
```

## Local Development

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Backend
```bash
cd backend
npm install
npm run dev
```

Create a `.env` file in the backend directory:
```
PORT=8000
FRONTEND_URL=http://localhost:5173
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
GEMINI_API_KEY=your_gemini_api_key
```

## Troubleshooting

- **CORS Errors**: Make sure `FRONTEND_URL` in backend matches your frontend URL exactly
- **Build Fails**: Check that all environment variables are set correctly
- **404 on GitHub Pages**: Ensure the repository name in `vite.config.js` matches your GitHub repo name

