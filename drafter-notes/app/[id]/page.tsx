"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./page.module.css";
import TagsLayout from "../components/TagsLayout/TagsLayout";
import classNames from "classnames";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { IRootState, useAppDispatch } from "@/lib/store";
import { useSelector } from "react-redux";
import { setCurrentNote } from "@/lib/features/notes/notesSlice";
import { useEffect } from "react";
import { Pencil } from "lucide-react";

const Page = () => {
  const router = useRouter();
  const pathname = usePathname();

  const note = useSelector((state: IRootState) => state.notes.currentNote);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setCurrentNote(Number(pathname.slice(1)) - 1));
  }, []);

  const onClickEdit = () => {
    router.push(pathname + "/edit");
    console.log("onclick");
  };

  return (
    <>
      <main className={classNames("page", styles.noteContainer)}>
        <div className={styles.mainSection}>
          <div className={styles.heading}>
            <h5 className={styles.title}>{note?.title}</h5>
            <button
              className={styles.editIcon}
              onClick={(event) => onClickEdit()}
            >
              <Pencil />
            </button>
          </div>
          <p><i>{note?.dateCreated.toLocaleDateString()}</i></p>
          <br/>
          <p className={styles.description}>
            {note?.description}
          </p>
          <div className={styles.categories}>
            <TagsLayout>
              {note?.category !== "" && <div className={styles.category}>{note?.category}</div>}
            </TagsLayout>
          </div>
        </div>
        <div className={styles.imageSection}>
          <Image
            width={500}
            height={500}
            src="/note_edit.svg"
            alt="image"
          />
        </div>
      </main>
    </>
  );
};

export default Page;
