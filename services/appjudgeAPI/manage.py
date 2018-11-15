# services/appjudgeAPI/manage.py

from flask.cli import FlaskGroup
from project import create_app, db
from project.api.models.Judge import Judge
from project.api.models.Team import Team
from project.api.models.School import School
from project.api.models.Event import Event

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
    db.session.add(Judge(username='af4ro', name="anshul", job_title="Software Developer", event_id=1))
    db.session.add(Judge(username='vrustagi', name="vatsal", job_title="Software Developer", event_id=2))
    db.session.add(Team(name='Dry Grass', info="Summer 2016"))
    db.session.add(Team(name='Hello Veggies', info="Summer 2017"))
    db.session.add(Event(name='Showcase at Garden Grove', info="With 5 judges", judge_list=[1]))
    db.session.add(Event(name='Showcase at Newport High School', info="With 3 Schools", judge_list=[2]))
    db.session.add(School(name='Newport High School', info="Newport Beach, CA"))
    db.session.add(School(name='Garden Grove High School', info="Garden Grive, CA"))
    db.session.commit()

if __name__ == '__main__':
    cli()