# services/appjudgeAPI/project/api/models/Team.py

from sqlalchemy.sql import func
from project import db

class Team(db.Model):
    __tablename__ = 'team'
    id = db.Column("id", db.Integer, primary_key=True, autoincrement=True)
    name = db.Column("name", db.String(128), nullable=False)
    info = db.Column("info", db.String(1280), nullable=True)
    school_id = db.Column("school_id", db.Integer, nullable=False)
    student_list = db.Column("student_list", db.ARRAY(db.Integer), nullable=False)
    mentor_list = db.Column("mentor_list", db.ARRAY(db.Integer), nullable=False)
    
    def __init__(self, school_id, student_list=[], mentor_list=[], name="Team", info=""):
        self.name = name
        self.info = info
        self.school_id = school_id
        self.student_list = student_list
        self.mentor_list = mentor_list

    # returns the JSON for a Judge class
    def to_json(self):
        return {
            'id': self.id,
            'name': self.name,
            'info': self.info,
            'school_id': self.school_id,
            'student_list': self.student_list,
            'mentor_list': self.mentor_list,
        }

    # sets the basic info for the Judge
    def set_info(self, name = "", username = "", info = "AppJam+ Team"):
        self.name = name
        self.info = info
    
    def add_student(self, student_id):
        self.student_list = self.student_list + [student_id]
    
    def add_mentor(self, mentor_id):
        self.mentor_list = self.mentor_list + [mentor_id]

    def set_school(self, school_id):
        self.school_id = self.school_id