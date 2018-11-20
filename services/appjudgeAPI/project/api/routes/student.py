# services/appjudgeAPI/project/api/routes/student.py

from flask import Blueprint, jsonify, request
from project.api.models.Student import Student
from project.api.models.Team import Team
from project import db
from sqlalchemy import exc

student_blueprint = Blueprint('student', __name__)

@student_blueprint.route('/students', methods=['GET'])
def get_all_students():
    """Get all students"""
    response_object = {
        'status': 'success',
        'data': {
            'students': [student.to_json() for student in Student.query.all()]
        }
    }
    return jsonify(response_object), 200

@student_blueprint.route('/student', methods=['POST'])
def add_student():
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

        student = Student.query.filter_by(name=name, team_id=team_id).first()
        if not student:
            team = Team.query.filter_by(id=team_id).first()
            if team:
                # Add new Student
                db.session.add(Student(
                    name=name,
                    info=info,
                    team_id=team_id))
                db.session.commit()

                # Add new Student's id to Team
                student = Student.query.filter_by(name=name, team_id=team_id).first()
                team.add_student(student.id)
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

@student_blueprint.route('/student/<student_id>', methods=['GET'])
def get_single_student(student_id):
    """Get single Student details"""
    response_object = {
        'status': 'fail',
        'message': 'Student does not exist'
    }
    try:
        student = student.query.filter_by(id=int(student_id)).first()
        if not student:
            return jsonify(response_object), 404
        else:
            response_object = {
                'status': 'success',
                'data': student.to_json()
            }
            return jsonify(response_object), 200
    except ValueError:
        return jsonify(response_object), 404
