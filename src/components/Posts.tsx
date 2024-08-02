import { useEffect, useState, useRef } from "react";
import axios from "axios";
import Post from "./Post";
import PostObject from "../utils/PostInterace";
import UserObject from "../utils/UserInterface";

const Posts = () => {
    const [userData, setUserData] = useState<UserObject | null>(null);
    const [posts, setPosts] = useState<PostObject[] | null>(null);
    const postContentRef = useRef<any>();

    const uploadPost = (e: any) => {
        e.preventDefault();

        const data: PostObject = {
            author: {
                name: userData?.name || "User",
                picture: "/userPicture.png" || "",
                id: userData?.id || "ID",
            },
            content: postContentRef.current.value,
        };

        axios
            .post("http://localhost:3000/posts", data)
            .catch((err) => console.log(err));

        postContentRef.current.value = "";
    };

    useEffect(() => {
        axios
            .get("http://localhost:3000/user")
            .then((res) => {
                setUserData(res.data);

                axios
                    .get("http://localhost:3000/posts")
                    .then((res) => setPosts(res.data))
                    .catch((err) => console.log(err));
            })
            .catch((err) => console.log(err));
    }, [uploadPost]);

    if (posts !== null) {
        return (
            <div className="posts">
                <div className="create-post-container">
                    <h2>Create a post</h2>
                    <form onSubmit={(e) => uploadPost(e)}>
                        <textarea
                            style={{ resize: "none" }}
                            placeholder="Write your post..."
                            required
                            rows={8}
                            cols={50}
                            minLength={10}
                            maxLength={300}
                            ref={postContentRef}
                        ></textarea>
                        <input type="submit" value="Post" />
                    </form>
                </div>
                <div className="posts-list">
                    <h2>Posts</h2>
                    {posts !== null ? (
                        posts.map((post, index) => {
                            return (
                                <Post postData={post} key={"post-" + index} />
                            );
                        })
                    ) : (
                        <p>Aucun posts n'a été trouvé.</p>
                    )}
                </div>
            </div>
        );
    }
};

export default Posts;
