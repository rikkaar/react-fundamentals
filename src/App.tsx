import React, {useEffect, useMemo, useState} from 'react';
import './styles/App.css';
import {Post} from '../src/types/types';
import PostItem from "./Components/PostItem";
import AddForm from "./Components/AddForm";
import Select from "./Components/UI/Select";


function App() {
    const [posts, setPosts] = useState<Post[]>([])
    const [selectedSort, setSelectedSort] = useState('created')
    const [searchQuery, setSearchQuery] = useState("")
    const [filter, setFilter] = useState({sort: 'created', query: ''})

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
            .then(data => setPosts(sortPosts(selectedSort, data)))
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

    const sortPosts = (sort: string, data: Post[]) => {
        if (sort == 'created') {
            return data.sort((a, b) => b.created.toString().localeCompare(a.created.toString()))
        }
        else if (sort == 'title') {
            return data.sort((a, b) => a.title.localeCompare(b.title))
        }
        else return []
    }

    const handleSortMethod = (sort: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedSort(sort.target.value)
        setPosts(sortPosts(sort.target.value, posts))

    }

    const sortedPosts = useMemo(() => {
        sortPosts(selectedSort, posts)
    }, [selectedSort, posts]);


    const searchedPosts = useMemo(() => {
        console.log('done')
        return sortPosts(selectedSort, posts).filter(post => post.title.toLowerCase().includes(searchQuery))
    }, [posts, selectedSort, searchQuery])

    return (
        <div className={"app"}>
            <AddForm create={createPost}/>
            <div className={"search"}>
                <Select
                    value={selectedSort}
                    onChange={handleSortMethod}
                    options={[
                        {value: 'created', name: "По дате создания"},
                        {value: 'title', name: "По названию"}
                    ]}
                />
                <input
                    value={searchQuery}
                    onChange={event => setSearchQuery(event.target.value)}
                    className={"text-field search-field"}
                    type="text"
                    placeholder={"Поиск..."}
                />
            </div>
            {searchedPosts.length
                ? <div>
                    <h1 style={{textAlign: "center", marginTop: '15px',}}>Список постов</h1>
                    {searchedPosts.map(post =>
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
