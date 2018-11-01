# services/appjudgeAPI/project/api/appjudge.py

from flask import Blueprint, jsonify, request, render_template
from project.api.models.Judge import Judge
from project import db
from sqlalchemy import exc

appjudge_blueprint = Blueprint('appjudge', __name__, template_folder='./templates')

@appjudge_blueprint.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        username = request.form['username']
        name = request.form['name']
        db.session.add(Judge(username=username, name=name))
        db.session.commit()
    judges = Judge.query.all()
    return render_template('index.html', judges=judges)

@appjudge_blueprint.route('/appjudge/ping', methods=['GET'])
def ping_pong():
    return jsonify({
    'status': 'success',
    'message': 'pong!'
    })