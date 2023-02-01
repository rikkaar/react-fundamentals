import {Post} from "../../types/types";

const apilink = 'http://localhost:4000/posts?_sort=created&_order=desc&_page=1';


// + new URLSearchParams({
//     "_page": "1",
//     "_order": "desc"
// })


export default class PostService {
    static async api<T>(url: string): Promise<T> {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        console.log('Запрос отправлен')
        return await (await response.json() as Promise<T>);
    }

}