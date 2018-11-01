# services/appjudgeAPI/project/api/routes/team.py

from flask import Blueprint, jsonify, request
from project.api.models.Team import Team
from project import db
from sqlalchemy import exc

team_blueprint = Blueprint('team', __name__)

@team_blueprint.route('/teams', methods=['GET'])
def get_all_teams():
    """Get all teams"""
    response_object = {
        'status': 'success',
        'data': {
            'teams': [team.to_json() for team in Team.query.all()]
        }
    }
    return jsonify(response_object), 200

@team_blueprint.route('/team', methods=['POST'])
def add_team():
    post_data = request.get_json()

    # Check for invalid payload
    response_object = {
        'status': 'fail',
        'message': 'Invalid payload.'
    }
    if not post_data:
        return jsonify(response_object), 400

    try:
        # TODO: update information
        name = post_data.get('name')
        info = post_data.get('info')

        team = Team.query.filter_by(name=name).first()
        if not team:
            db.session.add(Team(
                name=name,
                info=info))
            db.session.commit()
            response_object['status'] = 'success'
            response_object['message'] = f'{name} was added!'
            return jsonify(response_object), 201
        else:
            response_object['message'] = 'Sorry. That name already exists.'
            return jsonify(response_object), 400
    except exc.IntegrityError as e:
        db.session.rollback()
        return jsonify(response_object), 400

@team_blueprint.route('/team/<team_id>', methods=['GET'])
def get_single_team(team_id):
    """Get single Team details"""
    response_object = {
        'status': 'fail',
        'message': 'Team does not exist'
    }
    try:
        team = Team.query.filter_by(id=int(team_id)).first()
        if not team:
            return jsonify(response_object), 404
        else:
            response_object = {
                'status': 'success',
                'data': team.to_json()
            }
            return jsonify(response_object), 200
    except ValueError:
        return jsonify(response_object), 404
