#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import Vet , db

if __name__ == '__main__':
    # fake = Faker()
    with app.app_context():
        print('Clearing database...')
        Vet.query.delete()

        print("Starting seed...")
        

        print("Seeding users...")
        #Users Seed
        v1= Vet (name = 'Bowski', email = 'bowski@mail.com', password_hash = 'password' , specialty = 'Dermasurgery')
        v2 = Vet (name = 'Amyfree', email = 'amyfree@mail.com', password_hash = 'password', specialty= 'Ophthalmology')
        v3 = Vet (name = 'Jesspapa', email = 'jesspapa@mail.com', password_hash = 'password', specialty = 'Oncology')

        vets = [v1, v2, v3]
        db.session.add_all(vets)
        db.session.commit()

        print("Done seeding")