"""Create DB

Revision ID: ebae70d9a589
Revises: 
Create Date: 2024-04-16 11:13:03.302668

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'ebae70d9a589'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    op.create_table('fitness_activities',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('title', sa.String(), nullable=True),
        sa.Column('date', sa.Date(), nullable=True),
        sa.Column('duration', sa.Integer(), nullable=True),
        sa.Column('picture', sa.String(), nullable=True),
        sa.PrimaryKeyConstraint('id')
    )

def downgrade():
    op.drop_table('fitness_activities')