export async function scheduleMeeting(meetingDetails) {
    const token = localStorage.getItem("access_token");

    if (!token) {
        console.error("No authentication token found.");
        return { error: "User not authenticated" };
    }

    console.log("Sending Authorization Token:", token); 

    const response = await fetch("http://127.0.0.1:8000/api/meetings/schedule/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(meetingDetails),
    });

    return response.json();
}
