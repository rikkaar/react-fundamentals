import {Post} from "../../types/types";
import {useMemo} from "react";

export const useSortedPosts = (posts: Post[], sortMethod: string) => {
    const sortedPosts = useMemo(() => {
        if (sortMethod == 'created') {
            return posts.sort((a, b) => b.created.toString().localeCompare(a.created.toString()))
        } else if (sortMethod == 'title') {
            return posts.sort((a, b) => a.title.localeCompare(b.title))
        } else return posts
    }, [sortMethod, posts])

    return sortedPosts;
}



export const usePosts = (posts: Post[], sortMethod: string, query: string) => {
    const sortedPosts = useSortedPosts(posts, sortMethod);

    const searchedPosts = useMemo(() => {
        return sortedPosts.filter(post => post.title.toLowerCase().includes(query.toLowerCase()))
    }, [posts, sortMethod, query])

    return searchedPosts;
}