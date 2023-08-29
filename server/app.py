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
            response = make_response({"errors": str(e)}, 422)
            return response

        db.session.add(vet)
        db.session.commit()

        session['vet_id'] = vet.id

        return make_response(vet.to_dict(), 201 )

api.add_resource(Vets, '/vets')

@app.route('/login' , methods= ['POST'])
def login():
    data = request.get_json()
    # ipdb.set_trace()
    try:
        vet = Vet.query.filter_by(name=data['name']).first()
        if vet.authenticate(data['password']):
            session['vet_id'] = vet.id
            response = make_response(vet.to_dict(rules = ('-soaps.vet', '-soaps.patients')), 200)
            return response
        else: 
            return make_response({'errors' :['password incorrect']}, 422)
    except:
        return make_response({'errors': ['name incorrect']}, 422)
    
@app.route('/authorized' , methods=['GET'])
def authorize():
    try:
        vet = Vet.query.filter_by(id=session.get('vet_id')).first()
        # ipdb.set_trace()
        response = make_response(vet.to_dict(), 200)
        return response
    except:
        return make_response({
            "error" : "User not found"
        }, 404)
    # rules = ('-soaps.vet', '-soaps,patients')

@app.route('/logout' , methods= ['DELETE'])
def logout():
    session.pop("vet_id")
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
        soaps = [s.to_dict() for s in Soap.query.filter_by(vet_id= session.get("vet_id"))]
        response= make_response(soaps, 200)
        return response


    def post(self):
        data = request.get_json()
        patient= int(data["patient_id"])

        # ipdb.set_trace()
        try:
            new_soap = Soap(
                ailment = data['ailment'],
                body= data['body'],
                created_at= data["created_at"],
                vet_id= session["vet_id"],
                patient_id= patient
            )
        except Exception as e: 
            response = make_response({'error': str(e)}, 400)
            return response

        db.session.add(new_soap)
        db.session.commit()

        soap_dict = new_soap.to_dict()
        response = make_response(soap_dict, 201)
        return response

        # return make_response(new_soap.to_dict(), 201 )
    
api.add_resource(Soaps, '/soaps')

class SoapById(Resource):
    def patch(self, id):
        soap = Soap.query.filter_by(id=id).first()

        if not soap:
            response = make_response({'error': 'Experience not found'}, 404)
            return response
        
        data = request.get_json()

        for attr in data:
            try:
                setattr(soap, attr, data[attr])
            except ValueError as e:
                response = make_response({"errors": [str(e)]})
    
        
        db.session.commit()

        soap_dict = soap.to_dict()
        response = make_response(soap_dict, 200)
        return response

# DELETE: deletes the soap from the database.
    def delete(self, id):
        soap = Soap.query.filter_by(id=id).first()

        if not soap:
            response = make_response({'error': 'Experience not found'}, 404)
            return response

        db.session.delete(soap)
        db.session.commit()

        response = make_response({} , 204)
        return response
    
api.add_resource(SoapById, '/soaps/<int:id>')

if __name__ == '__main__':
    app.run(port=5555, debug=True)