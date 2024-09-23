import { PropsWithChildren, ReactNode } from "react";
import styles from "./CardLayout.module.css";
import classNames from "classnames";
import TagsLayout from "../TagsLayout/TagsLayout";
import { Pencil } from "lucide-react";

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
  style?: React.CSSProperties;
}

const CardLayout: React.FC<Props> = ({onClickCard, onClickEdit, cardInfo}) => {
  return (
    <div onClick={() => {
      if (onClickCard !== undefined) {
        onClickCard();
      }
    }} className={classNames("card", styles.cardLayout)}>
      <h5 className={styles.cardTitle}>{cardInfo.title}</h5>
      <p className={styles.cardDescription}>
        {cardInfo.description}
      </p>
      <TagsLayout>
        {cardInfo.category != "" && <div className={styles.category}>{cardInfo.category}</div>}
      </TagsLayout>
      <button className={styles.editIcon} onClick={(event) => {
        if (onClickEdit !== undefined) {
          event.stopPropagation();
          onClickEdit();
        }
      }}><Pencil/></button>
    </div>
  );
};

export default CardLayout;
