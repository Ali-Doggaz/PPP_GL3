from django.urls import path
from . import authentication
from . import bot

urlpatterns = [

    # authentication routes
    path('auth', authentication.getData),
    path('auth/signup', authentication.signup),
    path('auth/signin', authentication.signin),

    # bot routes(require authentication)
    path('likephoto', bot.likePhoto),
    path('download', bot.downloadPictures)
]