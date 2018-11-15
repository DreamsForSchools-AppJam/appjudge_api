# services/appjudgeAPI/project/api/models/Event.py

from sqlalchemy.sql import func
from project import db

class Event(db.Model):
    __tablename__ = 'event'
    id = db.Column("id", db.Integer, primary_key=True, autoincrement=True)
    name = db.Column("name", db.String(128), nullable=False)
    date = db.Column("date", db.Date, nullable=True)
    start_time = db.Column("start_time", db.DateTime, nullable=True)
    end_time = db.Column("end_time", db.DateTime, nullable=True)
    info = db.Column("info", db.String(1280), nullable=True)
    judge_list = db.Column("judge_list", db.ARRAY(db.Integer), nullable=False)
    
    # TODO: Check and update defaults
    def __init__(self, name="", date=None, start_time=None, end_time=None,
         info="", judge_list=[]):
        self.name = name
        self.date = date
        self.start_time = start_time
        self.end_time = end_time
        self.info = info
        self.judge_list = judge_list

    # returns the JSON for a Judge class
    def to_json(self):
        return {
            'id': self.id,
            'name': self.name,
            'info': self.info,
            'date': self.date, 
            'start_time': self.start_time,
            'end_time': self.end_time,
            'judge_list': self.judge_list, 
        }

    # sets the basic info for the Judge
    def set_info(self, name = "", username = "", info = "AppJam+ Event"):
        self.name = name
        self.info = info

    def add_judge(self, judge_id):
        self.judge_list = self.judge_list + [judge_id]