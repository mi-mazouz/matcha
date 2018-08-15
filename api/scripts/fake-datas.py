import sys
import psycopg2
import random
from faker import Faker

if len(sys.argv) != 2 :
    print 'Only one arg (number of accounts to generate) allowed. Exiting'
    sys.exit()

# SETUP CUSTOM FUNCTION
def genSexualOrientation(userGender) :
    chance = random.randint(1, 100)
    if (chance <= 10 and userGender == "MAN") :
        return "MAN"
    elif (chance <= 10 and userGender == "WOMAN") :
        return "WOMAN"
    elif (chance <= 15) :
        return "BISEXUAL"
    elif (userGender == "MAN") :
        return "WOMAN"
    else :
        return "MAN"

def convertGender(fakerGender) :
    chance = random.randint(1,100)
    if chance < 3 :
        return "INTERSEXED"
    return "MAN" if fakerGender == "M" else "WOMAN"

def genCustomMail(firstName, lastName):
    emailDomain = ['gmail.com', 'hotmail.com', 'yahoo.com']
    return (firstName + lastName).lower()+"@"+random.choice(emailDomain)

# FAKE PROFILE GENERATION
def genProfile() :
    try:
        conn = psycopg2.connect("dbname='postgres' user='root' host='localhost' password='root'")
    except:
        sys.exit()
    idNmbr = 0
    profileCount = int(sys.argv[1])
    added = 0
    while added < profileCount :
        fake = Faker()
        fakeProfile = fake.profile()
        idNmbr += 1
        gender = convertGender(fakeProfile.get('sex'))
        sexualOrientation = genSexualOrientation(gender)
        rawName = fakeProfile.get('name').split(' ')
        firstName = rawName[0]
        lastName = rawName[1]
        username = fakeProfile.get('username')[0:16]
        birthDate = fake.date_between(start_date='-75y', end_date='-18y').strftime("%Y-%m-%d")+' '+fake.time(pattern="%H:%M:%S", end_datetime=None)
        email = genCustomMail(firstName, lastName)
        password = fake.password()
        emailConfirmed = True
        createdAt = fake.date_between(start_date='-5y', end_date='today').strftime("%Y-%m-%d")+' '+fake.time(pattern="%H:%M:%S", end_datetime=None) + '+00'
        updatedAt = fake.date_time_this_month(before_now=True, after_now=False, tzinfo=None).strftime("%Y-%m-%d")+' '+fake.time(pattern="%H:%M:%S", end_datetime=None)+'+00'
# SET THE CURSOR
        cur = conn.cursor()
# DATABASE POPULATION
        try :
            cur.execute('INSERT INTO "User" (id, gender, "sexualOrientation", "firstName", "lastName", username, "birthDate", email, password, "emailConfirmed", "createdAt", "updatedAt") VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)', (idNmbr, gender, sexualOrientation, firstName, lastName, username, birthDate, email, password, emailConfirmed, createdAt, updatedAt))
            conn.commit()
            added += 1
            print(fakeProfile.get('name') + ' has been added!')
        except :
            print('Database population error. Retrying.')
            conn.rollback()
        if added == profileCount :
            print(str(added) + ' users have been generated and imported into the database.')
            conn.close()
            
genProfile()