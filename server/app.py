#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import Flask, jsonify, request, make_response, session
from flask_cors import CORS
from flask_migrate import Migrate
from flask_restful import Api, Resource


# Local imports
from models import FitnessActivity, db, User, UserFitnessActivity

# Instantiate app, set attributes
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'secret_key'
app.json.compact = False

migrate = Migrate(app, db)
db.init_app(app)

# Instantiate REST API
api = Api(app)

# Instantiate CORS
CORS(app)



# Views go here!

@app.route('/')
def index():
    return '<h1>Bazuu Fitness</h1>'

class FitnessActivities(Resource):

    def get(self):
        activities = [activity.to_dict() for activity in FitnessActivity.query.all()]
        return make_response(jsonify(activities), 200)

    def post(self):
        if 'user_id' not in session:
            return make_response(jsonify({'error': 'User not logged in'}), 401)
        
        data = request.get_json()

        new_activity = FitnessActivity(
            title=data['title'],
            description=data['description'],
            duration=data['duration'],
            picture=data['picture'],
        )

        db.session.add(new_activity)
        db.session.commit()

        return make_response(jsonify(new_activity.to_dict()), 201)


api.add_resource(FitnessActivities, '/fitness-activities')


class FitnessActivityByID(Resource):

    def get(self, id):
        activity = FitnessActivity.query.filter_by(id=id).first().to_dict()
        return make_response(jsonify(activity), 200)
    
    def patch(self, id):
        activity = FitnessActivity.query.filter_by(id=id).first()
        if not activity:
            return make_response(jsonify({'error': 'Fitness activity not found'}), 404)

        data = request.get_json()

        # Update the attributes of the activity
        activity.title = data.get('title', activity.title)
        activity.description = data.get('description', activity.description)
        activity.duration = data.get('duration', activity.duration)
        activity.picture = data.get('picture', activity.picture)

        # Commit the changes to the database
        db.session.commit()

        return make_response(jsonify(activity.to_dict()), 200)
    
    def delete(self, id):
        activity = FitnessActivity.query.filter_by(id=id).first()

        db.session.delete(activity)
        db.session.commit()

        return '', 204


api.add_resource(FitnessActivityByID, '/fitness-activities/<int:id>')

class Users(Resource):
    def get(self):
        users = [user.to_dict() for user in User.query.all()]
        return make_response(jsonify(users), 200)

    def post(self):
        data = request.get_json()

        # Check if the email already exists
        existing_user = User.query.filter_by(email=data['email']).first()
        if existing_user:
            return make_response(jsonify({'error': 'Email already exists'}), 400)

        # Create a new user
        new_user = User(
            username=data['username'],
            email=data['email'],
            password=data['password'],  # Use password property
            picture=data.get('picture')  # Optionally allow picture to be provided
        )

        # Add the new user to the database
        db.session.add(new_user)
        db.session.commit()

        return make_response(jsonify(new_user.to_dict()), 201)

api.add_resource(Users, '/users')



class UserByID(Resource):
    def get(self, id):
        user = User.query.filter_by(id=id).first().to_dict()
        return make_response(jsonify(user), 200)

    def patch(self, id):
        user = User.query.filter_by(id=id).first()
        data = request.get_json()

        for key, value in data.items():
            setattr(user, key, value)

        db.session.commit()

        return make_response(jsonify(user.to_dict()), 200)

    def delete(self, id):
        user = User.query.filter_by(id=id).first()

        db.session.delete(user)
        db.session.commit()

        return '', 204


api.add_resource(UserByID, '/users/<int:id>')

class UserFitnessActivities(Resource):
    def get(self):
        user_fitness_activities = [ufa.to_dict() for ufa in UserFitnessActivity.query.all()]
        return make_response(jsonify(user_fitness_activities), 200)

    def post(self):
        if 'user_id' not in session:
            return make_response(jsonify({'error': 'User not logged in'}), 401)

        data = request.get_json()

        new_user_fitness_activity = UserFitnessActivity(
            user_id=session['user_id'],  # Assuming you store user_id in the session
            fitness_activity_id=data['fitness_activity_id'],
            access=data['access']
        )

        db.session.add(new_user_fitness_activity)
        db.session.commit()

        return make_response(jsonify(new_user_fitness_activity.to_dict()), 201)


api.add_resource(UserFitnessActivities, '/user-fitness-activities')


class UserFitnessActivityByID(Resource):
    def get(self, id):
        user_fitness_activity = UserFitnessActivity.query.filter_by(id=id).first().to_dict()
        return make_response(jsonify(user_fitness_activity), 200)

    def patch(self, id):
        user_fitness_activity = UserFitnessActivity.query.filter_by(id=id).first()
        data = request.get_json()

        for key, value in data.items():
            setattr(user_fitness_activity, key, value)

        db.session.commit()

        return make_response(jsonify(user_fitness_activity.to_dict()), 200)

    def delete(self, id):
        user_fitness_activity = UserFitnessActivity.query.filter_by(id=id).first()

        db.session.delete(user_fitness_activity)
        db.session.commit()

        return '', 204


api.add_resource(UserFitnessActivityByID, '/user-fitness-activities/<int:id>')

class Login(Resource):
    def post(self):
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')
        
        if not email or not password:
            return {'message': 'Email and password are required'}, 400
        
        user = User.query.filter_by(email=email).first()
        if user and user.check_password(password):
            session['user_id'] = user.id
            return user.to_dict(), 200
        
        return {'error': 'Invalid email or password'}, 401


class Logout(Resource):
    def delete(self):
        if 'user_id' in session:
            session.pop('user_id')
        return '', 204

class CheckSession(Resource):
    def get(self):
        if 'user_id' in session:
            user_id = session['user_id']
            user = User.query.get(user_id)
            if user:
                return user.to_dict(), 200  # Return a dictionary instead of a Response object
            else:
                return {'message': 'User not found'}, 404
        else:
            return {'message': 'Unauthorized'}, 401  # Return a dictionary instead of an empty string


# Add resources to the API
api.add_resource(Login, '/login')
api.add_resource(Logout, '/logout')
api.add_resource(CheckSession, '/check_session')



if __name__ == '__main__':
    app.run(port=5555, debug=True)


