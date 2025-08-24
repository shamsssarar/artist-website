from django.shortcuts import render
from .models import Contact
from .serializer import ContactSerializer, UserSerializer
from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from django.contrib.auth.models import User
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
# Create your views here.

class ContactViewSet(viewsets.ModelViewSet):
    queryset = Contact.objects.all().order_by("-created_at")
    serializer_class = ContactSerializer

    def get_permissions(self):
        if self.action == 'create':
            return [permissions.AllowAny()]
        return[permissions.IsAdminUser()]
    
@api_view(["POST"])
@permission_classes([AllowAny])
def register(request):
    username = request.data.get("username")
    email = request.data.get("email")
    password = request.data.get("password")
    if not username or not password:
        return Response({"detail": "username & password required"}, status=400)
    if User.objects.filter(username=username).exists():
        return Response({"detail": "username already taken"}, status=400)
    if email and User.objects.filter(email__iexact=email).exists():
        return Response({"detail": "email already in use"}, status=400)
    user = User.objects.create_user(username=username, email=email, password=password)
    return Response(UserSerializer(user).data, status=status.HTTP_201_CREATED)

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def me(request):
    return Response(UserSerializer(request.user).data)