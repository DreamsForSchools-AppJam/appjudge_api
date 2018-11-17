# services/appjudgeAPI/project/api/models/Judge.py

from sqlalchemy.sql import func
from project import db

class Judge(db.Model):
    __tablename__ = 'judge'
    id = db.Column("id", db.Integer, primary_key=True, autoincrement=True)
    username = db.Column("username", db.String(128), nullable=False)
    name = db.Column("name", db.String(128), nullable=False)
    job_title = db.Column("job_title", db.String(128), nullable=True)
    event_id = db.Column("event_id", db.Integer, nullable=False)
    team_list = db.Column("team_list", db.ARRAY(db.Integer), nullable=False)
    question_list = db.Column("question_list", db.ARRAY(db.Integer), nullable=False)
    
    # TODO: Remove event_id default value
    def __init__(self, username, event_id, name="", job_title="", team_list=[], question_list=[]):
        self.username = username
        self.name = name
        self.job_title = job_title
        self.event_id = event_id
        self.team_list = team_list
        self.question_list = question_list

    # returns the JSON for a Judge class
    def to_json(self):
        return {
            'id': self.id,
            'username': self.username,
            'name': self.name,
            'job_title': self.job_title,
            'event_id': self.event_id,
            'team_list': self.team_list,
            'question_list': self.question_list,
        }

    # sets the basic info for the Judge
    def set_info(self, name = "", username = "", job_title = "AppJam+ Judge"):
        self.name = name
        self.username = username
        self.job_title = job_title

    def set_event(self, event_id):
        self.event_id = self.event_id

    def add_team(self, team_id):
        self.team_list = self.team_list + [team_id]

    def add_question(self, question_id):
        self.question_list = self.question_list + [question_id]