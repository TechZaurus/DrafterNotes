
import { PropsWithChildren, ReactNode } from "react"
import styles from "./TagsLayout.module.css"


interface Props extends PropsWithChildren {
    children: ReactNode;
}


const TagsLayout : React.FC<Props> = ({children}) => {
    return <div className={styles.TagsLayout}>{children}</div>
}


export default TagsLayout;