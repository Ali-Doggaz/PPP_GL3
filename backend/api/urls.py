from django.urls import path
from . import authentication

urlpatterns = [
    path('', authentication.getData),
    path('signup', authentication.signup),
    path('signin', authentication.signin)
]