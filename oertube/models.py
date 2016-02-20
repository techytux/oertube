from datetime import datetime

from oertube.core import db
from oertube import app

import pymongo
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


def get_lists_json():
    lists_text = urllib.urlopen("http://editorial.mixd.tv/puls-highlights").read()
    lists_json = json.loads(lists_text)
    return lists_json

def get_list_json(list_name):
    print "LIST:" + list_name
    list_text = urllib.urlopen("http://editorial.mixd.tv/highlights/" + list_name).read()
    list_json = json.loads(list_text)
    return list_json
