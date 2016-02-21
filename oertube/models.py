from datetime import datetime

from oertube.core import db
from oertube import app

# To access rating database
import pymongo
from pymongo import MongoClient
mongo_client = MongoClient()

import json
import urllib

class Post(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(80))
    body = db.Column(db.Text)
    pub_date = db.Column(db.DateTime)

    def __init__(self, title, body, pub_date=None):
        self.title = title
        self.body = body
        if pub_date is None:
            pub_date = datetime.utcnow()
        self.pub_date = pub_date

    def __repr__(self):
        return '<Post %r>' % self.title

# models for which we want to create API endpoints
app.config['API_MODELS'] = {'post': Post}

# models for which we want to create CRUD-style URL endpoints,
# and pass the routing onto our AngularJS application
app.config['CRUD_URL_MODELS'] = {'post': Post}


BROADCASTER_TO_LOGO_DICT = {
    "ARD": "http://images.mixd.tv/images/320/ard.png",
    "ZDF": "http://images.mixd.tv/images/320/zdf.png",
    "3SA": "http://images.mixd.tv/images/320/3sa.png",
    "FES": "http://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Einsfestival_2009.svg/320px-Einsfestival_2009.svg.png",
    "RAB": "http://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Logo_Radio_Bremen_TV.svg/320px-Logo_Radio_Bremen_TV.svg.png",
    "KKA": "http://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Kika_2012.svg/320px-Kika_2012.svg.png",
    "ART": "http://images.mixd.tv/images/320/art.png",
    "DW": "http://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Deutsche_Welle_Logo.svg/320px-Deutsche_Welle_Logo.svg.png",
    "HF": "http://images.mixd.tv/images/320/hf.png",
    "MDR": "http://images.mixd.tv/images/320/mdr.png",
    "WDR": "http://images.mixd.tv/images/320/wdr.png",
    "BR": "http://images.mixd.tv/images/320/br.png",
    "RBB": "http://images.mixd.tv/images/320/rbb.png",
    "SWR": "http://images.mixd.tv/images/320/swr.png",
    "ZDF": "http://images.mixd.tv/images/320/zdf.png",
    "ZDI": "http://images.mixd.tv/images/320/zdi.png",
    "ZNO": "http://images.mixd.tv/images/320/zno.png",
}

def get_lists_json():
    lists_text = urllib.urlopen("http://editorial.mixd.tv/puls-highlights").read()
    lists_json = json.loads(lists_text)
    return lists_json

def get_video_by_id(video_id):
    client = MongoClient('localhost', 27000)
    db = client.media_prod
    metadata_extended_collection = db.metadata_extended
    data_dict = metadata_extended_collection.find_one({'entityId': video_id})
    return data_dict

def get_list_json(list_name):
    list_text = urllib.urlopen("http://editorial.mixd.tv/highlights/" + list_name).read()
    list_json = json.loads(list_text)

    new_data_list_json = {}

    # get Logo URLs:
    for video in list_json['msg']['data']:
        if video['broadcaster'] in BROADCASTER_TO_LOGO_DICT:
            video['broadcasterLogo'] = BROADCASTER_TO_LOGO_DICT[video['broadcaster']]
        else:
            print "ERROR: no broadcaster Logo found for " + video['broadcaster']

    return list_json

def save_rating(video_id, rating):
    client = MongoClient('localhost', 27000)
    db = client.puls_hackday
    ratings_collection = db.ratings

    client = MongoClient('localhost', 27000)
    editorial_prod_db = client.editorial_prod
    highlights_collection = editorial_prod_db.highlights
    video_dict = highlights_collection.find_one({'entityId': video_id})

    if video_dict:
        video_rating = {"entityId": video_id,
                        "data": video_dict,
                        "rating": rating}
        ratings_collection.insert_one(video_rating)
        return {"result": "success"}
    else:
        return {"result": "Error, ID not found in Highlights"}

def get_ratings():
    client = MongoClient('localhost', 27000)
    db = client.puls_hackday
    ratings_collection = db.ratings

    db.ratings.find()
    ratings_dict = {"elements": []}
    for rating in db.ratings.find():
        rating = {
            "entityId": rating['entityId'],
            "rating": rating['rating'],
            "data": rating['data'],
        }
        ratings_dict['elements'].append(rating)
    return ratings_dict
