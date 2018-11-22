# services/appjudgeAPI/project/__init__.py

import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_debugtoolbar import DebugToolbarExtension

# instantiate the db
db = SQLAlchemy()
toolbar = DebugToolbarExtension()

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
	toolbar.init_app(app)

	# register blueprints
	from project.api.appjudge import appjudge_blueprint
	from project.api.routes.judge import judge_blueprint
	from project.api.routes.team import team_blueprint
	from project.api.routes.school import school_blueprint
	from project.api.routes.event import event_blueprint
	from project.api.routes.student import student_blueprint
	from project.api.routes.mentor import mentor_blueprint
	from project.api.routes.score import score_blueprint
	from project.api.routes.question import question_blueprint
	app.register_blueprint(appjudge_blueprint)
	app.register_blueprint(judge_blueprint)
	app.register_blueprint(team_blueprint)
	app.register_blueprint(school_blueprint)
	app.register_blueprint(event_blueprint)
	app.register_blueprint(question_blueprint)
	app.register_blueprint(score_blueprint)
	app.register_blueprint(mentor_blueprint)
	app.register_blueprint(student_blueprint)

	# shell context for flask cli
	@app.shell_context_processor
	def ctx():
		return {'app': app, 'db': db}
	
	return app