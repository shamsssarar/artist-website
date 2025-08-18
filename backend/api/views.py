from django.shortcuts import render
from .models import Contact
from .serializer import ContactSerializer
from rest_framework import viewsets, permissions
# Create your views here.

class ContactViewSet(viewsets.ModelViewSet):
    queryset = Contact.objects.all().order_by("-created_at")
    serializer_class = ContactSerializer

    def get_permissions(self):
        if self.action == 'create':
            return [permissions.AllowAny()]
        return[permissions.IsAdminUser()]