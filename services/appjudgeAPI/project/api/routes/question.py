# services/appjudgeAPI/project/api/routes/question.py

from flask import Blueprint, jsonify, request
from project.api.models.Question import Question
from project.api.models.Event import Event
from project.api.models.School import School
from project.api.models.Team import Team
from project import db
from sqlalchemy import exc

question_blueprint = Blueprint('question', __name__)

@question_blueprint.route('/questions', methods=['GET'])
def get_all_questions():
    """Get all questions"""
    response_object = {
        'status': 'success',
        'data': {
            'questions': [question.to_json() for question in Question.query.all()]
        }
    }
    return jsonify(response_object), 200

@question_blueprint.route('/questions/<event_id>', methods=['GET'])
def get_all_questions_for_event(event_id):
    """Get all Questions for an event"""
    response_object = {
        'status': 'fail',
        'message': 'Event does not exist'
    }
    try:
        event = Event.query.filter_by(id=int(event_id)).first()
        if not event:
            return jsonify(response_object), 404
        else:
            response_object = {
                'status': 'success',
                'questions': [question.to_json() for question in Question.query.filter_by(event_id=int(event_id))]
            }
            return jsonify(response_object), 200
    except ValueError:
        return jsonify(response_object), 404

@question_blueprint.route('/question', methods=['POST'])
def add_question():
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
        question = post_data.get('question')
        max_score = post_data.get('max_score')
        event_id = post_data.get('event_id')

        question = Question.query.filter_by(question=question, event_id=event_id).first()
        if not question:
            event = Event.query.filter_by(id=event_id).first()
            if event:
                # Add new Question
                db.session.add(Question(
                    question=question,
                    max_score=max_score,
                    event_id=event_id))
                db.session.commit()

                # Add new Question's id to Teams
                question = Question.query.filter_by(question=question, event_id=event_id).first()
                for sid in event.school_list:
                    for t in School.query.filter_by(id=sid).first().team_list:
                        team = Team.query.filter_by(id=t).first()
                        team.add_question(question.id)
                db.session.commit()

                response_object['status'] = 'success'
                response_object['message'] = f'{question} was added!'

                # TODO: remove additional responses
                response_object['team_list'] = team.to_json()
                return jsonify(response_object), 201
            else:
                response_object['message'] = 'Sorry. team {} does not exist.'.format(event_id)
                return jsonify(response_object), 400
        else:
            response_object['message'] = 'Sorry. That Question already exists.'
            return jsonify(response_object), 400
    except exc.IntegrityError as e:
        db.session.rollback()
        return jsonify(response_object), 400

@question_blueprint.route('/question/<question_id>', methods=['GET'])
def get_single_question(question_id):
    """Get single Question details"""
    response_object = {
        'status': 'fail',
        'message': 'Question does not exist'
    }
    try:
        question = Question.query.filter_by(id=int(question_id)).first()
        if not question:
            return jsonify(response_object), 404
        else:
            response_object = {
                'status': 'success',
                'data': question.to_json()
            }
            return jsonify(response_object), 200
    except ValueError:
        return jsonify(response_object), 404

@question_blueprint.route('/question/remove/<question_id>', methods=['GET'])
def remove_question(question_id):
    """Remove single Question details"""
    response_object = {
        'status': 'fail',
        'message': 'Question does not exist'
    }
    try:
        question = Question.query.filter_by(id=int(question_id)).first()
        if not question:
            return jsonify(response_object), 404
        else:
            event = Event.query.filter_by(id=question.event_id).first()
            if event:
                temp = event.question_list
                temp.remove(question.id)
                event.question_list = temp
            db.session.delete(question)
            db.session.commit()
            response_object = {
                'status': 'success',
                'message': "Question removed"
            }
            return jsonify(response_object), 200
    except ValueError:
        return jsonify(response_object), 404
