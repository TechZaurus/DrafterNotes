"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import Image from "next/image";
import styles from "./page.module.css";
import {
  FormProvider,
  SubmitHandler,
  useForm,
  useFormContext,
} from "react-hook-form";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { IRootState, useAppDispatch } from "@/lib/store";
import {
  addNote,
  editNote,
  getNote,
  setCurrentNote,
} from "@/lib/features/notes/notesSlice";
import { useSelector } from "react-redux";
import { setCategories } from "@/lib/features/notes/categoriesSlice";

interface IFormInputs {
  name: string;
  note: string;
  category: string;
}

interface TitleFormProps {
  title: string | undefined;
}

const TitleForm = ({ title }: TitleFormProps) => {
  const { register } = useFormContext<IFormInputs>();
  return (
    <div>
      <label className={styles.label}>Название заметки:</label>
      <br />
      <input
        defaultValue={title}
        className={styles.titleField}
        {...register("name")}
      />
    </div>
  );
};

interface NoteFormProps {
  note: string | undefined;
}

const NoteForm = ({ note }: NoteFormProps) => {
  const { register } = useFormContext<IFormInputs>();
  return (
    <div>
      <label className={styles.label}>Описание:</label>
      <br />
      <div className={styles.noteField}>
        <textarea
          defaultValue={note}
          className={styles.noteField}
          rows={12}
          {...register("note")}
        />
      </div>
    </div>
  );
};

interface CategoryFormProps {
  categories: string[];
  currentCategory: string | undefined;
}

const CategoryForm = ({ categories, currentCategory }: CategoryFormProps) => {
  console.log("Category: ", currentCategory);
  const { register } = useFormContext<IFormInputs>();
  return (
    <div>
      <label className={styles.label}>Категория:</label>
      <br />
      <select
        defaultValue={currentCategory}
        className={styles.select}
        {...register("category")}
      >
        {categories.map((category) => {
          return <option key={category}>{category}</option>;
        })}
      </select>
    </div>
  );
};

const Page = () => {
  const note = useSelector((state: IRootState) => state.notes.currentNote);
  const categories = useSelector(
    (state: IRootState) => state.categories.categories
  );

  const pathName = usePathname();
  const id = pathName[1];
  const queryParams = useSearchParams();

  const dispatch = useAppDispatch();
  const router = useRouter();

  const methods = useForm<IFormInputs>();

  useEffect(() => {
    console.log(note);
    methods.reset({
      name: note?.title,
      note: note?.description,
      category: note?.category
    })
  }, [note, methods])

  const onSubmit: SubmitHandler<IFormInputs> = (data) => {
    if (queryParams.has("new")) {
      addNote({
        id: Number(id),
        dateCreated: new Date().getTime(),
        title: data.name,
        description: data.note,
        category: data.category,
      }, () => router.push("/"));
    } else {
      editNote(Number(id), {
        id: Number(id),
        dateCreated: note === undefined ? new Date().getTime() : note?.dateCreated,
        title: data.name,
        description: data.note,
        category: data.category,
      }, () => router.push("/"));
    }
  };

  useEffect(() => {
    dispatch(setCategories());
    getNote(Number(id), (note) => setCurrentNote(note), () => setCurrentNote(undefined));
  }, [id, dispatch]);

  return (
    <main className="page">
      <div className={styles.noteContainer}>
        <div className={styles.imageSection}>
          <Image width={400} height={400} src="/note_add_edit.svg" alt="test" />
        </div>
        <div className={styles.mainSection}>
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
              <TitleForm title={note === undefined? "" : note.title} />
              <br />
              <NoteForm note={note === undefined ? "" : note.description} />
              <br />
              <CategoryForm
                categories={categories}
                currentCategory={
                  note === undefined ? categories[0] : note.category
                }
              />
              <br />
              <button className={styles.button} type="submit">
                {queryParams.has("new") ? "Создать" : "Сохранить"}
              </button>
            </form>
          </FormProvider>
        </div>
      </div>
    </main>
  );
};

export default Page;
