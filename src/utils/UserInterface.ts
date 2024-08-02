interface UserObject {
    id?: string;
    name: string;
    likes: number;
    picture: string;
    posts: (string | number)[];
}

export default UserObject;
