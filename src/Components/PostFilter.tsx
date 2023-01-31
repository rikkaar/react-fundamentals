import React, {useTransition} from 'react';
import Select from "./UI/Select";

interface Filter {
    filter: {
        sort: string,
        query: string,
    },
    setFilter: React.Dispatch<React.SetStateAction<{sort: string, query: string}>>
    inputValue: string,
    setInputValue:  React.Dispatch<React.SetStateAction<string>>
}

const PostFilter = ({filter, setFilter, inputValue, setInputValue}: Filter) => {
    const [isPending, startTransition] = useTransition()

    const onChange = ((query: string) => {
        setInputValue(query)
        startTransition(() => {
            setFilter({...filter, query: query})
        })

    })

    return (
        <div className={"search"}>
            <Select
                value={filter.sort}
                onChange={sort => setFilter({...filter, sort: sort.target.value})}
                options={[
                    {value: 'created', name: "По дате создания"},
                    {value: 'title', name: "По названию"}
                ]}
            />
            <input
                value={inputValue}
                onChange={event => onChange(event.target.value)}
                className={"text-field search-field"}
                type="text"
                placeholder={"Поиск..."}
            />
        </div>
    );
};

export default PostFilter;
