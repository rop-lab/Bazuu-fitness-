"""Changed to user fitness activity model

Revision ID: 92ad2918cc30
Revises: 69257f05318e
Create Date: 2024-04-17 11:08:16.957567

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '92ad2918cc30'
down_revision = '69257f05318e'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('user_fitness_activities',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('fitness_activity_id', sa.Integer(), nullable=False),
    sa.Column('access', sa.String(), nullable=True),
    sa.ForeignKeyConstraint(['fitness_activity_id'], ['fitness_activities.id'], name=op.f('fk_user_fitness_activities_fitness_activity_id_fitness_activities')),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], name=op.f('fk_user_fitness_activities_user_id_users')),
    sa.PrimaryKeyConstraint('id')
    )
    op.drop_table('user_activities')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('user_activities',
    sa.Column('id', sa.INTEGER(), nullable=False),
    sa.Column('user_id', sa.INTEGER(), nullable=False),
    sa.Column('fitness_activity_id', sa.INTEGER(), nullable=False),
    sa.Column('access', sa.VARCHAR(), nullable=True),
    sa.ForeignKeyConstraint(['fitness_activity_id'], ['fitness_activities.id'], name='fk_user_activities_fitness_activity_id_fitness_activities'),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], name='fk_user_activities_user_id_users'),
    sa.PrimaryKeyConstraint('id')
    )
    op.drop_table('user_fitness_activities')
    # ### end Alembic commands ###