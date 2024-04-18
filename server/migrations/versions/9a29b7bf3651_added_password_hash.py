"""Added password hash

Revision ID: 9a29b7bf3651
Revises: 513854416fad
Create Date: 2024-04-17 16:34:34.780767

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '9a29b7bf3651'
down_revision = '513854416fad'
branch_labels = None
depends_on = None


def upgrade():
    # Drop the existing 'users' table
    op.drop_table('users')

    # Create a new 'users' table
    op.create_table(
        'users',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('username', sa.String(length=50), nullable=False),
        sa.Column('email', sa.String(length=255), nullable=False),
        sa.Column('_password_hash', sa.String(), nullable=False),
        sa.Column('picture', sa.String(), nullable=True),
        sa.PrimaryKeyConstraint('id'),
        sa.UniqueConstraint('username'),
        sa.UniqueConstraint('email')
    )

def downgrade():
    # Drop the new 'users' table
    op.drop_table('users')

    # Recreate the old 'users' table
    op.create_table(
        'users',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('username', sa.String(length=50), nullable=False),
        sa.Column('email', sa.String(length=255), nullable=False),
        sa.Column('password', sa.String(length=255), nullable=False),  # Recreate the old 'password' column
        sa.Column('picture', sa.String(), nullable=True),
        sa.PrimaryKeyConstraint('id'),
        sa.UniqueConstraint('username'),
        sa.UniqueConstraint('email')
    )

    # Drop the temporary table created during the previous migration
    op.execute("DROP TABLE IF EXISTS _alembic_tmp_users")