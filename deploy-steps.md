# 🚀 Deploy HomeChef Backend to Render

## Step 1: Push to GitHub
After creating a GitHub repository named "homechef-backend":

```bash
# Add your GitHub repository (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/homechef-backend.git
git push -u origin main
```

## Step 2: Deploy to Render
1. Go to [render.com](https://render.com) and sign up/login
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub account
4. Select your `homechef-backend` repository
5. Configure settings:
   - **Name**: `homechef-api`
   - **Environment**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Instance Type**: `Free`

## Step 3: Add Environment Variables
In Render's Environment Variables section:

```
NODE_ENV=production
PORT=10000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/homechef
JWT_SECRET=your-super-secret-jwt-key-minimum-32-characters
CORS_ORIGIN=https://expo.dev
```

## Step 4: Create MongoDB Database
1. Go to [MongoDB Atlas](https://cloud.mongodb.com/)
2. Create free account
3. Create cluster (free tier)
4. Create database user
5. Copy connection string to Render environment variables

## Step 5: Test Your API
Your API will be live at: `https://homechef-api.onrender.com`

Test endpoints:
- `GET https://homechef-api.onrender.com/health`
- `POST https://homechef-api.onrender.com/api/auth/login`

## Result 🎉
✅ Backend deployed and live!
✅ Mobile app already configured
✅ Ready for testing! 