from socket import TIPC_MEDIUM_IMPORTANCE
from time import time
from rest_framework.response import Response
from rest_framework.decorators import api_view
from authentification.models import User
from .serializers import UserSerializer

    