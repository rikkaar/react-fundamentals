import {useState} from "react";

interface Pages {
    _page: string,
    totalCount: number
}

export const usePagination = ({_page, totalCount}:Pages) => {

    return [Number(_page)>1, _page, Number(_page)<totalCount, totalCount] as const
}