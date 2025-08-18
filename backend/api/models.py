from django.db import models

# Create your models here.

class  Contact(models.Model):
    name = models.CharField(max_length=120)
    email= models.EmailField( max_length=50)
    message = models.CharField(max_length=300, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} ({self.email})"