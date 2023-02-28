import React, {useEffect, useState} from 'react';
import {Comments, Post, PostFullInterface} from '../../types/types';
import AddForm from "../AddForm";
import PostFilter from "../PostFilter";
import PostList from "../PostList";
import Modal from "../UI/Modal/Modal";
import MyButton from "../UI/button/MyButton";
import PostService from "../API/PostService";
import Loader from "../UI/Loader/Loader";
import {useFetching} from "../hooks/useFetching";
import PostFull from "../PostFull";
import {useParams, useSearchParams} from 'react-router-dom'

function Posts() {
    const [posts, setPosts] = useState<Post[]>([])

    const [modal, setModal] = useState(false)
    const [inputValue, setInputValue] = useState('')
    const [totalCount, setTotalCount] = useState(1)
    const [queryParams, setQueryParams] = useState({
        q: '',
        _page: '1',
        _order: 'desc',
        _sort: 'created',
        _limit: '10',
    })

    const [modalPost, setModalPost] = useState(false)
    const [renderPost, setRenderPost] = useState()
    const [searchParams, setSearchParams] = useSearchParams();

    const {id} = useParams()
    const [PostFulls, setPostFull] = useState<PostFullInterface>()

    let handlePostFetching = async ( id?: string, post?: Post) => {
        if (post) {
            PostService.getComments<Comments[]>(post.id)
                .then(comments => setPostFull({post, comments}))
        }
        else if (id) {
            const resPost = await PostService.getPost<Post>(id)
            const resComments = await PostService.getComments<Comments[]>(id)
            setPostFull({post: resPost, comments: resComments})
        }
        else console.log("Произошла ошибка в получении поста!")
    }

    useEffect(()=> {
        if (id) {
            handlePostFetching(id)
            setModalPost(true)
        }
    }, [id])

    let fetchPosts = async () => {
        const response = await PostService.api<Post[]>("http://localhost:4000/posts?", queryParams, {setTotalCount})
        setPosts(response)
    }


    const [getPosts, isLoading, error] = useFetching(fetchPosts)

    useEffect(() => {
        getPosts()
    }, [queryParams])


    const deletePostCallback = (toDelete: string) => {
        // let filteredArray = posts.filter(post => post.id !== toDelete);
        // setPosts(filteredArray)
        getPosts()
    }

    const createPost = () => {
        // setPosts([...posts, newPost])
        getPosts()
        setModal(false)
    }


    return (
        <div>
            <div>
                <Modal visible={modal} setVisible={setModal}><AddForm create={createPost}/></Modal>
                <PostFilter inputValue={inputValue} setInputValue={setInputValue} query={queryParams}
                            setQuery={setQueryParams}/>
                <MyButton style={{position: "absolute", zIndex: 0}} round={true}
                          onClick={() => setModal(true)}>+</MyButton>
                {error && <h1 style={{textAlign: "center", marginTop: '15px',}}>Произошла ошибка :(</h1>}
                {isLoading
                    ? <Loader/>
                    : <PostList setModalPost={setModalPost} totalCount={totalCount} query={queryParams}
                                setQuery={setQueryParams} posts={posts} deleteP={deletePostCallback}/>
                }
            </div>
            <Modal visible={modalPost} setVisible={setModalPost}><PostFull comments={PostFulls?.comments} post={PostFulls?.post}/></Modal>
        </div>
    );
}

export default Posts;
