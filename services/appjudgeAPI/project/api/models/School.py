# services/appjudgeAPI/project/api/models/School.py

from sqlalchemy.sql import func
from project import db

class School(db.Model):
    __tablename__ = 'school'
    id = db.Column("id", db.Integer, primary_key=True, autoincrement=True)
    name = db.Column("name", db.String(128), nullable=False)
    info = db.Column("info", db.String(1280), nullable=True)
    event_id = db.Column("event_id", db.Integer, nullable=False)
    team_list = db.Column("team_list", db.ARRAY(db.Integer), nullable=False)
    
    def __init__(self, event_id, team_list=[], name="School", info=""):
        self.name = name
        self.info = info
        self.event_id = event_id
        self.team_list = team_list

    # returns the JSON for a Judge class
    def to_json(self):
        return {
            'id': self.id,
            'name': self.name,
            'info': self.info,
            'event_id': self.event_id,
            'team_list': self.team_list,
        }

    # sets the basic info for the Judge
    def set_info(self, name = "", username = "", info = "AppJam+ School"):
        self.name = name
        self.info = info

    def add_team(self, team_id):
        self.team_list = self.team_list + [team_id]

    def set_event(self, event_id):
        self.event_id = self.event_id