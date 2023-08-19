# Remote library imports
from flask import request, make_response, session
from flask_restful import Resource
import ipdb
from models import Vet , Patient , Soap

# Local imports
from config import app, db, api

@app.route('/')
def index():
    return '<h1>Phase 5 VetNotes Project</h1>'
class Vets(Resource):
    def post(self):
        data = request.get_json()
        try:
            vet = Vet(
                name = data['name'],
                password_hash = data['password'],
                email = data['email'],
                specialty = data['specialty']
            )
        except ValueError as e:
            response = make_response({"errors": [str(e)]}, 400)
            return response

        db.session.add(vet)
        db.session.commit()

        session['vet.id'] = vet.id

        return make_response(vet.to_dict(), 201 )

api.add_resource(Vets, '/vets')

@app.route('/login' , methods= ['POST'])
def login():
    data = request.get_json()
    # ipdb.set_trace()
    try:
        vet = Vet.query.filter_by(name=data['name']).first()
        if vet.authenticate(data['password']):
            session['vet.id'] = vet.id
            response = make_response(vet.to_dict(), 200)
            return response
        else: 
            return make_response({'error' :'name or password incorrect'}, 401)
    except:
        return make_response({'error': 'name or password incorrect'}, 401)
    
@app.route('/authorized' , methods=['GET'])
def authorize():
    try:
        vet = Vet.query.filter_by(id=session.get('vet.id')).first()
        response = make_response(vet.to_dict(), 200)
        return response
    except:
        return make_response({
            "error" : "User not found"
        }, 404)

@app.route('/logout' , methods= ['DELETE'])
def logout():
    session['vet.id'] = None
    return make_response('' , 204)


class Patients(Resource):
    def get(self):
        patients= [p.to_dict() for p in Patient.query.all()]
        response= make_response(patients, 200)
        return response


    def post(self):
        data = request.get_json()
        try:
            patient = Patient(
                name = data['name'],
                age = data['age'],
                species= data['species'],
            )
        except ValueError as e:
            response = make_response({"errors": [str(e)]}, 400)
            return response

        db.session.add(patient)
        db.session.commit()

        return make_response(patient.to_dict(), 201 )

api.add_resource(Patients, '/patients')


class Soaps(Resource):
    def get(self):
        soaps= [s.to_dict() for s in Soap.query.all()]
        response= make_response(soaps, 200)
        return response


    def post(self):
        data = request.get_json()
        try:
            soap = Soap(
                ailment = data['ailment'],
                body= data['body'],
                created_at= data ["created_at"],
                vet_id= data ["vet_id"],
                patient_id= data ["patient_id"]
            )
        except ValueError as e:
            response = make_response({"errors": [str(e)]}, 400)
            return response

        db.session.add(soap)
        db.session.commit()

        return make_response(soap.to_dict(), 201 )
    
api.add_resource(Soaps, '/soaps')

class SoapById(Resource):
    def patch(self, id):
        soap = Soap.query.filter(Soap.id == id).first()
        data = request.get_json()
        for attr in data:
            setattr(soap, attr, data[attr])
        
        db.session.commit()
        response_dict = soap.to_dict()
        response = make_response(response_dict, 200)
        return response

# DELETE /messages/<int:id>: deletes the soap from the database.
    def delete(self, id):
        soap = Soap.query.filter(Soap.id == id).first()
        db.session.delete(soap)
        db.session.commit()

        response = make_response({} , 204)
        return response
    
api.add_resource(SoapById, '/soaps/<int:id>')

if __name__ == '__main__':
    app.run(port=5555, debug=True)