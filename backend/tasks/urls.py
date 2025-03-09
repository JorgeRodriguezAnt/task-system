from django.urls import path, include
from . import views
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
   path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),  # Login
   path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),  # Refresh
   path('api/auth/', include('dj_rest_auth.urls')),
   path('api/protected/', views.ProtectedView.as_view(), name='protected'),
   path('api/register/', views.RegisterView.as_view(), name='register'),
   path('api/users/', views.UserListView.as_view(), name='user_list'),  # User Register
   path('api/logout/', views.LogoutView.as_view(), name='logout'),  # Logout
   path('api/companies/', views.CompanyCreateView.as_view(), name='create_company'),  # Create Company
   path('api/tasks/', views.TaskCreateView.as_view(), name='create_task'),  # Create Task
   path('api/companies/list/', views.CompanyListView.as_view(), name='list_companies'),  # Get all companies
   path('api/tasks/list/', views.TaskListView.as_view(), name='list_tasks'),  # Get all tasks
]
