# services/appjudgeAPI/project/api/models/Question.py

from sqlalchemy.sql import func
from project import db

class Question(db.Model):
    __tablename__ = 'question'
    id = db.Column("id", db.Integer, primary_key=True, autoincrement=True)
    question = db.Column("question", db.String(128), nullable=False)
    max_score = db.Column("max_score", db.Integer, nullable=False)
    event_id = db.Column("event_id", db.Integer, nullable=False)
    
    def __init__(self, max_score, question, event_id):
        self.question = question
        self.info = info
        self.max_score = max_score
        self.event_id = event_id

    # returns the JSON for a Judge class
    def to_json(self):
        return {
            'id': self.id,
            'question': self.question,
            'max_score': self.max_score,
            'event_id': self.event_id,
        }
    
    def set_event(self, event_id):
        self.event_id = self.event_id