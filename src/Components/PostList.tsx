import React from 'react';
import PostItem from "./PostItem";
import {Post} from "../types/types";
import {CSSTransition, TransitionGroup} from 'react-transition-group';

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
            <TransitionGroup>
                {posts.map(post => (
                    <CSSTransition
                        key={post.id}
                        timeout={500}
                        classNames={"post"}
                    >
                        <PostItem deleteP={deleteP} post={post}/>
                    </CSSTransition>
                ))}
            </TransitionGroup>
        </div>
    );
};

export default PostList;
