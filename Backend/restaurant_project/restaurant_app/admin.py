from django.contrib import admin

# Register your models here.
from .models import *
admin.site.register(BaseUser)
# admin.site.register(CustomerAccount)
# admin.site.register(ManagerAccount)