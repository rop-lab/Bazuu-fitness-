#!/usr/bin/env python3

# Standard library imports
from random import randint
from faker import Faker

# Local imports
from app import app, db  # Import Flask app and db instance
from models import FitnessActivity

if __name__ == '__main__':
    fake = Faker()
    
    # Initialize Flask app context
    with app.app_context():
        print("Starting seed...")
        
        # Clear existing data (optional)
        db.drop_all()
        db.create_all()
        
        # Seed code
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
                "picture": "data:image/jpeg;base64,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"
            },
            {
                "title": "Deadlifts",
                "description": "Deadlifts are a functional strength exercise that targets the posterior chain, including the lower back, glutes, and hamstrings.",
                "duration": 20,
                "picture": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuyfY7mAFaDfb_fnnOWRRZTvD8b5OgLED83si7-7dznAaMiczQPwwDwTmiDFybUFG3aXk&usqp=CAU"
            }
        ]
        
        for activity_data in activities_data:
            activity = FitnessActivity(
                title=activity_data["title"],
                description=activity_data["description"],
                duration=activity_data["duration"],
                picture=activity_data["picture"]
            )
            db.session.add(activity)
        
        db.session.commit()
        print("Seed completed!")