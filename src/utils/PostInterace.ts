interface PostObject {
    id?: string;
    author: {
        name: string;
        picture: string;
        id: string;
    };
    content: string;
}

export default PostObject;
