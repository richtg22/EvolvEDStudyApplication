from django.urls import path
from .views import schedule_meeting, view_meetings, join_meeting

urlpatterns = [
    path('schedule/', schedule_meeting),
    path('view/', view_meetings),
    path('join/<int:meeting_id>/', join_meeting),
]
