# services/appjudgeAPI/project/api/routes/event.py

from flask import Blueprint, jsonify, request
from project.api.models.Event import Event
from project import db
from sqlalchemy import exc

event_blueprint = Blueprint('event', __name__)

@event_blueprint.route('/events', methods=['GET'])
def get_all_events():
    """Get all events"""
    response_object = {
        'status': 'success',
        'data': {
            'events': [event.to_json() for event in Event.query.all()]
        }
    }
    return jsonify(response_object), 200

@event_blueprint.route('/event', methods=['POST'])
def add_event():
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
        start_time = post_data.get('start_time')
        end_time = post_data.get('end_time')
        date = post_data.get('date')
        judge_list = post_data.get('judge_list')

        event = Event.query.filter_by(name=name).first()
        if not event:
            db.session.add(Event(
                name=name,
                info=info,
                start_time=start_time,
                end_time=end_time,
                date=date,
                judge_list=judge_list))
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

@event_blueprint.route('/event/<event_id>', methods=['GET'])
def get_single_event(event_id):
    """Get single Event details"""
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
                'data': event.to_json()
            }
            return jsonify(response_object), 200
    except ValueError:
        return jsonify(response_object), 404

@event_blueprint.route('/event/judge', methods=['POST'])
def add_judge_to_event():
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
        judge_id = post_data.get('judge_id')

        event = Event.query.get(event_id)
        if event:
            event.add_judge(judge_id)
            db.session.commit()
            response_object['status'] = 'success'
            response_object['message'] = event.to_json()
            return jsonify(response_object), 201
        else:
            response_object['message'] = 'Sorry. That event does not exist.'
            return jsonify(response_object), 400
    except exc.IntegrityError as e:
        db.session.rollback()
        return jsonify(response_object), 400
