# 🔧 Render Environment Variables Setup

Your backend is deployed but needs environment variables configured. Follow these steps:

## Step 1: Go to Render Dashboard

1. Go to https://dashboard.render.com
2. Click on your service: **virtual-assistant-backend** (or whatever you named it)
3. Click on **"Environment"** in the left sidebar

## Step 2: Add These Environment Variables

Click **"Add Environment Variable"** for each of these:

### Required Variables:

1. **MONGODB_URI**
   - **Value**: Your MongoDB connection string
   - **Example**: `mongodb+srv://username:password@cluster.mongodb.net/dbname?retryWrites=true&w=majority`
   - **How to get**: 
     - If using MongoDB Atlas: Go to your cluster → Connect → Connect your application → Copy connection string
     - Replace `<password>` with your actual password
     - Replace `<dbname>` with your database name

2. **JWT_SECRET**
   - **Value**: Any random long string (used for signing tokens)
   - **Example**: `your-super-secret-jwt-key-12345-abcdef`
   - **Tip**: Use a long random string, you can generate one at https://randomkeygen.com

3. **CLOUDINARY_CLOUD_NAME**
   - **Value**: Your Cloudinary cloud name
   - **How to get**: Go to https://cloudinary.com → Dashboard → Copy "Cloud name"

4. **CLOUDINARY_API_KEY**
   - **Value**: Your Cloudinary API key
   - **How to get**: Cloudinary Dashboard → Copy "API Key"

5. **CLOUDINARY_API_SECRET**
   - **Value**: Your Cloudinary API secret
   - **How to get**: Cloudinary Dashboard → Click "Reveal" next to API Secret → Copy

6. **GEMINI_API_KEY**
   - **Value**: Your Google Gemini API key
   - **How to get**: 
     - Go to https://aistudio.google.com/app/apikey
     - Create a new API key
     - Copy the key

7. **GEMINI_API_URL** (Optional - has default)
   - **Value**: `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=`
   - **Note**: Usually not needed, the default works

8. **FRONTEND_URL**
   - **Value**: Your GitHub Pages URL (once frontend is deployed)
   - **Example**: `https://AnshikA3123.github.io/virtual-assistent-project`
   - **Note**: Update this after frontend is deployed, or use `http://localhost:5173` for now

9. **NODE_ENV** (Optional but recommended)
   - **Value**: `production`

10. **PORT** (Optional - Render sets this automatically)
    - **Value**: `10000` (or leave Render's default)

## Step 3: Save and Redeploy

1. After adding all variables, click **"Save Changes"**
2. Render will automatically redeploy your service
3. Wait 2-3 minutes for deployment to complete
4. Check the logs to see "db connected" message

## ✅ Verification

Once deployed, you should see in the logs:
```
Server Started
db connected
```

If you see errors, check:
- MongoDB URI is correct and accessible
- All environment variables are set (no typos)
- Database user has proper permissions

## 🚨 Common Issues

**"MongoDB URI is not defined"**
- Make sure `MONGODB_URI` is set (not `MONGODB_URL`)

**"db connected" not appearing**
- Check MongoDB connection string is correct
- Verify network access in MongoDB Atlas (add Render IP or allow all IPs: 0.0.0.0/0)

**"JWT_SECRET is not defined"**
- Make sure `JWT_SECRET` is set

**Cloudinary errors**
- Verify all three Cloudinary variables are set correctly

---

**After setting these, your backend will be fully functional!** 🎉

