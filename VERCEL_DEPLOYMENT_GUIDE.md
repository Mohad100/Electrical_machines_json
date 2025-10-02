# 🚀 Vercel Deployment Guide - Electrical Machines Course

## ✅ Pre-Deployment Checklist

### Required Files in Your Project:
- ✅ `index.html` - Main HTML file
- ✅ `styles.css` - Main stylesheet
- ✅ `quiz-styles.css` - Quiz specific styles
- ✅ `script.js` - Main JavaScript file
- ✅ `app.py` - Flask backend (for local testing)
- ✅ `api/index.py` - Vercel serverless function
- ✅ `requirements.txt` - Python dependencies
- ✅ `vercel.json` - Vercel configuration
- ✅ `.vercelignore` - Files to exclude from deployment
- ✅ `data/` directory with all JSON files:
  - `topics.json`
  - `dc-motors.json`
  - `ac-motors.json`
  - `transformers.json`
  - `practical-transformers.json`
  - `three-phase-transformers.json`
  - `generators.json`

---

## 🔧 Configuration Files

### 1. `vercel.json`
```json
{
  "version": 2,
  "builds": [
    {
      "src": "api/index.py",
      "use": "@vercel/python"
    }
  ],
  "routes": [
    {
      "src": "/data/(.*)",
      "dest": "/api/index.py"
    },
    {
      "src": "/(.*\\.(css|js|html))",
      "dest": "/api/index.py"
    },
    {
      "src": "/(.*)",
      "dest": "/api/index.py"
    }
  ],
  "outputDirectory": ".",
  "installCommand": "pip install -r requirements.txt"
}
```

### 2. `requirements.txt`
```
flask==3.0.3
flask-cors==4.0.1
python-dotenv==1.0.1
gunicorn==21.2.0
```

### 3. `.vercelignore`
```
venv/
__pycache__/
*.pyc
.env
.vscode/
.git/
*.backup
python-backend/
PYTHON_SETUP.md
```

---

## 📦 Deployment Methods

### Method 1: Deploy via Vercel CLI (Recommended)

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel:**
   ```bash
   vercel login
   ```

3. **Deploy from project directory:**
   ```bash
   cd electrical-machines-html
   vercel
   ```

4. **Follow the prompts:**
   - Set up and deploy? **Yes**
   - Which scope? **Select your account**
   - Link to existing project? **No**
   - What's your project's name? **electrical-machines-course**
   - In which directory is your code located? **./** (current directory)

5. **Deploy to production:**
   ```bash
   vercel --prod
   ```

### Method 2: Deploy via Vercel Dashboard (Web UI)

1. **Go to:** https://vercel.com/new

2. **Import Git Repository:**
   - Connect your GitHub/GitLab/Bitbucket
   - Select the repository
   - Click "Import"

3. **Configure Project:**
   - **Framework Preset:** Other
   - **Root Directory:** ./
   - **Build Command:** Leave empty
   - **Output Directory:** Leave empty
   - **Install Command:** `pip install -r requirements.txt`

4. **Deploy:**
   - Click "Deploy"
   - Wait for deployment to complete

### Method 3: Manual Upload (No Git)

1. **Zip your project:**
   - Select all files EXCEPT: `venv/`, `__pycache__/`, `.git/`, `*.backup`
   - Create a zip file

2. **Upload to Vercel:**
   - Go to https://vercel.com/new
   - Click "Browse" and select your zip file
   - Configure as in Method 2
   - Click "Deploy"

---

## 🐛 Troubleshooting Common Issues

### Issue 1: "Error loading topic data"

**Cause:** JSON files not being served correctly

**Solution:**
1. Check that `data/` directory exists with all JSON files
2. Verify `api/index.py` has correct path handling
3. Check browser console for specific error messages
4. Ensure `vercel.json` routes include `/data/(.*)` 

**Test locally first:**
```bash
python app.py
# Open http://localhost:3000
# Check if all topics load correctly
```

### Issue 2: "404 Not Found" for JSON files

**Cause:** Routing issue in Vercel

**Solution:**
1. Check `vercel.json` routes order (most specific first)
2. Ensure `api/index.py` has the `serve_data` function
3. Check file paths are relative to project root

### Issue 3: "500 Internal Server Error"

**Cause:** Python dependencies or code errors

**Solution:**
1. Check Vercel deployment logs:
   ```bash
   vercel logs
   ```
2. Verify all dependencies in `requirements.txt`
3. Check Python version compatibility (Vercel uses Python 3.9+)

### Issue 4: Static files not loading (CSS/JS)

**Cause:** Incorrect MIME types or routing

**Solution:**
1. Verify `api/index.py` serves static files correctly
2. Check browser Network tab for 404s
3. Ensure file paths don't have typos

### Issue 5: CORS errors

**Cause:** Cross-Origin Request issues

**Solution:**
1. Ensure `flask-cors` is in `requirements.txt`
2. Check `CORS(app)` is called in `api/index.py`
3. Add specific origins if needed:
   ```python
   CORS(app, resources={r"/*": {"origins": "*"}})
   ```

---

## 🔍 Testing Your Deployment

### 1. Test Main Page
```
https://your-project.vercel.app/
```
Should load the hero section with all 6 topic cards.

### 2. Test JSON Loading
```
https://your-project.vercel.app/data/topics.json
```
Should return the topics index JSON.

### 3. Test Individual Topics
```
https://your-project.vercel.app/data/dc-motors.json
```
Should return the DC Motors topic data.

### 4. Test Topic Selection
- Click "Learn" button on any topic
- Should load explanation content
- Check browser console for errors

### 5. Test Quiz and Exercises
- Click "Quiz" or "Practice" buttons
- Should load questions/problems
- Math formulas should render correctly

---

## 📊 Vercel Dashboard Monitoring

### Check Deployment Status:
1. Go to https://vercel.com/dashboard
2. Select your project
3. Check "Deployments" tab
4. Click on deployment to see logs

### View Logs:
```bash
vercel logs [deployment-url]
```

### View Environment Variables:
```bash
vercel env ls
```

---

## 🎯 Performance Optimization

### 1. Enable Caching
Add to `vercel.json`:
```json
{
  "headers": [
    {
      "source": "/data/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=3600, s-maxage=3600"
        }
      ]
    }
  ]
}
```

### 2. Compression
Vercel automatically compresses responses, but ensure:
- JSON files are minified
- CSS/JS are minified in production

---

## 🔄 Updating Your Deployment

### Update via CLI:
```bash
cd electrical-machines-html
vercel --prod
```

### Update via Git:
1. Push changes to your repository
2. Vercel auto-deploys from main branch

### Rollback if needed:
```bash
vercel rollback
```

---

## 📝 Custom Domain (Optional)

### Add Custom Domain:
1. Go to Project Settings → Domains
2. Add your domain
3. Configure DNS records as shown
4. Wait for DNS propagation

---

## ✅ Final Checklist Before Deployment

- [ ] All JSON files in `data/` directory
- [ ] `requirements.txt` has all dependencies
- [ ] `vercel.json` properly configured
- [ ] `api/index.py` has correct path handling
- [ ] Local testing successful (`python app.py`)
- [ ] No sensitive data in repository
- [ ] `.vercelignore` excludes unnecessary files
- [ ] All topic cards work locally
- [ ] Quizzes and exercises load correctly
- [ ] Math formulas render properly

---

## 🆘 Need Help?

### Common Commands:
```bash
# Check deployment status
vercel ls

# View project info
vercel inspect

# View logs
vercel logs

# Remove deployment
vercel remove [deployment-url]
```

### Vercel Documentation:
- Python on Vercel: https://vercel.com/docs/functions/serverless-functions/runtimes/python
- Configuration: https://vercel.com/docs/projects/project-configuration

### Support:
- Vercel Support: https://vercel.com/support
- Community: https://github.com/vercel/vercel/discussions

---

## 🎉 Success!

Once deployed, your application will be available at:
```
https://your-project-name.vercel.app
```

Share this link with your users and enjoy your deployed Electrical Machines Course! ⚡📚
