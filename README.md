# toolforge-generator

# Tool Generator Web Application

# app.py
from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/generate_tool', methods=['POST'])
def generate_tool():
    tool_details = request.json
    generated_code = generate_code_template(tool_details)
    return jsonify({'code': generated_code})

def generate_code_template(details):
    return f"""
# {details['tool_name']}
# {details['description']}

def main():
    # TODO: Implement {details['tool_name']}
    pass

if __name__ == '__main__':
    main()
"""

if __name__ == '__main__':
    app.run(debug=True)

# templates/index.html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tool Generator</title>
    <link rel="stylesheet" href="/static/css/styles.css">
</head>
<body>
    <h1>Tool Generator</h1>
    <form id="tool-form">
        <label for="tool-name">Tool Name:</label>
        <input type="text" id="tool-name" required>

        <label for="description">Description:</label>
        <textarea id="description" required></textarea>

        <label for="language">Primary Programming Language:</label>
        <select id="language" required>
            <option value="python">Python</option>
            <option value="javascript">JavaScript</option>
            <option value="ruby">Ruby</option>
        </select>

        <label for="frameworks">Frameworks (comma-separated):</label>
        <input type="text" id="frameworks">

        <label for="input-type">Input Type:</label>
        <input type="text" id="input-type" required>

        <label for="output-type">Output Type:</label>
        <input type="text" id="output-type" required>

        <label for="additional-features">Additional Features:</label>
        <textarea id="additional-features"></textarea>

        <button type="submit">Generate Tool</button>
    </form>

    <pre id="generated-code"></pre>

    <script src="/static/js/script.js"></script>
</body>
</html>

# static/js/script.js
document.getElementById('tool-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const toolDetails = {
        tool_name: document.getElementById('tool-name').value,
        description: document.getElementById('description').value,
        language: document.getElementById('language').value,
        frameworks: document.getElementById('frameworks').value,
        input_type: document.getElementById('input-type').value,
        output_type: document.getElementById('output-type').value,
        additional_features: document.getElementById('additional-features').value
    };

    const response = await fetch('/generate_tool', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(toolDetails)
    });

    const result = await response.json();
    document.getElementById('generated-code').textContent = result.code;
});

# static/css/styles.css
body {
    font-family: Arial, sans-serif;
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
}

form {
    display: flex;
    flex-direction: column;
}

label {
    margin-top: 10px;
}

input, select, textarea {
    margin-bottom: 10px;
}

button {
    margin-top: 20px;
}

#generated-code {
    margin-top: 20px;
    padding: 10px;
    background-color: #f0f0f0;
    white-space: pre-wrap;
}

# requirements.txt
Flask==2.0.1

## Collaborate with GPT Engineer

This is a [gptengineer.app](https://gptengineer.app)-synced repository 🌟🤖

Changes made via gptengineer.app will be committed to this repo.

If you clone this repo and push changes, you will have them reflected in the GPT Engineer UI.

## Tech stack

This project is built with .

- Vite
- React
- shadcn-ui
- Tailwind CSS

## Setup

```sh
git clone https://github.com/GPT-Engineer-App/toolforge-generator.git
cd toolforge-generator
npm i
```

```sh
npm run dev
```

This will run a dev server with auto reloading and an instant preview.

## Requirements

- Node.js & npm - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)
