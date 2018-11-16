# services/appjudgeAPI/project/api/models/Mentor.py

from sqlalchemy.sql import func
from project import db

class Mentor(db.Model):
    __tablename__ = 'mentor'
    id = db.Column("id", db.Integer, primary_key=True, autoincrement=True)
    name = db.Column("name", db.String(128), nullable=False)
    info = db.Column("info", db.String(1280), nullable=True)
    team_id = db.Column("team_id", db.Integer, nullable=False)
    
    def __init__(self, team_id, name="Team", info=""):
        self.name = name
        self.info = info
        self.team_id = team_id

    # returns the JSON for a Judge class
    def to_json(self):
        return {
            'id': self.id,
            'name': self.name,
            'info': self.info,
            'team_id': self.team_id,
        }

    # sets the basic info for the Judge
    def set_info(self, name = "", username = "", info = "AppJam+ Mentor"):
        self.name = name
        self.info = info

    def set_team(self, team_id):
        self.team_id = self.team_id