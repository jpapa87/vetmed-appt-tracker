# Remote library imports
from flask import request, make_response, session
from flask_restful import Resource
import ipdb

# Local imports
from config import app, db, api




@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    try:
        user = User.query.filter_by(username=data['username']).first()
        if user.authenticate(data['password']):
            session['user_id'] = user.id
            # response = make_response(user.to_dict(rules = ('-visits.user', '-visits.haunted_location', '-visits.experience')), 200)
            return response
        else:
            return make_response({'error': 'name or password incorrect'}, 401)
    except:
        return make_response({'error': 'name or password incorrect'}, 401)

# TO GRAB USER IF IN SESSION
@app.route('/authorized', methods=['GET'])
def authorize():
    try:
        user = User.query.filter_by(id=session.get('user_id')).first()
        TODO # response = make_response(user.to_dict(rules = ('-visits.user', '-visits.haunted_location', '-visits.experience')), 200) \
        return response
    except:
        return make_response({
            "error": "User not found"
        }, 404)
    
@app.route('/logout', methods=['DELETE'])
def logout():
    session['user_id'] = None
    return make_response('', 204)




if __name__ == '__main__':
    app.run(port=5555, debug=True)