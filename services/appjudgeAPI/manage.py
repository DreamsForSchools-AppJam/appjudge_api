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
    db.session.add(Judge(username='af4ro', name="anshul", job_title="Software Developer", event_id=1))
    db.session.add(Judge(username='vrustagi', name="vatsal", job_title="Software Developer", event_id=2))

    db.session.add(Team(name='Dry Grass', info="Summer 2016", school_id=1, student_list=[1], mentor_list=[1], question_list=[1, 2]))
    db.session.add(Team(name='Hello Veggies', info="Summer 2017", school_id=2, student_list=[2], mentor_list=[2], question_list=[1, 2]))

    db.session.add(Event(name='Showcase at Garden Grove', info="With 5 judges", judge_list=[1], school_list=[1]))
    db.session.add(Event(name='Showcase at Newport High School', info="With 3 Schools", judge_list=[2], school_list=[2]))

    db.session.add(School(name='Newport High School', info="Newport Beach, CA", event_id=1, team_list=[1]))
    db.session.add(School(name='Garden Grove High School', info="Garden Grive, CA", event_id=2, team_list=[2]))
    
    db.session.add(Student(name='Andy', team_id=1))
    db.session.add(Student(name='James', team_id=2))
    
    db.session.add(Mentor(name='Jerry', team_id=1))
    db.session.add(Mentor(name='Anshul', team_id=2))

    db.session.add(Question(question='How?', max_score=10, event_id=1))
    db.session.add(Question(question='Why?', max_score=10, event_id=1))
    db.session.add(Question(question='How?', max_score=10, event_id=2))
    db.session.add(Question(question='Why?', max_score=10, event_id=2))
    
    db.session.commit()

if __name__ == '__main__':
    cli()