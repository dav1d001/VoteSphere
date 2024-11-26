from django.db import models
from django.contrib.auth.models import AbstractUser, Group, Permission

class User(AbstractUser):
    email = models.EmailField(unique=True)

    # Define custom related_name for groups and user_permissions
    groups = models.ManyToManyField(
        Group, 
        related_name='vote_sphere_users',  # Custom related_name to avoid conflict
        blank=True
    )
    user_permissions = models.ManyToManyField(
        Permission, 
        related_name='vote_sphere_users',  # Custom related_name to avoid conflict
        blank=True
    )

class Vote(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class UserVote(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    vote = models.ForeignKey(Vote, on_delete=models.CASCADE)
    choice = models.CharField(max_length=50)  # E.g., "Yes" or "No"
    voted_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        unique_together = ('user', 'vote')  # Ensures each user can only vote once per session
