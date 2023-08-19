from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.ext.hybrid import hybrid_property, hybrid_method
from sqlalchemy.orm import validates


from config import db, bcrypt




class Vet(db.Model , SerializerMixin):
    __tablename__ = 'vets'

    id = db. Column(db.Integer, primary_key= True)
    name = db.Column(db.String)
    specialty = db.Column(db.String)
    email = db.Column(db.String)
    

    soaps = db.relationship('Soap' , back_populates= 'vet', cascade='all, delete-orphan')
    patients = association_proxy('soaps' , 'patient')


    _password_hash = db.Column(db.String)

    serialize_rules= ("-_password_hash", "-soaps.vet")

    @property
    def password_hash(self):
        return self._password_hash
    
    
    @password_hash.setter
    def password_hash(self, new_password_string):

        plain_byte_obj = new_password_string.encode("utf-8")

        encrypted_hash_object = bcrypt.generate_password_hash(plain_byte_obj)

        hash_object_as_string = encrypted_hash_object.decode('utf-8')

        self._password_hash = hash_object_as_string

    def authenticate(self , some_string):
        return bcrypt.check_password_hash(
            self._password_hash,
            some_string.encode('utf-8')
        )


class Soap(db.Model, SerializerMixin):
    __tablename__ = 'soaps'

    id = db.Column(db.Integer , primary_key= True)
    ailment = db.Column(db.String)
    body = db.Column(db.String)
    created_at = db.Column(db.String)

    vet_id = db.Column(db.Integer , db.ForeignKey('vets.id'))
    patient_id = db.Column(db.Integer , db.ForeignKey('patients.id'))


    vet = db.relationship('Vet', back_populates='soaps')
    patient = db.relationship('Patient', back_populates="soaps")

    serialize_rules = ("-vet.soaps", "-patient.soaps")


class Patient(db.Model , SerializerMixin):
    __tablename__ = 'patients'

    id = db.Column(db.Integer , primary_key= True)
    name = db.Column(db.String)
    age = db.Column(db.Integer)
    species = db.Column(db.String)

    soaps = db.relationship('Soap' , back_populates= 'patient')
    vets = association_proxy('soaps' , 'vet')

    serialize_rules = ('-soaps.patient',)