from django.db import models
from users.models import User
from groups.models import StudyGroup

class Meeting(models.Model):
    topic = models.CharField(max_length=255)
    time = models.DateTimeField()
    created_by = models.ForeignKey(User, on_delete=models.CASCADE)
    group = models.ForeignKey(StudyGroup, on_delete=models.CASCADE)
    participants = models.ManyToManyField(User, related_name="meetings_joined", blank=True)

    def __str__(self):
        return self.topic
