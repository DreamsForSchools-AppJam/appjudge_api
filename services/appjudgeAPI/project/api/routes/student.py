# services/appjudgeAPI/project/api/routes/student.py

from flask import Blueprint, jsonify, request
from project.api.models.Team import Team
from project.api.models.Student import Student
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

                # Add new Student's id to Student
                student = Student.query.filter_by(name=name, team_id=team_id).first()
                team.add_student(student.id)
                db.session.commit()

                response_object['status'] = 'success'
                response_object['message'] = f'{name} was added!'

                # TODO: remove additional responses
                response_object['student_list'] = student.to_json()
                return jsonify(response_object), 201
            else:
                response_object['message'] = 'Sorry. Team {} does not exist.'.format(team_id)
                return jsonify(response_object), 400
        else:
            response_object['message'] = 'Sorry. student {} does not exist.'.format(name)
            return jsonify(response_object), 400
            
    except exc.IntegrityError as e:
        db.session.rollback()
        return jsonify(response_object), 400

@student_blueprint.route('/student/<team_id>', methods=['GET'])
def get_single_student(team_id):
    """Get single Student details"""
    response_object = {
        'status': 'fail',
        'message': 'Student does not exist'
    }
    try:
        student = student.query.filter_by(id=int(team_id)).first()
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

@student_blueprint.route('/student/remove/<student_id>', methods=['GET'])
def remove_student(student_id):
    """Remove single Student details"""
    response_object = {
        'status': 'fail',
        'message': 'Student does not exist'
    }
    try:
        student = Student.query.filter_by(id=int(student_id)).first()
        if not student:
            return jsonify(response_object), 404
        else:
            team = Team.query.filter_by(id=student.team_id).first()
            if team:
                temp = team.student_list
                temp.remove(student.id)
                team.student_list = temp
            db.session.delete(student)
            db.session.commit()
            response_object = {
                'status': 'success',
                'message': "Student removed"
            }
            return jsonify(response_object), 200
    except ValueError:
        return jsonify(response_object), 404