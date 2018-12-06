# services/appjudgeAPI/project/api/routes/judge.py

from flask import Blueprint, jsonify, request
from project.api.models.Judge import Judge
from project.api.models.Event import Event
from project.api.models.School import School
from project import db
from sqlalchemy import exc
from collections import defaultdict
from math import ceil

judge_blueprint = Blueprint('judge', __name__)

@judge_blueprint.route('/judges', methods=['GET'])
def get_all_judges():
    """Get all Judges"""
    response_object = {
        'status': 'success',
        'data': {
            'judges': [judge.to_json() for judge in Judge.query.all()]
        }
    }
    return jsonify(response_object), 200

@judge_blueprint.route('/judge', methods=['POST'])
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
        # TODO: update information
        username = post_data.get('username')
        name = post_data.get('name')
        job_title = post_data.get('job_title')
        event_id = post_data.get('event_id')
        # question_list = post_data.get('question_list')
        team_list = post_data.get('team_list')
        password = post_data.get('password')
        
        judge = Judge.query.filter_by(username=username).first()
        if not judge:
            event = Event.query.filter_by(id=event_id).first()
            if event:
                # Add new Judge
                db.session.add(Judge(
                    username=username, 
                    name=name,
                    job_title=job_title,
                    event_id=event_id,
                    password=password,
                    question_list=event.question_list,
                    team_list=team_list))
                db.session.commit()

                # Add new Judge's id to Event
                judge = Judge.query.filter_by(username=username).first()
                event.add_judge(judge.id)
                db.session.commit()

                response_object['status'] = 'success'
                response_object['message'] = f'{username} was added!'
                
                # TODO: remove additional responses
                response_object['judge_list'] = event.to_json()
                return jsonify(response_object), 201
            else:
                response_object['message'] = 'Sorry. Event {} does not exist.'.format(event_id)
                return jsonify(response_object), 400
        else:
            response_object['message'] = 'Sorry. That username already exists.'
            return jsonify(response_object), 400
    except exc.IntegrityError as e:
        db.session.rollback()
        return jsonify(response_object), 400

@judge_blueprint.route('/judge/<judge_id>', methods=['GET'])
def get_single_judge(judge_id):
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

@judge_blueprint.route('/judge/<username>/<password>', methods=['GET'])
def get_single_judge_by_username(username, password):
    """Get single Judge details by username password"""
    response_object = {
        'status': 'fail',
        'message': 'Judge does not exist'
    }
    try:
        judge = Judge.query.filter_by(username=username, password=password).first()
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

@judge_blueprint.route('/judge/remove/<judge_id>', methods=['GET'])
def remove_judge(judge_id):
    """Remove single Judge details"""
    response_object = {
        'status': 'fail',
        'message': 'Judge does not exist'
    }
    try:
        judge = Judge.query.filter_by(id=int(judge_id)).first()
        if not judge:
            return jsonify(response_object), 404
        else:
            event = Event.query.filter_by(id=judge.event_id).first()
            if event:
                temp = event.judge_list
                temp.remove(judge.id)
                event.judge_list = temp
            db.session.delete(judge)
            db.session.commit()
            response_object = {
                'status': 'success',
                'message': "Judge removed"
            }
            return jsonify(response_object), 200
    except ValueError:
        return jsonify(response_object), 404

def _auto_assign(schoolsWithTeams: dict, judges: list):
    numTeams = sum([len(x) for x in list(schoolsWithTeams.values())])

    if len(judges) > numTeams:
        return dict()

    allTeams = []
    for teams in list(schoolsWithTeams.values()):
        allTeams.extend(teams)

    limit = min(len(judges), ceil(float(numTeams)/float(len(judges))))

    judgeIndex = 0

    assignments = defaultdict(set)

    while numTeams != 0:
        for team in allTeams:
            if len(assignments[team]) < limit:
                if judges[judgeIndex] in assignments[team]:
                    judgeIndex += 1
                    if len(judges) <= judgeIndex:
                        judgeIndex = 0
                assignments[team].add(judges[judgeIndex])
                if len(assignments[team]) >= limit:
                    numTeams -= 1
                judgeIndex += 1
                if len(judges) <= judgeIndex:
                    judgeIndex = 0

    result = defaultdict(list)

    for team, judges in assignments.items():
        for judge in judges:
            result[judge].append(team)

    return result

@judge_blueprint.route('/judge/autoassign', methods=['POST'])
def judge_autoassign():
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
        event_id= post_data.get('event_id')

        event = Event.query.filter_by(id=event_id).first()
        if event:
            # Auto assigning the Teams to the Judges
            # print("ANSHUL WAS HERE")
            data = {}
            for sc in list(event.school_list):
                data[sc] = list(School.query.filter_by(id=int(sc)).first().team_list)
            result = _auto_assign(data, event.judge_list)

            for jid, tl in result.items():
                judge = Judge.query.filter_by(id=jid).first()
                if judge:
                    # Add new Judge
                    judge.team_list = tl
                    db.session.commit()
                else:
                    response_object['message'] = 'Sorry. Event {} does not exist.'.format(event_id)
                    return jsonify(response_object), 400
            
            response_object['status'] = 'success'
            response_object['message'] = 'Auto assigned!'
            # response_object['data'] = '{}'.format(result)
            
            return jsonify(response_object), 201
        else:
            response_object['message'] = 'Sorry. That username already exists.'
            return jsonify(response_object), 400
    except exc.IntegrityError as e:
        db.session.rollback()
        return jsonify(response_object), 400

# @judge_blueprint.route('/judge/<judge_id>', methods=['GET'])
# def get_single_judge(judge_id):
#     """Get single Judge details"""
#     response_object = {
#         'status': 'fail',
#         'message': 'Judge does not exist'
#     }
#     try:
#         judge = Judge.query.filter_by(id=int(judge_id)).first()
#         if not judge:
#             return jsonify(response_object), 404
#         else:
#             response_object = {
#                 'status': 'success',
#                 'data': judge.to_json()
#             }
#             return jsonify(response_object), 200
#     except ValueError:
#         return jsonify(response_object), 404