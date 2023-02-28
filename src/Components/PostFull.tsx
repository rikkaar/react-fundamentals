import React, {useState} from 'react';
import {PostFullInterface} from "../types/types";


const PostFull = ({post, comments}: PostFullInterface) => {
    if (post && comments)
        return (
            <div>
                <div>
                    {post.title}
                </div>
                <div className="">
                    {comments.map(comment => {
                        return (
                            <div key={comment.id} style={{display:"flex", justifyContent: "space-between"}}>
                                <div>
                                    {comment.id}
                                </div>
                                <div>
                                    {comment.body}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    else return (
        <>
            Нет такого поста
        </>
    );
};

export default PostFull;
