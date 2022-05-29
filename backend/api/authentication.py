from rest_framework.response import Response
from rest_framework.decorators import api_view
from authentification.models import User
from .serializers import UserSerializer
from datetime import datetime
from django.utils.decorators import decorator_from_middleware
from authentification.middleware import AuthMiddleware
import bcrypt
import jwt
import os

SECRET_KEY = os.environ.get('SECRET_KEY')


@api_view(['GET'])
def getData(request):

    users = User.objects.all()
    serializer = UserSerializer(users, many=True)

    print('hello')

    return Response({
        "data" : serializer.data,
        "user": request.GET["user"]
    })


@api_view(['POST'])
def signup(request):
    data = request.data

    # checking is user exists
    users = User.objects.all()
    allSerializer = UserSerializer(users, many=True)
    for user in allSerializer.data:
        if user["username"] == data["username"]:
            return Response("username already exists", status=400)
        if (user["email"] == data["email"]):
            return Response("email already in use", status=400)

    # # transforming password
    # salt = bcrypt.gensalt()
    # data["password"] = data["password"].encode('utf-8')
    # hash = bcrypt.hashpw(data["password"], salt)
    # data["password"] = hash.decode('utf-8')

    # saving new user
    newSerializer = UserSerializer(data=data)
    if newSerializer.is_valid():
        print("saving")
        newSerializer.save()
    else:
        return Response(newSerializer._errors, 400)

    data.pop("password", None)

    return Response(data)


@api_view(['POST'])
def signin(request):
    data = request.data
    users = User.objects.all()
    allSerializer = UserSerializer(users, many=True)

    # checking if user exists
    found = None
    for user in allSerializer.data:
        if user["username"] == data["username"] or user["email"] == data["username"]:
            found = user
            break
    if found == None:
        return Response("username/email not valid", 400)

    # check if password is right
    encodedPass = data["password"].encode('utf-8')
    encodedHash = found["password"].encode('utf-8')
    validPass = data["password"] == found["password"]
    if not validPass:
        return Response("password is not valid", status=400)

    # sign jwt here
    found.pop("password", None)

    toEncode = {
        "data": found,
        "logTime": datetime.now().strftime("%m/%d/%Y, %H:%M:%S")
    }
    token = jwt.encode(toEncode, SECRET_KEY, algorithm="HS256")

    return Response({
        "message": "success",
        "token": token
    }, status=200)
