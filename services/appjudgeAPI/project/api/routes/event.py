# services/appeventAPI/project/api/routes/event.py

from flask import Blueprint, jsonify, request
from project.api.models.Event import Event
from project.api.models.Judge import Judge
from project.api.models.Team import Team
from project.api.models.Question import Question
from project.api.models.Score import Score
from project import db
from sqlalchemy import exc
from collections import defaultdict
# import school.py, judge.py

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
        location = post_data.get('location')
        start_time = post_data.get('start_time')
        end_time = post_data.get('end_time')
        date = post_data.get('date')

        event = Event.query.filter_by(name=name).first()
        if not event:
            db.session.add(Event(
                name=name,
                location=location,
                start_time=start_time,
                end_time=end_time,
                date=date))
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

@event_blueprint.route('/event/remove/<event_id>', methods=['GET'])
def remove_event(event_id):
    """Remove single Event details"""
    response_object = {
        'status': 'fail',
        'message': 'Event does not exist'
    }
    try:
        event = Event.query.filter_by(id=int(event_id)).first()
        if not event:
            return jsonify(response_object), 404
        else:
            # for s in event.school_list:
            #     school.remove_school(school)
            # for j in event.judge_list:
            #     judge.remove_judge(judge)
            db.session.delete(event)
            db.session.commit()
            response_object = {
                'status': 'success',
                'message': "Event removed"
            }
            return jsonify(response_object), 200
    except ValueError:
        return jsonify(response_object), 404

def _get_totalscore(event_id, team_id, judge_id, question_list):
    try:
        totalscore = 0
        fl = open("logger2.txt", "w+")
        for q in question_list:
            q = int(q)
            score = Score.query.filter_by(event_id=event_id, team_id=team_id, judge_id=judge_id, question_id=q).first()
            if score is not None:
                totalscore += int(score.score)
            fl.write("{}".format(totalscore))
        fl.close()
        return totalscore
    except e:
        fl = open("logger2.txt", "w+")
        fl.write("{}".format(e))
        fl.close()

@event_blueprint.route('/event/totalscore/<event_id>', methods=['GET'])
def get_event_totalscore(event_id):
    """Score single Event details"""
    response_object = {
        'status': 'fail',
        'message': 'Error presenting scores, make sure Judges have teams assigned'
    }
    try:
        event = Event.query.filter_by(id=int(event_id)).first()

        fl = open("logger.txt", "w+")

        if not event:
            return jsonify(response_object), 404
        else:
            # db.session.delete(event)
            judges = []
            teams = {}
            for j in event.judge_list:
                judge = Judge.query.filter_by(id=int(j)).first()
                judges.append(judge)
                for t in judge.team_list:
                    t = int(t)
                    team = Team.query.filter_by(id=t).first().to_json()
                    if team['id'] in teams.keys():
                        teams[team['id']]['judges'][judge.id] = judge.to_json()
                    else:
                        team['judges'] = {judge.id: judge.to_json()}
                        teams[team['id']] = team
                    # fl.write("{}\n".format( _get_totalscore(event.id, t, int(j), judge.question_list)))
                    teams[team['id']]['judges'][judge.id]['totalscore'] = _get_totalscore(event.id, t, int(j), judge.question_list)
            # fl.write("{}\n".format(teams))

            for j in event.judge_list:
                j = int(j)
                for t in teams.keys():
                    t = int(t)
                    if j not in teams[t]['judges'].keys():
                        fl.write("{}\n".format("here 1"))
                        teams[t]['judges'][j] = {}
                        teams[t]['judges'][j]['totalscore'] = '-'
                        fl.write("{}\n".format("here 2"))
                        teams[t]['judges'][j]['id'] = j
                        fl.write("{}\n".format("here 3"))
                        fl.write("{}\n".format(teams[t]['judges'][j]))
            
            fl.close()
            db.session.commit()
            response_object = {
                'status': 'success',
                'message': "Retrieved scores",
                'data': teams
            }
            return jsonify(response_object), 200
    except:
        return jsonify(response_object), 404