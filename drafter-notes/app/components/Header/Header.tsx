import { PropsWithChildren } from "react";
import styles from "./Header.module.css";


interface Props extends PropsWithChildren {
    children: string;
}


const Header: React.FC<Props> = ({children}) => {
    return <div className={styles.header}>{children}</div>
}


export default Header;