# services/appjudgeAPI/project/api/models/Judge.py

from sqlalchemy.sql import func
from project import db

class Judge(db.Model):
    __tablename__ = 'judge'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    username = db.Column(db.String(128), nullable=False)
    name = db.Column(db.String(128), nullable=False)
    job_title = db.Column(db.String(128), nullable=False)
    
    def __init__(self, username, name="", job_title=""):
        self.username = username
        self.name = name
        self.job_title = job_title

    # returns the JSON for a Judge class
    def to_json(self):
        return {
            'id': self.id,
            'username': self.username,
            'name': self.name,
            'job_title': self.job_title,
        }

    # sets the basic info for the Judge
    def set_info(self, name = "", username = "", job_title = "AppJam+ Judge"):
        self.name = name
        self.username = username
        self.job_title = job_title