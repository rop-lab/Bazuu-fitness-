"""Added User and UserActivity models

Revision ID: 69257f05318e
Revises: cfcac42e9497
Create Date: 2024-04-17 10:59:02.348014

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '69257f05318e'
down_revision = 'cfcac42e9497'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(length=50), nullable=False),
    sa.Column('email', sa.String(length=255), nullable=False),
    sa.Column('password', sa.String(length=255), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('username')
    )
    op.create_table('user_activities',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('fitness_activity_id', sa.Integer(), nullable=False),
    sa.Column('access', sa.String(), nullable=True),
    sa.ForeignKeyConstraint(['fitness_activity_id'], ['fitness_activities.id'], name=op.f('fk_user_activities_fitness_activity_id_fitness_activities')),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], name=op.f('fk_user_activities_user_id_users')),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('user_activities')
    op.drop_table('users')
    # ### end Alembic commands ###
