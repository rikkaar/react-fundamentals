import React, {FC, useState} from 'react';
import {Comments, Post} from '../types/types';
import MyButton from "./UI/button/MyButton";
import { useNavigate } from 'react-router-dom'
import PostFull from "./PostFull";
import PostService from "./API/PostService";
import Modal from "./UI/Modal/Modal";

interface Data {
    post: Post,
    deleteP: (toDelete: string) => void,
    setModalPost: React.Dispatch<React.SetStateAction<boolean>>,
}

const PostItem: FC<Data> = ({post, deleteP, setModalPost}) => {
    const navigate = useNavigate()
    const [comments, setComments] = useState<Comments[]>([])
    const [modal, setModal] = useState(false)


    let getComments = async (postId: string) => {
        let response = await PostService.getComments<Comments[]>(postId).then(res => res);
        setComments(response)
    }

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
            <MyButton onClick={async () => {
                getComments(post.id)
                setModal(true);
            }}>Открыть</MyButton>
            <Modal visible={modal} setVisible={setModal}><PostFull post={post} comments={comments}/></Modal>
        </div>
    );
};

export default PostItem;
