import React, {useTransition} from 'react';
import Select from "./UI/Select";

interface Filter {
    filter?: {
        sort: string,
        query: string,
    },
    setFilter?: React.Dispatch<React.SetStateAction<{sort: string, query: string}>>
    inputValue: string,
    setInputValue:  React.Dispatch<React.SetStateAction<string>>,

    query: {q: string, _page: string, _order: string, _sort: string, _limit: string},
    setQuery: React.Dispatch<React.SetStateAction<{q: string, _page: string, _order: string, _sort: string, _limit: string}>>
}

const PostFilter = ({query, setQuery, inputValue, setInputValue}: Filter) => {
    const [isPending, startTransition] = useTransition()

    const onChange = ((q: string) => {
        setInputValue(q)
        startTransition(() => {
            setQuery({...query, q: q})
        })

    })

    const handleSortMethod = (sortMethod: string) => {
        if (sortMethod === 'created')
            setQuery({...query, _sort: sortMethod, _order: "desc"})
        else setQuery({...query, _sort: sortMethod, _order: "asc"})
    }

    return (
        <div className={"search"}>
            <Select
                value={query._sort}
                onChange={sort => handleSortMethod(sort.target.value)}
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
