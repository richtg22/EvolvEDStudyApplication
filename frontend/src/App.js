import React, { useEffect, useState } from "react";
import {
    fetchUserProfile,
    fetchGroups,
    fetchDiscussions,
    fetchMeetings,
    scheduleMeeting
} from "./api/backend";

function App() {
    const [user, setUser] = useState(null);
    const [groups, setGroups] = useState([]);
    const [discussions, setDiscussions] = useState([]);
    const [meetings, setMeetings] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("access_token");

        async function loadData() {
            if (token) {
                const userData = await fetchUserProfile(token);
                setUser(userData);
            }
            setGroups(await fetchGroups());
            setDiscussions(await fetchDiscussions());
            setMeetings(await fetchMeetings());
        }

        loadData();
    }, []);

    const handleScheduleMeeting = async () => {
        const token = localStorage.getItem("access_token");
        const meetingDetails = {
            topic: "New Zoom Meeting",
            start_time: new Date().toISOString(),
            duration: 30,
            agenda: "Integration with Backend",
            is_recurring: true,
            recurrence_type: "weekly",
            recurrence_interval: 1
        };
        const response = await scheduleMeeting(meetingDetails, token);
        console.log("Scheduled Meeting:", response);
    };

    return (
        <div>
            <h1>Welcome {user ? user.username : "Guest"}!</h1>

            <h2>Groups</h2>
            <ul>
                {groups.map((group) => (
                    <li key={group.id}>{group.name}</li>
                ))}
            </ul>

            <h2>Discussions</h2>
            <ul>
                {discussions.map((discussion) => (
                    <li key={discussion.id}>{discussion.title}</li>
                ))}
            </ul>

            <h2>Meetings</h2>
            <button onClick={handleScheduleMeeting}>Schedule Meeting</button>
            <ul>
                {meetings.map((meeting) => (
                    <li key={meeting.id}>
                        {meeting.topic} - <a href={meeting.zoom_join_url}>Join</a>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;
