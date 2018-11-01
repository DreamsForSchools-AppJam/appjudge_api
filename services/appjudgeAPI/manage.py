# services/appjudgeAPI/manage.py

from flask.cli import FlaskGroup
from project import create_app, db
from project.api.models import Judge

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
    db.session.add(Judge(username='af4ro', name="anshul", job_title="Software Developer"))
    db.session.add(Judge(username='vrustagi', name="vatsal", job_title="Software Developer"))
    db.session.commit()

if __name__ == '__main__':
    cli()