from django.contrib import admin
from .models import Contact
# Register your models here.

admin.site.site_header = "Shaira's Dash"
admin.site.site_title = "Shaira's Dash"
admin.site.index_title = "Welcome to Shaira's Dashboard"

@admin.register(Contact)
class ContactAdmin(admin.ModelAdmin):
    list_display =('id', 'name', 'email', 'created_at')
    search_fields = ('name', 'email')