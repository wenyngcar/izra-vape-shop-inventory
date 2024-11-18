import {ReactNode} from 'react'
// import { render } from 'react-dom'

interface ListProps<T>{
    items:T[],
    render: (item: T) => ReactNode
}

// to realize that it's general :T  extends {} or T,
const list = <T,>({items, render}: ListProps<T>) => {
return (
    <ul>
        {items.map((item,i)=> (
            <li key={i}>
                {render (item)} 
            </li>
        )
    )}
    </ul>
)
}

export default list
