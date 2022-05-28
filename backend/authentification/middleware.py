from django.http import HttpResponse
import jwt
import os
import json

SECRET_KEY = os.environ.get('SECRET_KEY')

WITHOUT_AUTH = ['/auth/signin','/auth/signup']


class AuthMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):

        path = request.path

        foundRoutes = list(filter(lambda x: path.startswith(x), WITHOUT_AUTH))

        if len(foundRoutes) != 0:
            response = self.get_response(request)
            return response

        # check if valid
        token = request.headers["Authorization"].split(' ')[1]

        try:
            connection = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
        except:
            return HttpResponse("Invalid token please Reconnect", status=400)

        # appending the request object with user
        
        my_request = request.GET.copy()
        my_request["user"] = connection["data"]
        request.GET = my_request

        response = self.get_response(request)
        return response

    def process_view(self, request, view_func, view_args, view_kwargs):
        return None
