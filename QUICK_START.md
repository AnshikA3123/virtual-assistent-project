# Quick Start Deployment Guide

## 🚀 Deploy Your Virtual Assistant App in 3 Steps

### Step 1: Deploy Backend (5 minutes)

1. **Go to Render.com** and sign up/login
2. **Click "New +" → "Web Service"**
3. **Connect your GitHub repository**
4. **Configure:**
   - **Name**: `virtual-assistant-backend`
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Environment**: `Node`

5. **Add Environment Variables** (click "Add Environment Variable" for each):
   ```
   NODE_ENV = production
   PORT = 10000
   FRONTEND_URL = https://YOUR_USERNAME.github.io/virtual-assistent-project
   MONGODB_URI = your_mongodb_connection_string
   JWT_SECRET = your_secret_key_here
   CLOUDINARY_CLOUD_NAME = your_cloudinary_name
   CLOUDINARY_API_KEY = your_cloudinary_key
   CLOUDINARY_API_SECRET = your_cloudinary_secret
   GEMINI_API_KEY = your_gemini_key
   ```

6. **Click "Create Web Service"** and wait for deployment
7. **Copy your backend URL** (e.g., `https://virtual-assistant-backend.onrender.com`)

### Step 2: Configure Frontend (2 minutes)

1. **Go to your GitHub repository**
2. **Settings** → **Secrets and variables** → **Actions**
3. **Click "New repository secret"**
4. **Add:**
   - **Name**: `VITE_API_URL`
   - **Value**: Your backend URL from Step 1 (e.g., `https://virtual-assistant-backend.onrender.com`)
5. **Click "Add secret"**

### Step 3: Deploy Frontend (Automatic!)

1. **Go to Settings** → **Pages**
2. **Under "Source"**, select **"GitHub Actions"**
3. **Push any change to main branch** (or the workflow will run automatically)
4. **Wait 2-3 minutes** for deployment
5. **Your app will be live at**: `https://YOUR_USERNAME.github.io/virtual-assistent-project`

### ✅ Done!

Your full-stack app is now live and accessible to everyone!

## 🔧 Update Backend CORS After Frontend is Live

Once your frontend is deployed, update the `FRONTEND_URL` in Render:
- Go to your Render service → Environment
- Update `FRONTEND_URL` to: `https://YOUR_USERNAME.github.io`
- Save and redeploy

## 🐛 Troubleshooting

- **404 Error**: Make sure GitHub Pages source is set to "GitHub Actions"
- **CORS Error**: Update `FRONTEND_URL` in backend to match your GitHub Pages URL
- **Build Fails**: Check that `VITE_API_URL` secret is set correctly

## 📝 Need Help?

Check `DEPLOYMENT.md` for detailed instructions.

