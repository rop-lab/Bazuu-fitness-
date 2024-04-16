from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy


# Models go here!
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy_serializer import SerializerMixin

# Define metadata, instantiate db
metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})
db = SQLAlchemy(metadata=metadata)


class FitnessActivity(db.Model, SerializerMixin):
    __tablename__ = 'fitness_activities'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String)
    description = db.Column(db.String)
    duration = db.Column(db.Integer)
    picture = db.Column(db.String)

    def __repr__(self):
        return f'<FitnessActivity {self.title} | Description: {self.description} | Duration: {self.duration} minutes>'
