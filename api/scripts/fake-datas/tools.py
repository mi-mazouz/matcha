import json
import os
import sys
import random
import psycopg2
import datetime


def display_progress_bar(toolbar_width, index):
  percent = ((index * 100) // toolbar_width)
  sys.stdout.write('\r')
  sys.stdout.write('Wait... [')
  sys.stdout.write(f'|' * percent)

  if index == toolbar_width: sys.stdout.write(f'] {percent}%\n')  
  else: sys.stdout.write(f' {percent}%')


def get_database_connection():
    try:
      with open(os.path.join(os.path.dirname(__file__), '../../database/config/index.json')) as json_file:
          database_env = os.environ['PYTHON_ENV'] if 'PYTHON_ENV' in os.environ else 'development'
          database_config = json.load(json_file)[database_env]
      database_connection = psycopg2.connect(f'\
          dbname={database_config["database"]}\
          user={database_config["username"]}\
          host={database_config["host"]}\
          password={database_config["password"]}'
      )

      return database_connection
    except ValueError:
      sys.exit()

def get_gender(gender) :
    chance = random.randint(1, 100)
    
    if chance <= 33: return 'INTERSEXED'
    return 'MAN' if gender == 'male' else 'WOMAN'

def get_sexual_orientation() :
    chance = random.randint(1, 100)
    
    if chance <= 33: return 'BISEXUAL'
    if chance <= 66: return 'MAN'
    return 'WOMAN'

def add_user(user):
    database_connection = get_database_connection()
    cursor = database_connection.cursor()

    try:
      cursor.execute(
        'INSERT INTO "User" (\
          gender,\
          "sexualOrientation",\
          "firstName",\
          "lastName",\
          username,\
          "birthDate",\
          email,\
          password,\
          "emailConfirmed",\
          "createdAt",\
          "updatedAt"\
          ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s) RETURNING id',
        (
          user['gender'],
          user['sexual_orientation'],
          user['first_name'],
          user['last_name'],
          user['username'],
          user['birth_date'],
          user['email'],
          user['password'],
          user['email_confirmed'],
          user['created_at'],
          user['updated_at']
        )
      )
      database_connection.commit()
      user_id = cursor.fetchone()[0]
      database_connection.close()

      return user_id
    except Exception as error:
      print(f'\nA user was not created because of: "{str(error)}"')

def add_picture_profile(picture):
    database_connection = get_database_connection()
    cursor = database_connection.cursor()
    try:
      cursor.execute(
        'INSERT INTO "Picture" (\
          "userId",\
          path,\
          "isProfile",\
          "createdAt",\
          "updatedAt"\
          ) VALUES (%s, %s, %s, %s, %s) RETURNING id',
        (
          picture['user_id'],
          picture['path'],
          True,
          picture['created_at'],
          picture['updated_at']
        )
      )
      database_connection.commit()
      database_connection.close()
    except Exception as error:
      print(f'\nA picture was not created because of: "{str(error)}"')
