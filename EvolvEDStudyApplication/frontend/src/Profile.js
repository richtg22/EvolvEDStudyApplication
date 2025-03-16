import React, { useEffect, useState } from "react";
import { apiRequest } from "../utils/auth";  

const Profile = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        async function fetchUserData() {
            try {
                const response = await apiRequest("http://127.0.0.1:8000/api/user/", {
                    method: "GET",
                });
                const data = await response.json();
                setUser(data);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        }

        fetchUserData();
    }, []);

    return (
        <div>
            <h1>User Profile</h1>
            {user ? <p>Welcome, {user.username}!</p> : <p>Loading...</p>}
        </div>
    );
};

export default Profile;
