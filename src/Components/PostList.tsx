import React from 'react';
import PostItem from "./PostItem";
import {Post} from "../types/types";

interface Data {
    posts: Post[],
    deleteP: (toDelete: string) => void,
}

const PostList = ({posts, deleteP}: Data) => {

    if (!posts.length) {
        return <h1 style={{textAlign: "center", marginTop: '15px',}}>Посты не найдены :(</h1>
    }

    return (
        <div>
            <h1 style={{textAlign: "center", marginTop: '15px',}}>Список постов</h1>
            {posts.map(post =>
                <div>
                    <PostItem deleteP={deleteP} post={post} key={post.id}/>
                </div>)}
        </div>
    );
};

export default PostList;
