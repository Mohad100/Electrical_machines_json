from flask import Flask, send_from_directory, jsonify
from flask_cors import CORS
import os
from dotenv import load_dotenv
import logging

# Load environment variables
load_dotenv()

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/')
def index():
    """Serve the main HTML page"""
    return send_from_directory('.', 'index.html')

@app.route('/data/<path:filename>')
def serve_data(filename):
    """Serve JSON data files from data directory"""
    try:
        # Get the directory where app.py is located
        base_dir = os.path.dirname(os.path.abspath(__file__))
        data_dir = os.path.join(base_dir, 'data')
        
        # Check if file exists
        file_path = os.path.join(data_dir, filename)
        if not os.path.exists(file_path):
            logger.error(f"File not found: {file_path}")
            return jsonify({"error": "File not found"}), 404
        
        logger.info(f"Serving data file: {filename}")
        return send_from_directory(data_dir, filename)
    except Exception as e:
        logger.error(f"Error serving data file {filename}: {str(e)}")
        return jsonify({"error": str(e)}), 500

@app.route('/<path:filename>')
def static_files(filename):
    """Serve static files (CSS, JS, etc.)"""
    try:
        base_dir = os.path.dirname(os.path.abspath(__file__))
        file_path = os.path.join(base_dir, filename)
        
        if not os.path.exists(file_path):
            logger.error(f"File not found: {file_path}")
            return "File not found", 404
        
        return send_from_directory(base_dir, filename)
    except Exception as e:
        logger.error(f"Error serving file {filename}: {str(e)}")
        return "Internal server error", 500

@app.errorhandler(404)
def not_found(error):
    return "File not found", 404

@app.errorhandler(500)
def internal_error(error):
    return "Internal server error", 500

if __name__ == '__main__':
    port = int(os.getenv('PORT', 3000))
    debug = os.getenv('FLASK_ENV') == 'development'
    
    print(f"🚀 Server starting on http://localhost:{port}")
    print(f"📚 Electrical Machines Course Assistant is ready!")
    
    app.run(host='0.0.0.0', port=port, debug=debug)