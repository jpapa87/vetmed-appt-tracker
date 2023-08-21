#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import Vet , db , Patient , Soap

if __name__ == '__main__':
    # fake = Faker()
    with app.app_context():
        print('Clearing database...')
        Vet.query.delete()
        Patient.query.delete()
        Soap.query.delete()
        db.session.commit()

        print("Starting seed...")
        

        print("Seeding vets...")
        #Vets Seed
        v1= Vet (name = 'Bowski', email = 'bowski@mail.com', password_hash = 'password' , specialty = 'Dermasurgery')
        v2 = Vet (name = 'Amyfree', email = 'amyfree@mail.com', password_hash = 'password', specialty= 'Ophthalmology')
        v3 = Vet (name = 'Jesspapa', email = 'jesspapa@mail.com', password_hash = 'password', specialty = 'Oncology')

        vets = [v1, v2, v3]
        db.session.add_all(vets)

        print("Seeding patients...")
        #Patients Seed
        p1= Patient(name = "Potato" , age= "8" , species= "feline")
        p2= Patient(name = "Buster Douglas" , age= "10" , species= "Canine")
        p3= Patient(name = "Nala" , age= "9" , species= "Canine")

        patients = [p1, p2, p3]

        db.session.add_all(patients)
        db.session.commit()

        #Soap Seed
        s1= Soap( ailment= "broken nail" , body= "Potato presents with a broken toenail, area was shaved cleaned and nail was trimmed. PT is BAR and a recheck is recommeneded in 1 week" , created_at= "10/31/22" , vet_id= 1 , patient_id= 1)
        s2= Soap( ailment= "vomitting" , body= "Buster was assesesd for vomiting. PT is BAR, suggest bland diet. Sent home with Cerenia, if vomitting continues please recheck with your primary vet." , created_at= "10/31/22" , vet_id= 2 , patient_id= 2)
        s3= Soap( ailment= "diarrhea" , body= "Nala has been having episodes of diarrhea, she is otherwise healthy. PT is BAR, vitals are normal. Suggest a bland diet and sent home with Metronidozole." , created_at= "10/31/22" , vet_id= 3 , patient_id= 3)

        soaps = [s1, s2, s3]

        db.session.add_all(soaps)
        db.session.commit()


        print("Done seeding")