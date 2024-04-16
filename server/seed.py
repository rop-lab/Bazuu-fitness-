#!/usr/bin/env python3

# Standard library imports
from random import randint
from datetime import datetime
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
        for _ in range(3):
            title = fake.sentence()
            date = fake.date_object()
            duration = randint(10, 120)
            picture = fake.image_url(width=400, height=300)
            activity = FitnessActivity(title=title, date=date, duration=duration, picture=picture)
            db.session.add(activity)
        
        db.session.commit()
        print("Seed completed!")
