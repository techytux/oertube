import os

from flask import Flask, request, Response
from flask import render_template, url_for, redirect, send_from_directory, jsonify
from flask import send_file, make_response, abort

from oertube import app

from bson import json_util

# routing for API endpoints, generated from the models designated as API_MODELS
from oertube.core import api_manager
from oertube.models import *

for model_name in app.config['API_MODELS']:
    model_class = app.config['API_MODELS'][model_name]
    api_manager.create_api(model_class, methods=['GET', 'POST'])

session = api_manager.session


# routing for basic pages (pass routing onto the Angular app)
@app.route('/')
@app.route('/about')
@app.route('/blog')
def basic_pages(**kwargs):
    return make_response(open('oertube/templates/index.html').read())


# routing for CRUD-style endpoints
# passes routing onto the angular frontend if the requested resource exists
from sqlalchemy.sql import exists

crud_url_models = app.config['CRUD_URL_MODELS']


@app.route('/<model_name>/')
@app.route('/<model_name>/<item_id>')
def rest_pages(model_name, item_id=None):
    if model_name in crud_url_models:
        model_class = crud_url_models[model_name]
        if item_id is None or session.query(exists().where(
                model_class.id == item_id)).scalar():
            return make_response(open(
                'oertube/templates/index.html').read())
    abort(404)

@app.route('/lists')
def lists(item_id=None):
    lists_json = get_lists_json()
    return jsonify(lists_json) # lists_json

@app.route('/list/<list_name>')
def list(list_name, item_id=None):
    list_json = get_list_json(list_name)
    return jsonify(list_json) # lists_json

@app.route('/rate/<video_id>/<rating>')
def rate(video_id, rating, item_id=None):
    list_json = save_rating(video_id, rating)
    return jsonify(list_json) # lists_json

@app.route('/ratings')
def ratings():
    ratings_json = get_ratings()
    return json_util.dumps(ratings_json) # lists_json

# might not be used anymore
@app.route('/get-video/<video_id>')
def get_video(video_id):
    video_dict = get_video_by_id(video_id)
    result_json = {"result": "success", 'data': video_dict['online']}
    return json_util.dumps(result_json)

# special file handlers and error handlers
@app.route('/favicon.ico')
def favicon():
    return send_from_directory(os.path.join(app.root_path, 'static'),
                               'img/favicon.ico')


@app.errorhandler(404)
def page_not_found(e):
    return render_template('404.html'), 404
