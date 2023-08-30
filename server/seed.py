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
        v4 = Vet (name = 'Eddie Brodsky', email = 'vetnotes@vetnotes.com', password_hash = 'password', specialty = 'Oncology')
        v5 = Vet (name = 'Jill MacLeese', email = 'vetnotes@vetnotes.com', password_hash = 'password', specialty = 'Ophthalmology')
        v6 = Vet (name = 'Gina Barone', email = 'vetnotes@vetnotes.com', password_hash = 'password', specialty = 'Neurology')

        vets = [v1, v2, v3, v4, v5, v6]
        db.session.add_all(vets)

        print("Seeding patients...")
        #Patients Seed
        p1= Patient(name = "Potato" , age= "8" , species= "Feline : DSH")
        p2= Patient(name = "Buster Douglas" , age= "10" , species= "Canine : Jack Russell Mix")
        p3= Patient(name = "Nala" , age= "9" , species= "Canine : Lab/Pitbull Mix")
        p4= Patient(name = "Teddy" , age= "1" , species= "Canine : Cavapoo")
        p5= Patient(name = "Frankie" , age= "5" , species= "Canine : Cavapoo" )
        p6= Patient(name = "Duke" , age= "10" , species= "Canine : German Shepard")


        patients = [p1, p2, p3, p4, p5, p6]

        db.session.add_all(patients)
        db.session.commit()

        #Soap Seed
        s1= Soap( ailment= "broken nail" , body= "Potato presents with a broken toenail, area was shaved cleaned and nail was trimmed. PT is BAR and a recheck is recommeneded in 1 week" , created_at= "7/20/22" , vet_id= 1 , patient_id= 1)

        s2= Soap( ailment= "vomitting" , body= "Buster was assesesd for vomiting. PT is BAR, suggest bland diet. Sent home with Cerenia, if vomitting continues please recheck with your primary vet." , created_at= "4/3/22" , vet_id= 2 , patient_id= 2)

        s3= Soap( ailment= "Mast Cell Tumor" , body= "Buster presents with a moderate size lump on his left shoulder. Fine needle aspirate was performed and sent out to the lab to confirm it is a MCT and what grade it is. Surgery is recommended to remove MCT, CBC/chem is to be done prior to surgery. Met check was recommened but Owner declined. Please schedule an appointment with Dr. Carver for surgical procedure. Recheck with Dr. Brodsky 2 weeks post op." , created_at= "10/2/22" , vet_id= 4, patient_id= 2)

        s4= Soap( ailment= "Dry eye" , body= "Teddy has been squinting his left eye, tear test shows a bit of dry eye OS, suggested optixcare in left eye 2 times a day. Please recheck in 3 weeks" , created_at= "11/23/22" , vet_id= 5 , patient_id= 5)

        s5= Soap( ailment= "Neurology recheck" , body= "Nala is being seen for a recheck due to being down on the hind end. She has done physical therapy in house and have responded well. Currently walking arounf very well as per owner. PT is BAR, vitals are normal." , created_at= "12/3/22" , vet_id= 6 , patient_id= 3)

        s6= Soap( ailment= "lethargic" , body= "Duke has been showing signs of lethargy, vitals are normal. Owner states that Duke has also vomited 3 times today. Possible foreign body, suggested abdominal x-rays and to see surgery" , created_at= "1/3/22" , vet_id= 6 , patient_id= 6)

        soaps = [s1, s2, s3, s4, s5, s6]

        db.session.add_all(soaps)
        db.session.commit()


        print("Done seeding")