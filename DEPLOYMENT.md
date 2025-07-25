# HomeChef Backend Deployment Guide

## 🚀 Deploy to Render (Recommended)

### Step 1: Create MongoDB Atlas Database (Free)

1. Go to [MongoDB Atlas](https://cloud.mongodb.com/)
2. Sign up for a free account
3. Create a new cluster (select the free tier)
4. Create a database user with username/password
5. Add `0.0.0.0/0` to IP whitelist (allows all IPs)
6. Get your connection string: `mongodb+srv://username:password@cluster.mongodb.net/homechef`

### Step 2: Deploy to Render

1. Go to [Render](https://render.com/) and sign up
2. Connect your GitHub account
3. Push this backend code to a GitHub repository
4. In Render dashboard, click "New +" → "Web Service"
5. Connect your GitHub repository
6. Use these settings:
   - **Name**: homechef-api
   - **Environment**: Node
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Plan**: Free

### Step 3: Configure Environment Variables

In Render's Environment Variables section, add:

```
NODE_ENV=production
PORT=10000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/homechef
JWT_SECRET=your-super-secret-jwt-key-here-min-32-chars
CORS_ORIGIN=https://expo.dev
```

### Step 4: Deploy

Click "Deploy" and wait for deployment to complete. Your API will be available at:
`https://homechef-api.onrender.com`

### Step 5: Test the API

Test these endpoints:
- `GET https://homechef-api.onrender.com/health`
- `POST https://homechef-api.onrender.com/api/auth/login`

## 🔧 Alternative: Railway Deployment

If you prefer Railway:

1. Install Railway CLI: `npm install -g @railway/cli`
2. Login: `railway login`
3. Initialize: `railway init`
4. Add MongoDB: `railway add -d mongodb`
5. Deploy: `railway up`

## 📱 Update Mobile App

Once deployed, update the API URL in your mobile app:

1. Edit `HomeChefApp/config/api.ts`
2. Update the production API URL to your deployed backend
3. Run `npx eas update --auto` to push the update

## ⚠️ Important Notes

- **Free Tier Limitations**: Render free tier may spin down after 15 minutes of inactivity
- **Cold Starts**: First request after inactivity may take 30+ seconds
- **MongoDB Atlas**: Free tier includes 512MB storage
- **Environment Variables**: Never commit secrets to GitHub

## 🎯 Production Checklist

- [ ] MongoDB Atlas database created
- [ ] Environment variables configured
- [ ] Backend deployed successfully
- [ ] API endpoints tested
- [ ] Mobile app updated with production API URL
- [ ] EAS update published

Your backend will be live and ready for testing! 🎉 