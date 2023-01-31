import React, {useEffect, useState} from 'react';
import './styles/App.css';
import {Post} from '../src/types/types';
import PostItem from "./Components/PostItem";
import AddForm from "./Components/AddForm";


function App() {
    let [posts, setPosts] = useState<Post[]>([])

    useEffect(() => {
        getPosts()
    }, [])

    function api<T>(url: string): Promise<T> {
        return fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(response.statusText)
                }
                return response.json() as Promise<T>
            })
    }

    let getPosts = () => {
        api<Post[]>("http://localhost:4000/posts")
            .then(data => setPosts(data))
        console.log("Запрос отправлен")
    }

    const deletePostCallback = (toDelete: string) => {
        // let filteredArray = posts.filter(post => post.id !== toDelete);
        // setPosts(filteredArray)
        getPosts()
    }

    const createPost = (newPost: Post) => {
        // setPosts([...posts, newPost])
        getPosts()
    }

    return (
        <div className={"app"}>
            <AddForm create={createPost}/>
            {posts.length
                ? <div>
                    <h1 style={{textAlign: "center", marginTop: '15px',}}>Список постов</h1>
                    {posts.map(post =>
                        <div>
                            <PostItem deleteP={deletePostCallback} post={post} key={post.id}/>
                        </div>)}
                </div>
                : <h1 style={{textAlign: "center", marginTop: '15px',}}>Список постов пуст</h1>
            }

        </div>
    );
}

export default App;
