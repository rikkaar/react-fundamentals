import React, {useEffect, useMemo, useState, useTransition} from 'react';
import './styles/App.css';
import {Post} from '../src/types/types';
import PostItem from "./Components/PostItem";
import AddForm from "./Components/AddForm";
import PostFilter from "./Components/PostFilter";
import PostList from "./Components/PostList";
import Modal from "./Components/UI/Modal/Modal";
import MyButton from "./Components/UI/button/MyButton";


function App() {
    const [posts, setPosts] = useState<Post[]>([])
    const [filter, setFilter] = useState({sort: 'created', query: ''})
    const [inputValue, setInputValue] = useState('')
    const [modal, setModal] = useState(false)

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
        setModal(false)
    }

    const sortPosts = (sort: string, data: Post[]) => {
        if (sort == 'created') {
            return data.sort((a, b) => b.created.toString().localeCompare(a.created.toString()))
        } else if (sort == 'title') {
            return data.sort((a, b) => a.title.localeCompare(b.title))
        } else return []
    }

    const searchedPosts = useMemo(() => {
        return sortPosts(filter.sort, posts).filter(post => post.title.toLowerCase().includes(filter.query.toLowerCase()))
    }, [posts, filter])

    return (
        <div className={"app"}>
            <Modal visible={modal} setVisible={setModal}><AddForm create={createPost}/></Modal>
            <PostFilter inputValue={inputValue} setInputValue={setInputValue} filter={filter} setFilter={setFilter}/>
            <MyButton round={true} onClick={() => setModal(true)}>+</MyButton>
            <PostList posts={searchedPosts} deleteP={deletePostCallback}/>
        </div>
    );
}

export default App;
