#!/usr/bin/env python3

# Standard library imports
from random import randint
from faker import Faker

# Local imports
from app import app, db  # Import Flask app and db instance
from models import FitnessActivity, User, UserFitnessActivity

if __name__ == '__main__':
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
                "picture": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_hEfhLpg-9x6cuJyyEqX9ir6487oGgrxvaQ&usqp=CAU"
            },
            {
                "title": "Squats",
                "description": "Squats are a compound movement that primarily targets the quadriceps, hamstrings, and glutes.",
                "duration": 15,
                "picture": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAAPYT0b6PGnI1fPZ0aj8Se5fgfNrBrkqrdg&usqp=CAU"
            },
            {
                "title": "Deadlifts",
                "description": "Deadlifts are a functional strength exercise that targets the posterior chain, including the lower back, glutes, and hamstrings.",
                "duration": 20,
                "picture": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuyfY7mAFaDfb_fnnOWRRZTvD8b5OgLED83si7-7dznAaMiczQPwwDwTmiDFybUFG3aXk&usqp=CAU"
            },
            {
                "title": "Pull ups",
                "description": "Pull-ups are a compound upper-body exercise that primarily targets the back and biceps.",
                "duration": 12,
                "picture": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvHtEnVdxSt1LYPYJeJU6TaNb4zeUBMJgEog&usqp=CAU"
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
        
        db.session.commit()

        print("Seed completed!")
