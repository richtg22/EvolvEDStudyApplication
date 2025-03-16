from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .models import Discussion, Reply
from .serializers import DiscussionSerializer, ReplySerializer
from users.decorators import role_required

@api_view(['POST'])
@permission_classes([IsAuthenticated])
@role_required(['admin', 'student', 'tutor'])
def create_discussion(request):
    """ Allow students and tutors to create discussions. """
    data = request.data
    discussion = Discussion.objects.create(
        title=data['title'],
        content=data['content'],
        created_by=request.user,
        group_id=data['group_id']
    )
    return Response(DiscussionSerializer(discussion).data, status=status.HTTP_201_CREATED)

@api_view(['GET'])
def view_discussions(request):
    """ List all discussions. """
    discussions = Discussion.objects.all()
    return Response(DiscussionSerializer(discussions, many=True).data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
@role_required(['admin', 'student', 'tutor'])
def reply_to_discussion(request, discussion_id):
    """ Allow users to reply to discussions. """
    try:
        discussion = Discussion.objects.get(id=discussion_id)
        reply = Reply.objects.create(
            discussion=discussion,
            user=request.user,
            content=request.data['content']
        )
        return Response(ReplySerializer(reply).data, status=status.HTTP_201_CREATED)
    except Discussion.DoesNotExist:
        return Response({'error': 'Discussion not found'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
@role_required(['admin', 'tutor'])
def moderate_discussion(request, discussion_id):
    """ Allow tutors to mark discussions as moderated. """
    try:
        discussion = Discussion.objects.get(id=discussion_id)
        discussion.is_moderated = True
        discussion.save()
        return Response({'message': 'Discussion moderated'}, status=status.HTTP_200_OK)
    except Discussion.DoesNotExist:
        return Response({'error': 'Discussion not found'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
@role_required(['admin', 'tutor'])
def moderate_reply(request, reply_id):
    """ Allow tutors to approve or reject replies. """
    try:
        reply = Reply.objects.get(id=reply_id)
        reply.is_approved = request.data.get('is_approved', True)
        reply.save()
        return Response({'message': 'Reply moderated'}, status=status.HTTP_200_OK)
    except Reply.DoesNotExist:
        return Response({'error': 'Reply not found'}, status=status.HTTP_404_NOT_FOUND)
