from django.urls import path, include
from . import views
from .views import CustomTokenObtainPairView
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
   path('api/token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),  # Login personalizado
   path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),  # Refresh
   path('api/auth/', include('dj_rest_auth.urls')),
   path('api/protected/', views.ProtectedView.as_view(), name='protected'),
   path('api/register/', views.RegisterView.as_view(), name='register'),
   path('api/users/', views.UserListView.as_view(), name='user_list'),  # Nueva vista para obtener todos los usuarios
   path('api/logout/', views.LogoutView.as_view(), name='logout'),  # Nueva vista para logout
   path('api/companies/', views.CompanyCreateView.as_view(), name='create_company'),  # Nueva vista para crear compañía
   path('api/tasks/', views.TaskCreateView.as_view(), name='create_task'),  # Nueva vista para crear tarea
   path('api/companies/list/', views.CompanyListView.as_view(), name='list_companies'),  # Nueva vista para obtener todas las compañías
   path('api/tasks/list/', views.TaskListView.as_view(), name='list_tasks'),  # Nueva vista para obtener todas las tareas
]
