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
    location = db.Column("location", db.String(1280), nullable=True)
    judge_list = db.Column("judge_list", db.ARRAY(db.Integer), nullable=True)
    school_list = db.Column("school_list", db.ARRAY(db.Integer), nullable=True)
    
    # TODO: Check and update defaults
    def __init__(self, name, date=None, start_time=None, end_time=None,
         location="", judge_list=[], school_list=[]):
        self.name = name
        self.date = date
        self.start_time = start_time
        self.end_time = end_time
        self.location = location
        self.judge_list = judge_list
        self.school_list = school_list

    # returns the JSON for a Judge class
    def to_json(self):
        return {
            'id': self.id,
            'name': self.name,
            'location': self.location,
            'date': self.date, 
            'start_time': self.start_time,
            'end_time': self.end_time,
            'judge_list': self.judge_list, 
            'school_list': self.school_list
        }

    # sets the basic location for the Judge
    def set_location(self, name = "", username = "", location = "AppJam+ Event"):
        self.name = name
        self.location = location

    def add_judge(self, judge_id):
        self.judge_list = self.judge_list + [judge_id]
    
    def add_school(self, school_id):
        self.school_list = self.school_list + [school_id]