from flask import Flask, Response
import os
import json

app = Flask(__name__)

# Get base directory (parent of api directory)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

def add_cors_headers(response):
    """Add CORS headers to response"""
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
    return response

@app.route('/')
def index():
    """Serve the main HTML page"""
    try:
        html_path = os.path.join(BASE_DIR, 'index.html')
        with open(html_path, 'r', encoding='utf-8') as f:
            content = f.read()
        response = Response(content, mimetype='text/html')
        return add_cors_headers(response)
    except Exception as e:
        error_response = Response(
            json.dumps({"error": f"Error loading index: {str(e)}"}),
            status=500,
            mimetype='application/json'
        )
        return add_cors_headers(error_response)

@app.route('/data/<path:filename>')
def serve_data(filename):
    """Serve JSON data files from data directory"""
    try:
        data_dir = os.path.join(BASE_DIR, 'data')
        file_path = os.path.join(data_dir, filename)
        
        print(f"[DEBUG] Attempting to load: {file_path}")
        print(f"[DEBUG] BASE_DIR: {BASE_DIR}")
        print(f"[DEBUG] Data dir: {data_dir}")
        print(f"[DEBUG] File exists: {os.path.exists(file_path)}")
        
        if not os.path.exists(data_dir):
            print(f"[ERROR] Data directory does not exist: {data_dir}")
            error_response = Response(
                json.dumps({"error": f"Data directory not found"}),
                status=500,
                mimetype='application/json'
            )
            return add_cors_headers(error_response)
        
        print(f"[DEBUG] Files in data dir: {os.listdir(data_dir)}")
        
        if not os.path.exists(file_path):
            print(f"[ERROR] File not found: {filename}")
            error_response = Response(
                json.dumps({"error": f"File not found: {filename}"}),
                status=404,
                mimetype='application/json'
            )
            return add_cors_headers(error_response)
        
        with open(file_path, 'r', encoding='utf-8') as f:
            data = json.load(f)
        
        print(f"[SUCCESS] Loaded {filename} successfully")
        response = Response(
            json.dumps(data),
            mimetype='application/json'
        )
        return add_cors_headers(response)
        
    except Exception as e:
        print(f"[ERROR] Exception loading {filename}: {str(e)}")
        import traceback
        traceback.print_exc()
        error_response = Response(
            json.dumps({"error": str(e)}),
            status=500,
            mimetype='application/json'
        )
        return add_cors_headers(error_response)

@app.route('/<path:filename>')
def static_files(filename):
    """Serve static files (CSS, JS, etc.)"""
    try:
        file_path = os.path.join(BASE_DIR, filename)
        
        if not os.path.exists(file_path):
            error_response = Response(
                json.dumps({"error": "File not found"}),
                status=404,
                mimetype='application/json'
            )
            return add_cors_headers(error_response)
        
        # Determine mimetype
        mimetype = 'text/plain'
        if filename.endswith('.css'):
            mimetype = 'text/css'
        elif filename.endswith('.js'):
            mimetype = 'application/javascript'
        elif filename.endswith('.html'):
            mimetype = 'text/html'
        elif filename.endswith('.json'):
            mimetype = 'application/json'
        
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        response = Response(content, mimetype=mimetype)
        return add_cors_headers(response)
        
    except Exception as e:
        error_response = Response(
            json.dumps({"error": str(e)}),
            status=500,
            mimetype='application/json'
        )
        return add_cors_headers(error_response)

# This is the entry point for Vercel
# Vercel will call this app directly
if __name__ == '__main__':
    app.run(debug=True)
