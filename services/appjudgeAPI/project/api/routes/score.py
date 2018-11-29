# services/appjudgeAPI/project/api/routes/score.py

from flask import Blueprint, jsonify, request
from project.api.models.Score import Score
from project.api.models.Team import Team
from project import db
from sqlalchemy import exc

score_blueprint = Blueprint('score', __name__)

@score_blueprint.route('/scores', methods=['GET'])
def get_all_scores():
    """Get all scores"""
    response_object = {
        'status': 'success',
        'data': {
            'scores': [score.to_json() for score in Score.query.all()]
        }
    }
    return jsonify(response_object), 200

@score_blueprint.route('/score', methods=['POST'])
def add_score():
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
        event_id = post_data.get('event_id')
        team_id = post_data.get('team_id')
        judge_id = post_data.get('judge_id')
        question_id = post_data.get('question_id')
        scoreval = post_data.get('score')

        score = Score.query.filter_by(event_id=event_id, team_id=team_id,
         judge_id=judge_id, question_id=question_id).first()

        if not score:
            # Add new Score
            db.session.add(Score(
                event_id=event_id,
                team_id=team_id,
                judge_id=judge_id,
                question_id=question_id,
                score=scoreval))
        else:
            score.set_score(scoreval)
        db.session.commit()

        response_object['status'] = 'success'
        response_object['message'] = 'Score was added!'

        return jsonify(response_object), 201

    except exc.IntegrityError as e:
        db.session.rollback()
        return jsonify(response_object), 400

@score_blueprint.route('/score/<event_id>/<team_id>/<judge_id>/<question_id>', methods=['GET'])
def get_single_score(event_id, team_id, judge_id, question_id):
    """Get single Score details"""
    response_object = {
        'status': 'fail',
        'message': 'Score does not exist'
    }
    try:
        score = Score.query.filter_by(event_id=int(event_id), team_id=int(team_id),
         judge_id=int(judge_id), question_id=int(question_id)).first()
        if not score:
            response_object = {
                'status': 'success',
                'data': {
                    'event_id': event_id,
                    'judge_id': judge_id,
                    'team_id': team_id,
                    'question_id': question_id,
                    'score': 0,
                }
            }
            return jsonify(response_object), 200
        else:
            response_object = {
                'status': 'success',
                'data': score.to_json()
            }
            return jsonify(response_object), 200
    except ValueError:
        return jsonify(response_object), 404
