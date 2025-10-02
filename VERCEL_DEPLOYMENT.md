# Electrical Machines Educational Web App - Deployment Guide

## 📦 Files to Upload to Vercel

### Required Files:
1. **`index.html`** - Main HTML page
2. **`script.js`** - JavaScript application logic with all topics
3. **`styles.css`** - Main stylesheet
4. **`quiz-styles.css`** - Quiz and exercise specific styles
5. **`app.py`** - Flask backend server
6. **`requirements.txt`** - Python dependencies
7. **`vercel.json`** - Vercel configuration
8. **`.vercelignore`** - Files to exclude from deployment

### Optional Files:
- **`README.md`** - This documentation file

## 🚀 Deployment Steps

### Method 1: Deploy via Vercel CLI

1. **Install Vercel CLI** (if not already installed):
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy from project directory**:
   ```bash
   cd c:\Users\mash9\Downloads\electrical-machines-html
   vercel
   ```

4. **Follow the prompts**:
   - Set up and deploy? Yes
   - Which scope? (Select your account)
   - Link to existing project? No
   - Project name? (e.g., electrical-machines)
   - Directory? ./ (current directory)
   - Override settings? No

5. **Deploy to production**:
   ```bash
   vercel --prod
   ```

### Method 2: Deploy via Vercel Web Interface

1. **Create a Git repository** (GitHub recommended):
   ```bash
   cd c:\Users\mash9\Downloads\electrical-machines-html
   git init
   git add index.html script.js styles.css quiz-styles.css app.py requirements.txt vercel.json .vercelignore
   git commit -m "Initial commit - Electrical Machines App"
   ```

2. **Push to GitHub**:
   - Create a new repository on GitHub
   - Follow GitHub's instructions to push your local repo

3. **Import to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your GitHub repository
   - Vercel will automatically detect the configuration from `vercel.json`
   - Click "Deploy"

## 📋 Essential Files Checklist

Before deploying, ensure these files exist:

- ✅ `index.html` (126 lines) - Main page with 6 topic cards
- ✅ `script.js` (1400+ lines) - All educational content and logic
- ✅ `styles.css` (600+ lines) - Main styling
- ✅ `quiz-styles.css` (175+ lines) - Quiz/exercise styling
- ✅ `app.py` (42 lines) - Flask server
- ✅ `requirements.txt` (4 packages) - Python dependencies
- ✅ `vercel.json` (NEW) - Vercel configuration
- ✅ `.vercelignore` (NEW) - Excluded files

## 🌐 After Deployment

Your app will be available at:
- **Development**: `https://your-project.vercel.app`
- **Production**: `https://your-project-name.vercel.app`

## 🔧 Troubleshooting

If deployment fails:

1. **Check Python version**: Vercel uses Python 3.9+ by default
2. **Verify requirements.txt**: Ensure all dependencies are listed
3. **Check logs**: View deployment logs in Vercel dashboard
4. **Test locally**: Run `python app.py` to verify it works locally

## 📝 Topics Included

1. DC Motors
2. AC Motors  
3. Transformers
4. Practical Transformers
5. Three-Phase Transformers
6. Generators

Each topic includes:
- ✅ Detailed explanations with LaTeX math formulas
- ✅ Interactive quizzes with immediate feedback
- ✅ Practice exercises with step-by-step solutions
- ✅ Dark/Light theme toggle
- ✅ Responsive design

## 🎨 Features

- **No AI dependencies** - Runs completely standalone
- **KaTeX rendering** - Professional mathematical formulas
- **Responsive design** - Works on desktop, tablet, mobile
- **Theme switching** - Dark and light modes
- **Instant feedback** - Quiz answers with explanations
- **Step-by-step solutions** - Detailed exercise walkthroughs

---

**Ready to deploy!** 🚀
