#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import User

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        pass
        # print('Clearing database...')
        # User.query.delete()
        # HauntedLocation.query.delete()
        # Visit.query.delete()
        # Experience.query.delete()