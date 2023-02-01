import React, {useEffect, useMemo, useState, useTransition} from 'react';
import './styles/App.css';
import {Post} from '../src/types/types';
import PostItem from "./Components/PostItem";
import AddForm from "./Components/AddForm";
import PostFilter from "./Components/PostFilter";
import PostList from "./Components/PostList";
import Modal from "./Components/UI/Modal/Modal";
import MyButton from "./Components/UI/button/MyButton";
import {usePosts} from "./Components/hooks/usePosts";
import PostService from "./Components/API/PostService";
import set = Reflect.set;
import Loader from "./Components/UI/Loader/Loader";
import {useFetching} from "./Components/hooks/useFetching";

function App() {
    const [posts, setPosts] = useState<Post[]>([])
    const [filter, setFilter] = useState({sort: '', query: ''})
    const [inputValue, setInputValue] = useState('')
    const [modal, setModal] = useState(false)
    const searchedPosts = usePosts(posts, filter.sort, filter.query)
    const [getPosts, isLoading, error] = useFetching(async () => {
        const response = await PostService.api<Post[]>("http://localhost:4000/posts?")
        setPosts(response)
    })

    useEffect(() => {
        getPosts()
    }, [])


    const deletePostCallback = (toDelete: string) => {
        let filteredArray = posts.filter(post => post.id !== toDelete);
        setPosts(filteredArray)
        // getPosts()
    }

    const createPost = (newPost: Post) => {
        // setPosts([...posts, newPost])
        getPosts()
        setModal(false)
    }


    return (
        <div className={"app"}>
            <Modal visible={modal} setVisible={setModal}><AddForm create={createPost}/></Modal>
            <PostFilter inputValue={inputValue} setInputValue={setInputValue} filter={filter} setFilter={setFilter}/>
            <MyButton round={true} onClick={() => setModal(true)}>+</MyButton>
            {error && <h1 style={{textAlign: "center", marginTop: '15px',}}>Произошла ошибка :(</h1>}
            {isLoading
                ? <Loader/>
                : <PostList posts={searchedPosts} deleteP={deletePostCallback}/>
            }
        </div>
    );
}

export default App;
