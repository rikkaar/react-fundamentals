import React from 'react';
import PostItem from "./PostItem";
import {Post} from "../types/types";
import {CSSTransition, TransitionGroup} from 'react-transition-group';

interface Data {
    posts: Post[],
    deleteP: (toDelete: string) => void,
    query: {q: string, _page: string, _order: string, _sort: string, _limit: string},
    setQuery: React.Dispatch<React.SetStateAction<{q: string, _page: string, _order: string, _sort: string, _limit: string}>>,
    totalCount: number,
    setModalPost: React.Dispatch<React.SetStateAction<boolean>>,

}

const PostList = ({posts, deleteP, query, setQuery, totalCount, setModalPost}: Data) => {

    if (!posts.length) {
        return <h1 style={{textAlign: "center", marginTop: '15px',}}>Посты не найдены :(</h1>
    }

    return (
        <div>
            <div className="pagination">
                <button onClick={() => setQuery({...query, _page: (Number(query._page) - 1).toString()})} disabled={!(Number(query._page) > 1)} className={!(Number(query._page) > 1) ? "page-btn" : "page-btn page-btn-hover"}>prev</button>
                <h1>{query._page}</h1>
                <button onClick={() => setQuery({...query, _page: (Number(query._page) + 1).toString()})} disabled={Number(query._page) === totalCount} className={Number(query._page) === totalCount ? "page-btn" : "page-btn page-btn-hover"}>next</button>
            </div>
            <div className={"post-list"}>
                <h1 style={{textAlign: "center", }}>Список постов</h1>
                <TransitionGroup>
                    {posts.map(post => (
                        <CSSTransition
                            key={post.id}
                            timeout={500}
                            classNames={"post"}
                        >
                            <PostItem setModalPost={setModalPost} deleteP={deleteP} post={post}/>
                        </CSSTransition>
                    ))}
                </TransitionGroup>
            </div>
        </div>

    );
};

export default PostList;
