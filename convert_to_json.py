"""
Script to convert script.js topic data to JSON files
Run this to extract data: python convert_to_json.py
"""

import json
import re
import os

# Read the script.js file
with open('script.js', 'r', encoding='utf-8') as f:
    content = f.content()

# This is a placeholder - the actual conversion would need to parse JavaScript
# For now, I'll create the JSON structure manually based on the known topics

topics = ['dc-motors', 'ac-motors', 'transformers', 'practical-transformers', 'three-phase-transformers', 'generators']

print("To properly convert, we need to manually create JSON files for each topic.")
print(f"Topics to convert: {', '.join(topics)}")
