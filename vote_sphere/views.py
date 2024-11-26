# backend/vote_sphere/views.py
from rest_framework import viewsets, permissions
from rest_framework.response import Response
from .models import User, Vote, UserVote
from .serializers import UserSerializer, VoteSerializer, UserVoteSerializer

# View for user registration
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny]  # Allow open registration

# View for handling voting sessions
class VoteViewSet(viewsets.ModelViewSet):
    queryset = Vote.objects.all()
    serializer_class = VoteSerializer
    permission_classes = [permissions.IsAuthenticated]  # Only authenticated users

# View for tracking each user's vote
class UserVoteViewSet(viewsets.ModelViewSet):
    queryset = UserVote.objects.all()
    serializer_class = UserVoteSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        # Save the user vote with the current user
        serializer.save(user=self.request.user)
