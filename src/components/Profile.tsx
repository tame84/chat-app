import axios from "axios";
import { useEffect, useRef, useState } from "react";
import UserObject from "../utils/UserInterface";

const EditProfile = () => {
    const [userData, setUserData] = useState<UserObject | null>(null);
    const editUsernameRef = useRef<any>();

    const editUsername = (e: any) => {
        e.preventDefault();

        if (editUsernameRef.current.value !== userData?.name) {
            const data: UserObject = {
                id: userData?.id,
                name: editUsernameRef.current.value,
                likes: userData?.likes ?? 0,
                picture: userData?.picture || "",
                posts: userData?.posts || [],
            };

            axios
                .put("http://localhost:3000/user", data)
                .catch((err) => console.log(err));

            editUsernameRef.current.value = "";
        }
    };

    useEffect(() => {
        axios
            .get("http://localhost:3000/user")
            .then((res) => setUserData(res.data))
            .catch((err) => console.log(err));
    }, [editUsername]);

    if (userData !== null) {
        return (
            <div className="user-informations">
                <h2>My Profile</h2>
                <div className="content">
                    <img
                        src={userData.picture}
                        alt="user profile picture"
                        height="48"
                        width="48"
                    />
                    <h3>{userData.name}</h3>
                    <p>Posts : {userData.posts.length}</p>
                    <p>Likes : {userData.likes}</p>
                    <button>Edit profile</button>
                </div>
                <div className="edit-content-container">
                    <form onSubmit={(e) => editUsername(e)}>
                        <input
                            type="text"
                            placeholder="Username"
                            required
                            ref={editUsernameRef}
                        />
                    </form>
                </div>
            </div>
        );
    }
};

export default EditProfile;
