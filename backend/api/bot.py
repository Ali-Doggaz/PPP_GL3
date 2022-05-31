import os
from time import time
from rest_framework.response import Response
from rest_framework.decorators import api_view
from authentification.models import User
from .serializers import UserSerializer
from bot.BOT import InstagramBot
from bot.Download_Trending_Pictures_From_Reddit import download_reddit_PRAWN
from bot.Upload import upload

PATH= os.getcwd()

def getEntireUser(user): 
    # getting user password
    dbUser = User.objects.get(pk=user["id"])
    serializedUser = UserSerializer(dbUser)
    user["password"] = serializedUser.data["password"]
    return user

@api_view(['POST'])
def likePhoto(request):

    # getting data
    # para
    tags= request.data["tags"]
    follows = request.data["follows"]
    max_follows = request.data["max-follows"]
    max_likes = request.data["max-likes"]

    # getting user
    user = request.GET["user"]
    user=getEntireUser(user)

    ig = InstagramBot(user["username"],user["password"], True)
    logged = ig.login()
    ig.like_photo(tags[0], tags, follows, int(max_follows), int(max_likes))

    if logged == 0 :
        return Response('failure')

    return Response('success')

# download pictures
@api_view(['POST'])
def downloadPictures(request):
    user = request.GET["user"]
    data = request.data
    number = data["number"]+1
    subreddit_name = data["subreddit_name"]
    
    os.chdir(PATH)

    data_path= os.getcwd()+'/static/'+str(user["id"])
    if not os.path.isdir(data_path):
        os.mkdir(data_path)
    if not os.path.isdir(data_path+"/Images"):
        os.mkdir(data_path+"/Images")

    # print(data_path)
    try:
        download_reddit_PRAWN(number, subreddit_name, data_path)
    except:
        print("completed")

    return Response('success')

# remove pictures
@api_view(["DELETE"])
def removePictures(request): 
    user = request.GET["user"]
    
    # user path
    os.chdir(PATH)
    data_path= os.getcwd()+'/static/'+str(user["id"])
    if not os.path.isdir(data_path):
        return Response('No images', 400)
    if not os.path.isdir(data_path+"/Images"):
        return Response('No images', 400)
    images_path= data_path+"/Images"
    
    # removing files
    images_list= os.listdir(images_path)
    for image_path in images_list:
        os.remove(images_path+"/"+image_path)

    return Response("removed images")

#remove picture
@api_view(["DELETE"])
def removePicture(request): 
    user = request.GET["user"]
    pictureName = request.data["image-name"]

    # user path
    os.chdir(PATH)
    data_path= os.getcwd()+'/static/'+str(user["id"])
    if not os.path.isdir(data_path):
        return Response('No images', 400)
    if not os.path.isdir(data_path+"/Images"):
        return Response('No images', 400)
    images_path= data_path+"/Images"

    # removing specific file
    image_path = images_path+"/"+ pictureName
    if not os.path.isfile(image_path):
        return Response("image not found")
    
    os.remove(image_path)
    return Response("success")



#upload pictures 
@api_view(['POST'])
def uploadPicutres(request):
    user = request.GET["user"]
    picture = request.data["picture"]
    description = "uploaded via InstaBot"

    entireUser = getEntireUser(user)
    username= entireUser["username"]
    password = entireUser["password"]

    
    os.chdir(PATH)
    images_path= os.getcwd() +"\\static\\"+str(user["id"])
    print(images_path+"\\Images")

    images_list = os.listdir(images_path+"\\Images")
    print(images_list)

    if len(images_list) ==0:
        return Response("there is no image",404)
    
    print(images_list)
    if not picture in images_list:
        return Response("image doesn't exist",400)
    
    image_path = images_path+"\\Images\\"+picture

    upload(username, password, image_path, description)

    return Response("success")


@api_view(['GET'])
def getPictures(request): 
    user = request.GET["user"]
    
    # user path
    os.chdir(PATH)
    data_path= os.getcwd()+'/static/'+str(user["id"])
    if not os.path.isdir(data_path):
        return Response([])
    if not os.path.isdir(data_path+"/Images"):
        return Response([])
    images_path= data_path+"/Images"
    
    images_list = os.listdir(images_path)
    print(images_list)

    return Response(images_list)

# edit pictures


# tag howa eli iliki fih, tags list kemla