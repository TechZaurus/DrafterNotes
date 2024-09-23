import { PropsWithChildren } from "react";


interface Props extends PropsWithChildren {
    children: string;
}


const Header: React.FC<Props> = ({children}) => {
    return <div>{children}</div>
}


export default Header;