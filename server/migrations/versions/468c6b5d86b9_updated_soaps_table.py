"""updated soaps table

Revision ID: 468c6b5d86b9
Revises: 1bd928c4a8cf
Create Date: 2023-08-19 14:12:58.541984

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '468c6b5d86b9'
down_revision = '1bd928c4a8cf'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('soaps', schema=None) as batch_op:
        batch_op.alter_column('created_at',
               existing_type=sa.DATETIME(),
               type_=sa.String(),
               existing_nullable=True,
               existing_server_default=sa.text('(CURRENT_TIMESTAMP)'))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('soaps', schema=None) as batch_op:
        batch_op.alter_column('created_at',
               existing_type=sa.String(),
               type_=sa.DATETIME(),
               existing_nullable=True,
               existing_server_default=sa.text('(CURRENT_TIMESTAMP)'))

    # ### end Alembic commands ###