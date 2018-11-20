# services/appjudgeAPI/project/api/routes/mentor.py

from flask import Blueprint, jsonify, request
from project.api.models.Mentor import Mentor
from project.api.models.Team import Team
from project import db
from sqlalchemy import exc

mentor_blueprint = Blueprint('mentor', __name__)

@mentor_blueprint.route('/mentors', methods=['GET'])
def get_all_mentors():
    """Get all mentors"""
    response_object = {
        'status': 'success',
        'data': {
            'mentors': [mentor.to_json() for mentor in Mentor.query.all()]
        }
    }
    return jsonify(response_object), 200

@mentor_blueprint.route('/mentor', methods=['POST'])
def add_mentor():
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
        team_id = post_data.get('team_id')

        mentor = Mentor.query.filter_by(name=name, team_id=team_id).first()
        if not mentor:
            team = Team.query.filter_by(id=team_id).first()
            if team:
                # Add new Mentor
                db.session.add(Mentor(
                    name=name,
                    info=info,
                    team_id=team_id))
                db.session.commit()

                # Add new Mentor's id to Team
                mentor = Mentor.query.filter_by(name=name, team_id=team_id).first()
                team.add_mentor(mentor.id)
                db.session.commit()

                response_object['status'] = 'success'
                response_object['message'] = f'{name} was added!'

                # TODO: remove additional responses
                response_object['team_list'] = team.to_json()
                return jsonify(response_object), 201
            else:
                response_object['message'] = 'Sorry. team {} does not exist.'.format(team_id)
                return jsonify(response_object), 400
        else:
            response_object['message'] = 'Sorry. That Team already exists.'
            return jsonify(response_object), 400
    except exc.IntegrityError as e:
        db.session.rollback()
        return jsonify(response_object), 400

@mentor_blueprint.route('/mentor/<mentor_id>', methods=['GET'])
def get_single_mentor(mentor_id):
    """Get single Mentor details"""
    response_object = {
        'status': 'fail',
        'message': 'Mentor does not exist'
    }
    try:
        mentor = mentor.query.filter_by(id=int(mentor_id)).first()
        if not mentor:
            return jsonify(response_object), 404
        else:
            response_object = {
                'status': 'success',
                'data': mentor.to_json()
            }
            return jsonify(response_object), 200
    except ValueError:
        return jsonify(response_object), 404
