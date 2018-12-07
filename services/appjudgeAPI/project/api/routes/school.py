# services/appschoolAPI/project/api/routes/school.py

from flask import Blueprint, jsonify, request
from project.api.models.Team import Team
from project.api.models.School import School
from project.api.models.Student import Student
from project.api.models.Mentor import Mentor
from project.api.models.Event import Event
from project import db
from sqlalchemy import exc

school_blueprint = Blueprint('school', __name__)

@school_blueprint.route('/schools', methods=['GET'])
def get_all_schools():
    """Get all schools"""
    response_object = {
        'status': 'success',
        'data': {
            'schools': [school.to_json() for school in School.query.all()]
        }
    }
    return jsonify(response_object), 200

@school_blueprint.route('/school', methods=['POST'])
def add_school():
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
        event_id = post_data.get('event_id')

        school = School.query.filter_by(name=name, event_id=event_id).first()
        if not school:
            event = Event.query.filter_by(id=event_id).first()
            if event:
                # Add new School
                db.session.add(School(
                    name=name,
                    info=info,
                    event_id=event_id))
                db.session.commit()

                # Add new School's id to Event
                school = School.query.filter_by(name=name, event_id=event_id).first()
                event.add_school(school.id)
                db.session.commit()

                response_object['status'] = 'success'
                response_object['message'] = f'{name} was added!'

                # TODO: remove additional responses
                response_object['school_list'] = event.to_json()
                return jsonify(response_object), 201
            else:
                response_object['message'] = 'Sorry. Event {} does not exist.'.format(event_id)
                return jsonify(response_object), 400
        else:
            response_object['message'] = 'Sorry. That School already exists.'
            return jsonify(response_object), 400
    except exc.IntegrityError as e:
        db.session.rollback()
        return jsonify(response_object), 400

@school_blueprint.route('/school/<school_id>', methods=['GET'])
def get_single_school(school_id):
    """Get single school details"""
    response_object = {
        'status': 'fail',
        'message': 'school does not exist'
    }
    try:
        school = School.query.filter_by(id=int(school_id)).first()
        if not school:
            return jsonify(response_object), 404
        else:
            response_object = {
                'status': 'success',
                'data': school.to_json()
            }
            return jsonify(response_object), 200
    except ValueError:
        return jsonify(response_object), 404

@school_blueprint.route('/school/remove/<school_id>', methods=['GET'])
def remove_school(school_id):
    """Remove single School details"""
    response_object = {
        'status': 'fail',
        'message': 'School does not exist'
    }
    try:
        school = School.query.filter_by(id=int(school_id)).first()
        if not school:
            return jsonify(response_object), 404
        else:
            event = Event.query.filter_by(id=school.event_id).first()
            if event:
                temp = event.school_list
                temp.remove(school.id)
                event.school_list = temp
            for t in school.team_list:
                team = Team.query.filter_by(id=int(t)).first()
                if team:
                    for st in team.student_list:
                        student = Student.query.filter_by(id=int(st)).first()
                        if student:
                            db.session.delete(student)
                    for mt in team.mentor_list:
                        mentor = Mentor.query.filter_by(id=int(mt)).first()
                        if mentor:
                            db.session.delete(mentor)
                    db.session.delete(team)
            db.session.delete(school)
            db.session.commit()
            response_object = {
                'status': 'success',
                'message': "School removed"
            }
            return jsonify(response_object), 200
    except ValueError:
        return jsonify(response_object), 404