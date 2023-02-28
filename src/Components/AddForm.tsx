import React, { SyntheticEvent, useEffect, useRef, useState} from 'react';
import MyButton from "./UI/button/MyButton";
import setPosts from '../App'
import {Post} from "../types/types";

interface AddInterface {
    create: () => void
}

const AddForm = ({create}: AddInterface) => {
    const defaultFormData = {
        title: '',
        body: '',
    };
    const [formData, setFormData] = useState(defaultFormData)
    const {title, body} = formData;
    const buttonRef = useRef<HTMLButtonElement>(null)


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (body && title) {
            fetch("http://localhost:4000/posts", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({"title": title, "body": body, "created": Date.now(), "userId": 1})
            }).then(response => {
                    if (!response.ok) {
                        throw new Error(response.statusText)
                    }
                    create()
                    setFormData(defaultFormData);

                }
            );
        }

    }

    useEffect(() => {
        buttonRef.current!.disabled = !(body && title);
    }, [body, title])

    return (
            <form className={"form"} onSubmit={handleSubmit}>
                <input value={title} id={"title"} onChange={event => setFormData({...formData, title: event.target.value})} required={true} className={"form__title text-field"} type="text" placeholder="Название поста"/>
                <textarea value={body} id={"body"} onChange={event => setFormData({...formData, body: event.target.value})} required={true} className={"form__descr text-field"} placeholder="Описание поста"/>
                <button ref={buttonRef} disabled={true} className={body && title ? "btn add-btn form__btn" : "btn form__btn"}>Добавить</button>
            </form>
    );
    // const [title, setTitle] = useState<String>('')
    // const [descr, setDescr] = useState<String>('')
    // const buttonRef = useRef<HTMLButtonElement>(null)
    // const formRef = useRef<HTMLFormElement>(null)
    //
    // let handleSubmit = (event: SyntheticEvent): void =>{
    //     event.preventDefault()
    //     if (descr && title) {
    //         console.log(JSON.stringify({"title": title, "body": descr, "created": Date.now()}))
    //         fetch("http://localhost:4000/posts", {
    //             method: "POST",
    //             headers: {"Content-Type": "application/json"},
    //             body: JSON.stringify({"title": title, "body": descr, "created": Date.now()})
    //         }).then(response => {
    //                 if (!response.ok) {
    //                     throw new Error(response.statusText)
    //                 }
    //                 formRef.current!.reset();
    //                 setTitle('');
    //                 setDescr('');
    //             }
    //
    //         );
    //
    //     }
    // }
    //
    // useEffect(() => {
    //     buttonRef.current!.disabled = !(descr && title);
    // }, [descr, title])
    //
    // type FA = {
    //     text: string;
    // }
    //
    // class AddForm extends React.Component<any, FA> {
    //     state = {
    //         text: ''
    //     }
    // }
    //
    // return (
    //     <form ref={formRef} className={"form"} onSubmit={handleSubmit}>
    //         <input onChange={event => {setTitle(event.target.value)}} required={true} className={"form__title text-field"} type="text" placeholder="Название поста"/>
    //         <textarea onChange={event => {setDescr(event.target.value)}} required={true} className={"form__descr text-field"} placeholder="Описание поста"/>
    //         <button disabled={true} ref={buttonRef} className={"btn add-btn form__btn"}>Добавить</button>
    //     </form>
    // );
};

export default AddForm;
