import sys
import requests
import bcrypt
from faker import Faker

from tools import get_gender, get_sexual_orientation, display_progress_bar, add_user, add_picture_profile

if '--help' in sys.argv:
    print('Usage: [PYTHON_ENV=development] python <script-name> [number_of_users=100 max:1000] [region="fr"]')
    sys.exit()

number_of_users = int(sys.argv[1]) if len(sys.argv) >= 2 and sys.argv[1].isdigit() == True and int(sys.argv[1]) < 1000 else 100
region = sys.argv[2] if len(sys.argv) == 3 else 'fr'

fake = Faker(region)
random_users = requests.get(f'https://randomuser.me/api/?inc=gender,name,location,email,login,picture,registered&nat={region}&results={number_of_users}').json()

for index, random_user in enumerate(random_users['results']):
    user = {
        'first_name': random_user['name']['first'],
        'last_name': random_user['name']['last'],
        'username': random_user['login']['username'],
        'password': bcrypt.hashpw(b'Test1234', bcrypt.gensalt(10)).decode('ascii'),
        'email': random_user['email'],
        'gender': get_gender(random_user['gender']),
        'birth_date': fake.date_between(start_date='-75y', end_date='-18y'),
        'sexual_orientation': get_sexual_orientation(),
        'email_confirmed': True,
        'created_at': random_user['registered']['date'],
        'updated_at': random_user['registered']['date'],
    }
    display_progress_bar(number_of_users, index + 1)
    user_id = add_user(user)

    picture = {
        'user_id': user_id,
        'path': random_user['picture']['large'],
        'created_at': random_user['registered']['date'],
        'updated_at': random_user['registered']['date'],
    }
    add_picture_profile(picture)