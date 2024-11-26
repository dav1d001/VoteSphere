from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt import views as jwt_views
from .views import UserViewSet, VoteViewSet, UserVoteViewSet

router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'votes', VoteViewSet)
router.register(r'uservotes', UserVoteViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),  # Includes the routes for the viewsets
    path('api/token/', jwt_views.TokenObtainPairView.as_view(), name='token_obtain_pair'),  # JWT token obtain endpoint
    path('api/token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),  # JWT token refresh endpoint
]
