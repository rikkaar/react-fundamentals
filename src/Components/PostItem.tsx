import React, {FC} from 'react';
import {Post} from '../types/types';
import MyButton from "./UI/button/MyButton";

interface Data {
    post: Post,
    deleteP: (toDelete: string) => void,
}

const PostItem: FC<Data> = ({post, deleteP}) => {

    let deletePost = () => {
        fetch(`http://localhost:4000/posts/${post.id}`, {
            method: "DELETE",
        }).then(response => {
                if (!response.ok) {
                    throw new Error(response.statusText)
                }
                deleteP(post.id);
            }

        );

    }

    return (
        <div className="post">
            <div className="post__content">
                <h3 className={"post__title"}>{post.title}</h3>
                <div className="post__descr">{post.body}</div>
            </div>
            <MyButton del={true} onClick={deletePost}>Удалить</MyButton>
        </div>
    );
};

export default PostItem;
