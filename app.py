from flask import Flask, url_for, render_template, request, jsonify


app = Flask(__name__)

@app.route('/')
def get_home():
    return render_template('home.html')

@app.route('/api/datapoint', methods=['POST'])
def index():
	content = request.get_json()

	print(content)
	
	return jsonify(content)

if __name__ == '__main__':
    app.run(debug=True)