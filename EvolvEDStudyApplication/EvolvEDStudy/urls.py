from django.contrib import admin
from django.urls import path, include, re_path
from django.http import JsonResponse
from django.views.generic import TemplateView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

# def home(request):
#     return JsonResponse({"message": "Welcome to EvolvEDStudy API"}, status=200)
def test_api(request):
    return JsonResponse({"message": "Django & React Integration Successful!"})


urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/users/", include("users.urls")),
    path("api/groups/", include("groups.urls")),
    path("api/discussions/", include("discussions.urls")),
    path("api/meetings/", include("meetings.urls")),
    path("api/test/", test_api),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),  # Login
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),  # Get new access token
    # path("", home),  # API home response
    # React Frontend
    re_path(r'^.*$', TemplateView.as_view(template_name='index.html')),
]
