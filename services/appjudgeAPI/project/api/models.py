# services/appjudgeAPI/project/api/models.py

from sqlalchemy.sql import func
from project import db

class Judge(db.Model):
    __tablename__ = 'judge'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    username = db.Column(db.String(128), nullable=False)
    
    def __init__(self, username):
        self.username = username