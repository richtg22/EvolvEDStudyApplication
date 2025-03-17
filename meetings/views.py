from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Meeting
from .serializers import MeetingSerializer
from users.decorators import role_required

@api_view(['POST'])
@role_required(['tutor'])
def schedule_meeting(request):
    meeting = Meeting.objects.create(
        topic=request.data['topic'],
        time=request.data['time'],
        created_by=request.user,
        group_id=request.data['group_id']
    )
    return Response(MeetingSerializer(meeting).data)

@api_view(['GET'])
def view_meetings(request):
    meetings = Meeting.objects.all()
    return Response(MeetingSerializer(meetings, many=True).data)

@api_view(['POST'])
@role_required(['student', 'tutor'])
def join_meeting(request, meeting_id):
    try:
        meeting = Meeting.objects.get(id=meeting_id)
        meeting.participants.add(request.user)
        return Response({'message': 'Successfully joined the meeting'})
    except Meeting.DoesNotExist:
        return Response({'error': 'Meeting not found'}, status=404)
