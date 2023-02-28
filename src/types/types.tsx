export interface Post {
    id: string,
    title: string,
    body: string,
    created: string,
    userId: string
}

export interface Comments {
    id: string,
    body: string,
    created: string,
    userId: string,
    postId: string
}

export interface PostFullInterface {
    post?: Post,
    comments?: Comments[],
}