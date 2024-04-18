#!/usr/bin/env python3

# Standard library imports
from random import randint
from faker import Faker # type: ignore

# Local imports
from app import app, db  # Import Flask app and db instance
from models import FitnessActivity, User, UserFitnessActivity

if __name__ == '_main_':
    fake = Faker()
    
    # Initialize Flask app context
    with app.app_context():
        print("Starting seed...")
        
        # Clear existing data (optional)
        db.drop_all()
        db.create_all()
        
        # Seed code

        for _ in range(4):
            user = User(
                username=fake.user_name(),
                email=fake.email(),
                password=fake.password(),
                picture="https://picsum.photos/983/458" # Add a fake picture URL for each user
            )
            db.session.add(user)

        dan = User(username='dan',
                email='danspmunene@gmail.com',
                password="munene",
                picture="https://picsum.photos/983/458" # Add a fake picture URL for each user 
                )
        db.session.add(dan)

        activities_data = [
            {
                "title": "Push-Ups",
                "description": "Push-ups are a fundamental bodyweight exercise that targets the chest, shoulders, and triceps.",
                "duration": 10,
                "picture": "https://images.unsplash.com/photo-1649789248266-ef1c7f744f6f?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            },
            {
                "title": "Squats",
                "description": "Squats are a compound movement that primarily targets the quadriceps, hamstrings, and glutes.",
                "duration": 15,
                "picture": "https://images.unsplash.com/photo-1567598508481-65985588e295?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8NDB8QlNCYjdTN0FWTkl8fGVufDB8fHx8fA%3D%3D"
            },
            {
                "title": "Deadlifts",
                "description": "Deadlifts are a functional strength exercise that targets the posterior chain, including the lower back, glutes, and hamstrings.",
                "duration": 20,
                "picture": "https://images.unsplash.com/photo-1605296867304-46d5465a13f1?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            },
            {
                "title": "Pull ups",
                "description": "Pull-ups are a compound upper-body exercise that primarily targets the back and biceps.",
                "duration": 12,
                "picture": "https://images.unsplash.com/photo-1605296867424-35fc25c9212a?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
        ]
        
        users = User.query.all()  # Get all users
        for index, activity_data in enumerate(activities_data):
            activity = FitnessActivity(
                title=activity_data["title"],
                description=activity_data["description"],
                duration=activity_data["duration"],
                picture=activity_data["picture"]
            )
            db.session.add(activity)
            user_activity = UserFitnessActivity(user=users[index], fitness_activity=activity, access="owner")
            db.session.add(user_activity)

        fitness_activity_id_3 = FitnessActivity.query.filter_by(id=3).first()
        
        # Create a new UserFitnessActivity instance for Dan as a follower
        dan_follower_activity = UserFitnessActivity(user=dan, fitness_activity=fitness_activity_id_3, access="follower")
        db.session.add(dan_follower_activity)
        
        db.session.commit()

        print("Seed completed!")