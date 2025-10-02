# Python Installation Guide

Since Python is not currently installed on your system, here are the installation steps:

## Option 1: Install Python from Python.org (Recommended)

1. **Download Python**
   - Go to https://www.python.org/downloads/
   - Download Python 3.11 or 3.12 (latest stable version)
   - **Important**: During installation, check "Add Python to PATH"

2. **Verify Installation**
   ```bash
   python --version
   pip --version
   ```

3. **Install Dependencies**
   ```bash
   cd electrical-machines-html
   pip install -r requirements.txt
   ```

4. **Run the Application**
   ```bash
   python app.py
   ```

## Option 2: Using Microsoft Store (Windows)

1. Open Microsoft Store
2. Search for "Python 3.11" or "Python 3.12"
3. Install the official Python package
4. Follow steps 2-4 from Option 1

## Option 3: Using Chocolatey (if you have it)

```bash
choco install python
```

## Option 4: Virtual Environment (Recommended for development)

After installing Python:

```bash
# Create virtual environment
python -m venv electrical_machines_env

# Activate it
# On Windows:
electrical_machines_env\Scripts\activate
# On macOS/Linux:
source electrical_machines_env/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run the app
python app.py
```

## Quick Start After Python Installation

1. Open PowerShell/Command Prompt
2. Navigate to the project folder:
   ```bash
   cd "C:\Users\mash9\Downloads\electrical-machines-html"
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Set up your API key in `.env` file
5. Run the application:
   ```bash
   python app.py
   ```
6. Open http://localhost:3000 in your browser

## Alternative: Run without Python Installation

If you prefer not to install Python, you can:

1. Use the TypeScript/React version in the `electrical-machines 1` folder
2. Use online Python environments like:
   - Replit
   - CodeSandbox
   - Gitpod

## Troubleshooting

- **"Python not found"**: Make sure Python is added to PATH during installation
- **"pip not found"**: Python installation should include pip automatically
- **Permission errors**: Try running PowerShell as Administrator
- **Module errors**: Make sure you're in the correct directory with `requirements.txt`