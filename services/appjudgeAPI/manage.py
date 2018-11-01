# services/appjudgeAPI/manage.py

from flask.cli import FlaskGroup
from project import create_app, db
from project.api.models import Judge

app = create_app()
cli = FlaskGroup(create_app=create_app)

@cli.command()
def recreate_db():
    db.drop_all()
    db.create_all()
    db.session.commit()


if __name__ == '__main__':
    cli()