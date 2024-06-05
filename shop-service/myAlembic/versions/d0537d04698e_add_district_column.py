"""add district column

Revision ID: d0537d04698e
Revises: 8444f7466e7f
Create Date: 2024-05-28 15:16:28.795313

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'd0537d04698e'
down_revision: Union[str, None] = '8444f7466e7f'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('shops', sa.Column('district', sa.String(), nullable=True))
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('shops', 'district')
    # ### end Alembic commands ###