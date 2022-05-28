from rest_framework.response import Response
from rest_framework.decorators import api_view
from authentification.models import User
from .serializers import UserSerializer
import bcrypt


@api_view(['GET'])
def getData(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)

    return Response(serializer.data)


@api_view(['POST'])
def signup(request):
    data = request.data

    # checking is user exists
    users = User.objects.all()
    allSerializer = UserSerializer(users, many=True)
    for user in allSerializer.data:
        if user.username == data["username"]:
            return Response("username already exists", status=400)
        if (user.email == data["email"]):
            return Response("email already in use", status=400)

    # transforming password
    salt = bcrypt.gensalt()
    data["password"] = data["password"].encode('utf-8')
    hash = bcrypt.hashpw(data["password"], salt)
    data["password"] = hash.decode('utf-8')

    #saving new user
    newSerializer = UserSerializer(data=data)
    if newSerializer.is_valid(): 
        print("saving")
        newSerializer.save()
    else: 
        print(newSerializer._errors)
        print(data["password"])
        print("not saving")

    data.pop("password", None)

    return Response(data)
