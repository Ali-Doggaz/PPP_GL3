import os
from socket import TIPC_MEDIUM_IMPORTANCE
from time import time
from rest_framework.response import Response
from rest_framework.decorators import api_view
from authentification.models import User
from .serializers import UserSerializer
from bot.BOT import InstagramBot
from bot.Download_Trending_Pictures_From_Reddit import download_reddit_PRAWN
# from bot.Upload import upload

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

    # getting user
    user = request.GET["user"]
    user=getEntireUser(user)

    ig = InstagramBot(user["username"],user["password"], True)
    logged = ig.login()
    # ig.like_photo(tags[0], tags, follow, int(max_follows), int(max_likes), [], msg,
    #                                        IMAGES_FILE_PATH, True)

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
    download_reddit_PRAWN(number, subreddit_name, data_path)

    return Response()


#upload pictures 
@api_view(['POST'])
def uploadPicutres(request):
    user = request.GET["user"]
    description = "hahahah hahahah"
    
    os.chdir(PATH)
    images_path= os.getcwd() +"/static/"+str(user["id"])
    
    images_list = os.listdir(images_path)
    if images_list.length ==0:
        return Response("there is no image",404)
    image_path = images_list[0]
    print(image_path)
    return Response("success")

# edit pictures


# tag howa eli iliki fih, tags list kemla