from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy_serializer import SerializerMixin
import re

# Define metadata, instantiate db
metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})
db = SQLAlchemy(metadata=metadata)

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    serialize_rules = ('-user_fitness_activities.user',)

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    password = db.Column(db.String(255), nullable=False)
    picture = db.Column(db.String, nullable=True)
    # Define relationship with UserFitnessActivity
    user_fitness_activities = db.relationship('UserFitnessActivity', back_populates='user', cascade='all, delete-orphan')

    fitness_activities = association_proxy('user_fitness_activities', 'fitness_activities',
                                 creator=lambda fitness_activity_obj: UserFitnessActivity(fitness_activity=fitness_activity_obj))

    def __repr__(self):
        return f'<User {self.username} | Email: {self.email}>'
    
    @validates('username')
    def validate_username(self, key, username):
        if not username:
            raise ValueError('Username is required')
        if len(username) > 50:
            raise ValueError('Username must be less than 50 characters')
        return username
    
    @validates('email')
    def validate_email(self, key, email):
        if not email:
            raise ValueError('Email is required')
        
        # Check email format using regular expression
        email_pattern = r'^[\w\.-]+@[\w\.-]+\.\w+$'
        if not re.match(email_pattern, email):
            raise ValueError('Invalid email format')

        return email

class FitnessActivity(db.Model, SerializerMixin):
    __tablename__ = 'fitness_activities'

    serialize_rules = ('-user_fitness_activities.fitness_activity',)

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String)
    description = db.Column(db.String)
    duration = db.Column(db.Integer)
    picture = db.Column(db.String)

    user_fitness_activities = db.relationship('UserFitnessActivity', back_populates='fitness_activity', cascade='all, delete-orphan')
    users = association_proxy('user_fitness_activities', 'users',
                                 creator=lambda user_obj: UserFitnessActivity(user=user_obj))

    def __repr__(self):
        return f'<FitnessActivity {self.title} | Description: {self.description} | Duration: {self.duration} minutes>'
    
    @validates('duration')
    def validate_duration(self, key, duration):
        if duration is None:
            raise ValueError('Duration is required')
        if duration <= 0:
            raise ValueError('Duration must be a positive number')
        return duration
    


class UserFitnessActivity(db.Model, SerializerMixin):
    __tablename__ = 'user_fitness_activities'

    serialize_rules = ('-user.user_fitness_activities','-fitness_activity.user_fitness_activities',)

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    fitness_activity_id = db.Column(db.Integer, db.ForeignKey('fitness_activities.id'), nullable=False)
    access = db.Column(db.String)

    # Define relationship with User and FitnessActivity
    user = db.relationship('User', back_populates='user_fitness_activities')
    fitness_activity = db.relationship('FitnessActivity', back_populates='user_fitness_activities')

    def __repr__(self):
        return f'<UserFitnessActivity User ID: {self.user_id} | FitnessActivity ID: {self.fitness_activity_id}>'
    
    @validates('access')
    def validate_access(self, key, access):
        if access not in ['owner', 'follower']:
            raise ValueError('Access must be either "owner" or "follower"')
        return access