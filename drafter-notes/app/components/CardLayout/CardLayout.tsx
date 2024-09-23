import { PropsWithChildren, ReactNode } from "react";
import styles from "./CardLayout.module.css";
import classNames from "classnames";
import TagsLayout from "../TagsLayout/TagsLayout";

interface CardInfo {
  title: string;
  description: string;
  category: string;
}

interface Props extends PropsWithChildren {
  children: ReactNode;  
  cardInfo: CardInfo;
  onClickCard?: () => void;
  onClickEdit?: () => void;
}

const CardLayout: React.FC<Props> = ({onClickCard, onClickEdit, cardInfo}) => {
  return (
    <div onClick={() => {
      if (onClickCard !== undefined) {
        onClickCard();
      }
    }} className={classNames("card", styles.cardLayout)}>
      <h5 className="card-title">Card title</h5>
      <p className="card-text">
        Some quick example text to build on the card title and make up the bulk
        of the cards content.
      </p>
      <TagsLayout>
        <button>Кнопка</button>
        <button>Кнопка</button>
        <button>Кнопка</button>
        <button>Кнопка</button>
        <button>Кнопка</button>
        <button>Кнопка</button>
      </TagsLayout>
      <button onClick={(event) => {
        if (onClickEdit !== undefined) {
          event.stopPropagation();
          onClickEdit();
        }
      }} style={{position: "absolute", left: "90%", marginTop: "0.1rem", zIndex: "2"}}>RR</button>
    </div>
  );
};

export default CardLayout;
