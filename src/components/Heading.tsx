import { ReactElement } from "react"

type Heading = { title: string }
const Heading = ({ title }: {title: string}):ReactElement => {
    return  <h1>{title}</h1>
} 

export default Heading
