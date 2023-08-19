"""soaps third times a charm

Revision ID: aa13d89e9b11
Revises: 468c6b5d86b9
Create Date: 2023-08-19 14:23:55.778514

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'aa13d89e9b11'
down_revision = '468c6b5d86b9'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('soaps', schema=None) as batch_op:
        batch_op.drop_column('name')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('soaps', schema=None) as batch_op:
        batch_op.add_column(sa.Column('name', sa.VARCHAR(), nullable=True))

    # ### end Alembic commands ###
