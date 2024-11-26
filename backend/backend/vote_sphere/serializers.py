from rest_framework import serializers
from .models import User, Vote, UserVote

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name']

class VoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vote
        fields = ['id', 'title', 'description', 'created_at', 'updated_at']

class UserVoteSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)  # Nested user data
    vote = VoteSerializer(read_only=True)  # Nested vote data

    class Meta:
        model = UserVote
        fields = ['user', 'vote', 'choice', 'voted_at']
