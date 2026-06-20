# Deployment Guide - Swiftinter Hosting

## Important: Build vs Deploy

This Next.js app needs to be **built on the server** or you need to deploy the build output. The `.next` folder is in `.gitignore` so it won't be in your Git repository.

## Option 1: Server-Side Build (Recommended)

If Swiftinter supports running build commands:

### 1. Configure Build Command
In your Swiftinter control panel, set the build command to:
```bash
npm install && npm run build:low-memory
```

### 2. Configure Start Command
Set the start command to:
```bash
npm start
```

### 3. Environment Variables
Make sure these are set in Swiftinter:
- `NODE_ENV=production`
- Your Sanity credentials (if needed)

---

## Option 2: Deploy Pre-Built Files (If No Build Support)

If Swiftinter doesn't support builds, you need to:

### 1. Build Locally
```bash
# Clean any dev files
rm -rf .next

# Build for production
npm run build:low-memory
```

### 2. Temporarily Include Build Files
Create a `.deployignore` or temporarily modify `.gitignore`:
```bash
# Comment out .next in .gitignore
# /.next/
```

### 3. Commit Build Files
```bash
git add .next
git commit -m "chore: add production build for deployment"
git push
```

### 4. After Deployment
Restore `.gitignore`:
```bash
# Uncomment /.next/ in .gitignore
/.next/
```

---

## Option 3: Use Standalone Build

The `output: 'standalone'` in next.config.ts creates a minimal deployment:

### 1. Build Locally
```bash
npm run build:low-memory
```

### 2. Deploy These Folders Only
- `.next/standalone/` - Minimal Node.js server
- `.next/static/` - Static assets
- `public/` - Public assets

### 3. On Server, Run
```bash
cd .next/standalone
node server.js
```

---

## Troubleshooting

### JavaScript files not loading (404 errors)

**Symptom:** Console shows:
```
Loading failed for webpack-xxx.js
Loading failed for 6717-xxx.js
```

**Cause:** Build files not on server

**Fix:**
1. Check if Swiftinter is running `npm run build`
2. Verify `.next/static/chunks/` exists on server
3. Check server logs for build errors

### Build fails with SIGKILL

**Cause:** Out of memory

**Fix:**
1. Use `npm run build:low-memory` (requires only 1GB RAM)
2. Contact Swiftinter about available RAM
3. Consider building locally and deploying files

### Sanity CMS not accessible

**Location:** Your studio is at `/sanitycms` not `/sanity`

**URL:** `https://stratfordhousedentalpractice.co.uk/sanitycms`

---

## Quick Diagnosis Commands

Run these on the server to diagnose:

```bash
# Check if build exists
ls -la .next/

# Check if static files exist
ls -la .next/static/chunks/

# Check available memory
free -h

# Check Node version
node --version

# Try building
npm run build:low-memory
```

---

## Recommended Swiftinter Configuration

**Build Command:**
```bash
npm install && npm run build:low-memory
```

**Start Command:**
```bash
npm start
```

**Node Version:** 18.x or 20.x

**Environment:** production

**Port:** 3000 (Next.js default)

---

## Contact Swiftinter Support

If builds keep failing, ask them:
1. How much RAM is allocated for builds?
2. Do they support running `npm run build`?
3. Can they increase build memory limits?
4. Do they have Node.js/Next.js specific hosting plans?

---

## Alternative: Use Vercel (Free Tier)

If Swiftinter doesn't support Next.js builds well:

1. Push code to GitHub
2. Import to Vercel: https://vercel.com/new
3. Vercel handles all builds automatically
4. Point your domain to Vercel

**Pros:** 
- Automatic builds
- Built-in CDN
- Zero config needed
- Free for personal projects

**Cons:**
- Need to update DNS
- Separate from Swiftinter
