'use client'
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./page.module.css";
import TagsLayout from "../components/TagsLayout/TagsLayout";
import classNames from "classnames";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  const pathname = usePathname();

  const onClickEdit = () => {
    router.push(pathname + "/edit");
  }

  return (
    <>
      <main className={classNames("page", styles.noteContainer)}>
        <div className={styles.mainSection}>
          <div className={styles.heading}>
            <h5>Название заметки</h5>
            <button onClick={() => onClickEdit()}>RR</button>
          </div>
          <br />
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <div className={styles.categories}>
          <TagsLayout >
            <button>Кнопка</button>
            <button>Кнопка</button>
            <button>Кнопка</button>
          </TagsLayout>
          </div>
        </div>
        <div className={styles.imageSection}>
          <Image
            width={500}
            height={500}
            src="https://img.freepik.com/premium-vector/test-time-concept-clipboard-with-dough-form-pencil-stopwatch-vector-filling-writing-tests_153097-6256.jpg"
            alt="test"
          />
        </div>
      </main>
    </>
  );
};

export default Page;
