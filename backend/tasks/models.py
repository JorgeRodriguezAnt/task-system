from django.db import models
from django.contrib.auth.models import AbstractUser
import uuid

# Create your models here.

# Model user
class User(AbstractUser):
    ROLES = [
        ('admin', 'Admin'),
        ('supervisor', 'Supervisor'),
        ('user', 'User'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    role = models.CharField(max_length=10, choices=ROLES, default='user')
    email = models.EmailField(unique=True)  
    username = None  # Eliminate username field

    USERNAME_FIELD = 'email'  # Email authentication
    REQUIRED_FIELDS = ['first_name', 'last_name']

    def __str__(self):
        return self.email  

# Model Company
class Company(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=25, blank=False, null=False, unique=True)
    email = models.EmailField(max_length=50, blank=False, null=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='companies', default=1)  # Proporciona un valor predeterminado

    def __str__(self):
        return self.name

# Model Task
class Task(models.Model):
    STATUS = [
        ('pending', 'pending'),
        ('completed', 'completed'),
        ('in progress', 'in progress'),
        ('cancelled', 'cancelled'),
        ('planning', 'planning')
    ]
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=25, blank=False, null=False)
    description = models.TextField(blank=False, null=False)
    status = models.CharField(max_length=15, choices=STATUS, default='planning')
    company = models.ForeignKey(Company, on_delete=models.CASCADE, related_name='tasks')
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='tasks')
    date = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.name


