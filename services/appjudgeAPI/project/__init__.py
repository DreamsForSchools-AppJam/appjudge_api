# services/appjudgeAPI/project/__init__.py

import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

# instantiate the db
db = SQLAlchemy()

def create_app(script_info=None):
	
	# instantiate the app
	app = Flask(__name__)

	# enable CORS
	CORS(app)

	# set config
	app_settings = os.getenv('APP_SETTINGS')
	app.config.from_object(app_settings)

	# set up extensions
	db.init_app(app)

	# register blueprints
	from project.api.appjudge import appjudge_blueprint
	from project.api.routes.judge import judge_blueprint
	from project.api.routes.team import team_blueprint
	from project.api.routes.school import school_blueprint
	app.register_blueprint(appjudge_blueprint)
	app.register_blueprint(judge_blueprint)
	app.register_blueprint(team_blueprint)
	app.register_blueprint(school_blueprint)

	# shell context for flask cli
	@app.shell_context_processor
	def ctx():
		return {'app': app, 'db': db}
	
	return app