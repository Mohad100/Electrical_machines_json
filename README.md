# Electrical Machines Course

A simple educational application built with **HTML, CSS, JavaScript, and Python Flask** for learning about electrical machines.

## Features

- 🎯 Interactive topic exploration (DC Motors, AC Motors, Transformers, Generators)
- 📝 Quiz functionality with instant feedback
- 📐 LaTeX formula rendering with KaTeX
- 🌙 Dark/Light theme support
- 📱 Fully responsive design

## Technologies Used

- **Frontend**: HTML, CSS, Vanilla JavaScript
- **Backend**: Python Flask
- **Math Rendering**: KaTeX
- **Styling**: Pure CSS with CSS Variables

## Prerequisites

- Python 3.8 or higher

## Installation & Setup

### 1. Clone/Download the project
```bash
git clone <repository-url>
cd electrical-machines-html
```

### 2. Create a virtual environment (recommended)
```bash
python -m venv venv

# On Windows
venv\Scripts\activate

# On macOS/Linux
source venv/bin/activate
```

### 3. Install Python dependencies
```bash
pip install -r requirements.txt
```

### 4. Set up environment variables (optional)
Create a `.env` file in the project root:
```env
PORT=3000
FLASK_ENV=development
```

### 5. Run the application
```bash
python app.py
```

The application will be available at `http://localhost:3000`

## Project Structure

```
electrical-machines-html/
├── app.py              # Flask backend server
├── index.html          # Main HTML file
├── styles.css          # CSS styling
├── script.js           # Frontend JavaScript
├── requirements.txt    # Python dependencies
├── .env               # Environment variables (optional)
└── README.md          # This file
```

## API Endpoints

- `GET /` - Serve the main application
- `GET /<filename>` - Serve static files

## Usage

1. **Start the application** and open it in your browser
2. **Explore topics** by clicking on the topic cards
3. **Take quizzes** to test your knowledge

## Features in Detail

### Topic Learning
- **DC Motors**: Principles, EMF equations, types, and torque calculations
- **AC Motors**: Rotating magnetic fields, synchronous/induction motors, slip
- **Transformers**: EMF equations, transformation ratios, efficiency
- **Generators**: Faraday's law, DC/AC generation, three-phase systems

### Interactive Quizzes
- Multiple choice questions
- Instant feedback
- Progress tracking
- Score calculation

## Deployment Options

### Local Development
```bash
python app.py
```

### Production with Gunicorn
```bash
gunicorn -w 4 -b 0.0.0.0:3000 app:app
```

## Contributing

Feel free to submit issues and enhancement requests!

## License

MIT License - feel free to use this project for educational purposes.