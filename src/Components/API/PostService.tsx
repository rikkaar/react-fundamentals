import {Post} from "../../types/types";
import React from "react";

const apilink = 'http://localhost:4000/posts?_sort=created&_order=desc&_page=1';


interface QueryParams {
    q: string,
    _page: string,
    _order: string,
    _sort: string,
    _limit: string
}

interface Pagination {
    setTotalCount: React.Dispatch<React.SetStateAction<number>>
}


export default class PostService {
    static async api<T>(url: string, {...params}: QueryParams, {setTotalCount}: Pagination): Promise<T> {
        const response = await fetch(url + new URLSearchParams(params));
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        setTotalCount(Math.ceil(Number(response.headers.get("x-total-count")) / Number(params._limit)))
        return await (await response.json() as Promise<T>);
    }

    static async getPost<T>(id: string): Promise<T> {
        return await fetch(`http://localhost:4000/posts/${id}`)
            .then(response => response.json() as Promise<T>)
    }

    static async getComments<T>(postId: string): Promise<T> {
        return await fetch(`http://localhost:4000/comments?postId=${postId}`)
            .then(response => response.json() as Promise<T>)
    }
}