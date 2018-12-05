# services/appjudgeAPI/manage.py

from flask.cli import FlaskGroup
from project import create_app, db
from project.api.models.Judge import Judge
from project.api.models.Team import Team
from project.api.models.School import School
from project.api.models.Event import Event
from project.api.models.Student import Student
from project.api.models.Mentor import Mentor
from project.api.models.Question import Question

app = create_app()
cli = FlaskGroup(create_app=create_app)

@cli.command()
def recreateDB():
    db.drop_all()
    db.create_all()
    db.session.commit()

@cli.command()
def seedDB():
    """Seeds the database."""
    # TODO: Check contraints
    db.session.add(Event(name='Showcase Garden Grove Dec 18', location="Garden Grove",
    judge_list=[1, 2], school_list=[1, 2], question_list=[1,3,5]))
    db.session.add(Event(name='Showcase Newport High School Nov 18', location="Newport Beach",
    judge_list=[3, 4], school_list=[3, 4], question_list=[2,4,6]))

    db.session.add(School(name='Newport High School', info="Newport Beach, CA", event_id=1, team_list=[1,2, 9]))
    db.session.add(School(name='Garden Grove High School', info="Garden Grove, CA", event_id=1, team_list=[3,4, 10]))
    db.session.add(School(name='Newport High School', info="Newport Beach, CA", event_id=2, team_list=[5,6]))
    db.session.add(School(name='Garden Grove High School', info="Garden Grive, CA", event_id=2, team_list=[7,8]))

    db.session.add(Team(name='Dry Grass', info="They love pink", school_id=1, student_list=[1,2], mentor_list=[1], question_list=[1,3,5]))
    db.session.add(Team(name='More Dry Grass', info="1 less student", school_id=1, student_list=[3,4], mentor_list=[2], question_list=[1,3,5]))
    db.session.add(Team(name='Hello Veggies', info="Veggie boys", school_id=2, student_list=[5,6], mentor_list=[3], question_list=[1,3,5]))
    db.session.add(Team(name='Teammers', info="", school_id=2, student_list=[7,8], mentor_list=[4], question_list=[1,3,5]))
    db.session.add(Team(name='Dry Grass', info="They love pink", school_id=3, student_list=[9,10], mentor_list=[5], question_list=[2,4,6]))
    db.session.add(Team(name='More Dry Grass', info="1 less student", school_id=3, student_list=[11,12], mentor_list=[6], question_list=[2,4,6]))
    db.session.add(Team(name='Hello Veggies', info="Veggie boys", school_id=4, student_list=[13,14], mentor_list=[7], question_list=[2,4,6]))
    db.session.add(Team(name='Teammers', info="", school_id=4, student_list=[15,16], mentor_list=[8], question_list=[2,4,6]))
    db.session.add(Team(name='More Dry Grass', info="They love pink", school_id=1, student_list=[1,2], mentor_list=[1], question_list=[1,3,5]))
    db.session.add(Team(name='Olo Hello Veggies', info="Veggie boys", school_id=2, student_list=[5,6], mentor_list=[3], question_list=[1,3,5]))

    db.session.add(Student(name='Andy', team_id=1))
    db.session.add(Student(name='James', team_id=1))
    db.session.add(Student(name='Andy', team_id=2))
    db.session.add(Student(name='James', team_id=2))
    db.session.add(Student(name='Andy', team_id=3))
    db.session.add(Student(name='James', team_id=3))
    db.session.add(Student(name='Andy', team_id=4))
    db.session.add(Student(name='James', team_id=4))
    db.session.add(Student(name='Andy', team_id=5))
    db.session.add(Student(name='James', team_id=5))
    db.session.add(Student(name='Andy', team_id=6))
    db.session.add(Student(name='James', team_id=6))
    db.session.add(Student(name='Andy', team_id=7))
    db.session.add(Student(name='James', team_id=7))
    db.session.add(Student(name='Andy', team_id=8))
    db.session.add(Student(name='James', team_id=8))
    
    db.session.add(Mentor(name='Anshul', team_id=1))
    db.session.add(Mentor(name='Anshul', team_id=2))
    db.session.add(Mentor(name='Anshul', team_id=3))
    db.session.add(Mentor(name='Anshul', team_id=4))
    db.session.add(Mentor(name='Anshul', team_id=5))
    db.session.add(Mentor(name='Anshul', team_id=6))
    db.session.add(Mentor(name='Anshul', team_id=7))
    db.session.add(Mentor(name='Anshul', team_id=8))

    db.session.add(Question(question='How was it?', max_score=10, event_id=1))
    db.session.add(Question(question='How was it?', max_score=10, event_id=2))
    db.session.add(Question(question='Why was it?', max_score=20, event_id=1))
    db.session.add(Question(question='Why was it?', max_score=20, event_id=2))
    db.session.add(Question(question='Where was it?', max_score=5, event_id=1))
    db.session.add(Question(question='Where was it?', max_score=5, event_id=2))

    db.session.add(Judge(username='af4ro', name="anshul", job_title="Software Developer", password="some",
     event_id=1, team_list=[], question_list=[1,3,5]))
    db.session.add(Judge(username='vrustagi', name="vatsal", job_title="Software Developer", password="some",
    event_id=1, team_list=[], question_list=[1,3,5]))
    db.session.add(Judge(username='af4ro1', name="anshul", job_title="Software Developer", password="some",
     event_id=2, team_list=[], question_list=[2,4,6]))
    db.session.add(Judge(username='vrustagi1', name="vatsal", job_title="Software Developer", password="some",
    event_id=2, team_list=[], question_list=[2,4,6]))
    
    db.session.commit()

if __name__ == '__main__':
    cli()