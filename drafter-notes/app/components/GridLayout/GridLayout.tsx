'use client'
import { PropsWithChildren, ReactNode } from "react";


interface Props extends PropsWithChildren {
  children: ReactNode | ReactNode[];
}

const GridLayout: React.FC<Props> = ({ children }) => {
  let childrenMap: ReactNode[];  
  if (!Array.isArray(children)) {
    childrenMap = [];
    childrenMap.push(children);
  } else {
    childrenMap = children;
  }
  return (
    <div className="row">
      {childrenMap.map((element, index) => {
        return <div key={index} className="col" style={{display: "flex", justifyContent: "center"}}>
          {element}
        </div>
    })}
    </div>
  );
};

export default GridLayout;
