# services/appjudgeAPI/project/__init__.py

import os
from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy

# instantiate the app
app = Flask(__name__)

# set config
app_settings = os.getenv('APP_SETTINGS')
app.config.from_object(app_settings)

# instantiate the db
db = SQLAlchemy(app)

# model
class Judge(db.Model): # new
	__tablename__ = 'judge'
	id = db.Column(db.Integer, primary_key=True, autoincrement=True)
	username = db.Column(db.String(128), nullable=False)
	
	def __init__(self, username):
		self.username = username


# route
@app.route('/users/ping', methods=['GET'])
def ping_pong():
	return jsonify({
	'status': 'success',
	'message': 'pong!'
	})