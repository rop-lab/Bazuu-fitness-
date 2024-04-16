#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import Flask, jsonify, request, make_response
from flask_cors import CORS
from flask_migrate import Migrate
from flask_restful import Api, Resource



# Local imports
from models import FitnessActivity, db

# Instantiate app, set attributes
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
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
        data = request.get_json()

        for key, value in data.items():
            setattr(activity, key, value)

        db.session.commit()

        return make_response(jsonify(activity.to_dict()), 200)
    
    def delete(self, id):
        activity = FitnessActivity.query.filter_by(id=id).first()

        db.session.delete(activity)
        db.session.commit()

        return '', 204


api.add_resource(FitnessActivityByID, '/fitness-activities/<int:id>')


if __name__ == '__main__':
    app.run(port=5555, debug=True)


