# services/appjudgeAPI/project/api/appjudge.py

from flask import Blueprint, jsonify, request, render_template
from project.api.models import Judge
from project import db
from sqlalchemy import exc

appjudge_blueprint = Blueprint('judge', __name__, template_folder='./templates')

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

@appjudge_blueprint.route('/judge', methods=['POST'])
def add_judge():
    post_data = request.get_json()

    # Check for invalid payload
    response_object = {
        'status': 'fail',
        'message': 'Invalid payload.'
    }
    if not post_data:
        return jsonify(response_object), 400

    try:
        username = post_data.get('username')
        name = post_data.get('name')
        job_title = post_data.get('job_title')
        judge = Judge.query.filter_by(username=username).first()
        if not judge:
            db.session.add(Judge(
                username=username, 
                name=name,
                job_title=job_title))
            db.session.commit()
            response_object['status'] = 'success'
            response_object['message'] = f'{username} was added!'
            return jsonify(response_object), 201
        else:
            response_object['message'] = 'Sorry. That username already exists.'
            return jsonify(response_object), 400
    except exc.IntegrityError as e:
        db.session.rollback()
        return jsonify(response_object), 400

@appjudge_blueprint.route('/judge/<judge_id>', methods=['GET'])
def get_single_judege(judge_id):
    """Get single Judge details"""
    response_object = {
        'status': 'fail',
        'message': 'Judge does not exist'
    }
    try:
        judge = Judge.query.filter_by(id=int(judge_id)).first()
        if not judge:
            return jsonify(response_object), 404
        else:
            response_object = {
                'status': 'success',
                'data': judge.to_json()
            }
            return jsonify(response_object), 200
    except ValueError:
        return jsonify(response_object), 404


@appjudge_blueprint.route('/judges', methods=['GET'])
def get_all_judges():
    """Get all Judges"""
    response_object = {
        'status': 'success',
        'data': {
            'judges': [judge.to_json() for judge in Judge.query.all()]
        }
    }
    return jsonify(response_object), 200