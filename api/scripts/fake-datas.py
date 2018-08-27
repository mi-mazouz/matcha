import sys
import re
import random
import psycopg2
from faker import Faker
from pygeocoder import Geocoder


idNmbr = 0

# SETUP CUSTOM FUNCTION
def genInterests(n) :
    interestsFiles = open("interests.txt", "r")
    interestsList = interestsFiles.readlines()
    return random.sample(interestsList, n)

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
    if (chance < 3) :
        return "INTERSEXED"
    return "MAN" if fakerGender == "M" else "WOMAN"

def genCustomMail(username):
    emailDomain = ['gmail.com', 'hotmail.com', 'yahoo.com']
    return username.lower()+"@"+random.choice(emailDomain)

def randomCoorsFromLocation(location) :
    try :
        geoObj = Geocoder.geocode(location)
        maxX = geoObj[0].data[0]['geometry']['bounds']['northeast']['lat']
        maxY = geoObj[0].data[0]['geometry']['bounds']['northeast']['lng']
        minX = geoObj[0].data[0]['geometry']['bounds']['southwest']['lat']
        minY = geoObj[0].data[0]['geometry']['bounds']['southwest']['lng']
        randomX = random.randint(1, 100) % (maxX - minX) + minX
        randomY = random.randint(1, 100) % (maxY - minY) + minY
        # print ('maxX = ' + str(maxX) + '\nmaxY = ' + str(maxY) + '\nnminX = ' + str(minX) + '\nminY = ' + str(minY))
        # print ('random coors inside ' + location + ' : \nx = ' + str(randomX) + '\ny = ' + str(randomY))
        return {'x' : randomX, 'y' : randomY}
    except : 
        randomCoorsFromLocation(location)

# FAKE PROFILE GENERATION
def genProfile(location, n) :
    file = open("plain_text_users_creds.txt", "w+") # CREATE A FILE TO STORE PLAIN TEXT CRED
    # try:
    #     conn = psycopg2.connect("dbname='postgres' user='root' host='localhost' password='root'")
    # except:
    #     sys.exit()
    added = 0
    global idNmbr
    while added < n :
        fake = Faker("fr_FR")
        fakeProfile = fake.profile()
        idNmbr += 1
        gender = convertGender(fakeProfile.get('sex'))
        rawName = fakeProfile.get('name').encode('utf-8').split(' ')
        sexualOrientation = genSexualOrientation(gender)
        firstName = rawName[0]
        lastName = rawName[1]
        username = firstName + str(random.randint(1,99))
        birthDate = fake.date_between(start_date='-75y', end_date='-18y').strftime("%Y-%m-%d")+' '+fake.time(pattern="%H:%M:%S", end_datetime=None)
        email = genCustomMail(username)
        password = fake.password()
        emailConfirmed = True
        poistion = randomCoorsFromLocation(location)
        createdAt = fake.date_between(start_date='-5y', end_date='today').strftime("%Y-%m-%d")+' '+fake.time(pattern="%H:%M:%S", end_datetime=None) + '+00'
        updatedAt = fake.date_time_this_month(before_now=True, after_now=False, tzinfo=None).strftime("%Y-%m-%d")+' '+fake.time(pattern="%H:%M:%S", end_datetime=None)+'+00'
        # file.write(username+" : "+email+" : "+password.encode()+'\n')
        print(idNmbr, gender, sexualOrientation, firstName, lastName, username, birthDate, email, password, poistion, emailConfirmed, createdAt, updatedAt)
# DATABASE POPULATION
        # try :
        #     cur = conn.cursor() # SET THE CURSOR
        #     cur.execute('INSERT INTO "User" (id, gender, "sexualOrientation", "firstName", "lastName", username, "birthDate", email, password, "emailConfirmed", "createdAt", "updatedAt") VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)', (idNmbr, gender, sexualOrientation, firstName, lastName, username, birthDate, email, password, emailConfirmed, createdAt, updatedAt))
        #     conn.commit()
        #     added += 1
        #     print(fakeProfile.get('name') + ' has been added!')
        # except :
        #     conn.rollback()
        # if added == profileCount :
        #     print(str(added) + ' users have been generated and imported into the database.')
        #     conn.close()

# EXECUTION            
if len(sys.argv) != 2 :
    print 'Only one arg (number of accounts to generate) allowed. Exiting'
    sys.exit()
# genProfile()
citiesToProcess = open("frenchCities.txt", "r")
citiesList = citiesToProcess.readlines()
citiesListFormat = {}
# print citiesList

# for i in range(len(citiesList)) :

# print citiesListFormat[0][1].rstrip()
try :
    for i in range(len(citiesList)) :
        citiesListFormat[i] = citiesList[i].split(',')
        genProfile(citiesListFormat[i][0].lower(), int(citiesListFormat[i][1]))
        i+=1
except KeyboardInterrupt :
    sys.exit

# i = 0

# while (i < 42) :
#     randomCoorsFromLocation(sys.argv[1])
#     i+=1