# services/appjudgeAPI/project/api/models/Score.py

from sqlalchemy.sql import func
from project import db

class Score(db.Model):
    __tablename__ = 'score'
    event_id = db.Column("event_id", db.Integer, primary_key=True, nullable=False)
    judge_id = db.Column("judge_id", db.Integer, primary_key=True, nullable=False)
    team_id = db.Column("team_id", db.Integer, primary_key=True, nullable=False)
    question_id = db.Column("question_id", db.Integer, primary_key=True, nullable=False)
    score = db.Column("score", db.Integer, nullable=True)
    
    # TODO check the default score
    def __init__(self, event_id, judge_id, team_id, question_id, score=0):
        self.event_id = event_id
        self.judge_id = judge_id
        self.team_id = team_id
        self.question_id = question_id
        self.score = score

    # returns the JSON for a Judge class
    def to_json(self):
        return {
            'event_id': self.event_id,
            'judge_id': self.judge_id,
            'team_id': self.team_id,
            'question_id': self.question_id,
            'score': self.score,
        }

    def set_score(self, score):
        self.score = score