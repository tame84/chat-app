import axios from "axios";
import PostProps from "../utils/PostPropsInterace";
import { useEffect, useState } from "react";
import UserObject from "../utils/UserInterface";

const Post: React.FC<PostProps> = ({ postData }) => {
    const [userData, setUserData] = useState<UserObject | null>(null);

    const deletePost = () => {
        const userConfirmation: boolean = confirm(
            "Are you sure to delete this post ?"
        );

        if (userConfirmation) {
            console.log(postData.id);
            axios.delete("http://localhost:3000/posts/" + postData.id);
        }
    };

    useEffect(() => {
        axios
            .get("http://localhost:3000/user")
            .then((res) => setUserData(res.data))
            .catch((err) => console.log(err));
    }, []);

    if (userData !== null) {
        return (
            <div className="post">
                <div className="header">
                    <img
                        src={postData.author.picture}
                        alt="post author profile picture"
                        height="48"
                        width="48"
                    />
                    <h3>{postData.author.name} </h3>
                    <span>Author ID : {postData.author.id}</span>
                    {userData.id === postData.author.id ? (
                        <button onClick={deletePost}>Supprimer</button>
                    ) : (
                        <></>
                    )}
                </div>
                <p id="content">{postData.content}</p>
            </div>
        );
    }
};

export default Post;
