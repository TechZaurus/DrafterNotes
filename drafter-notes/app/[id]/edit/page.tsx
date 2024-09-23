'use client'
import "bootstrap/dist/css/bootstrap.min.css";
import Image from "next/image";
import styles from "./page.module.css";
import TagsLayout from "@/app/components/TagsLayout/TagsLayout";
import { FormProvider, SubmitHandler, useForm, useFormContext } from "react-hook-form";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { IRootState, useAppDispatch } from "@/lib/store";
import { addNote, editNote, setCurrentNote } from "@/lib/features/notes/notesSlice";
import { useSelector } from "react-redux";
import { setCategories } from "@/lib/features/notes/categoriesSlice";

interface IFormInputs {
    name: string;
    note: string;
    category: string;
  }

  interface TitleFormProps {
    title: string;
  }

const TitleForm = ({title}: TitleFormProps) => {
  const {register} = useFormContext<IFormInputs>();
  return (
    <div>
      <label className={styles.label}>Название заметки:</label>
      <br/>
      <input value={title} className={styles.titleField} {...register("name")} />
    </div>
  );
};

interface NoteFormProps {
  note: string | undefined;
}

const NoteForm = ({note} : NoteFormProps) => {
    const {register} = useFormContext<IFormInputs>();
    return (
        <div>
            <label className={styles.label}>Описание:</label>
            <br/>
            <div className={styles.noteField}>
                <textarea value={note} className={styles.noteField} rows={12} {...register("note")}/>
            </div>
        </div>
    );
}


interface CategoryFormProps {
  categories: string[];
  currentCategory: string | undefined;
}


const CategoryForm = ({categories, currentCategory}: CategoryFormProps) => {
  console.log(currentCategory);
  const {register} = useFormContext<IFormInputs>();
  return (
    <div>
      <label className={styles.label}>Категория:</label>
      <br/>
      <select value={currentCategory} className={styles.select} {...register("category")}>
        {categories.map((category) => {
          return <option key={category} value={currentCategory}>{category}</option>
        })}
      </select>
    </div>
  );
}


const Page = () => {
  const note = useSelector((state: IRootState) => state.notes.currentNote);
  const categories = useSelector((state: IRootState) => state.categories.categories);

  const pathName = usePathname();
  const id = pathName[1];
  const queryParams = useSearchParams();

  const dispatch = useAppDispatch();
  const router = useRouter();

  const methods = useForm<IFormInputs>();
  const onSubmit : SubmitHandler<IFormInputs> = (data) => {
    if (queryParams.has("new")) {
      dispatch(addNote({
        id: Number(id), 
        dateCreated: new Date(),
        title: data.name,
        description: data.note,
        category: data.category
      }))
    } else {
      dispatch(editNote({
        id: Number(id),
        dateCreated: note === undefined? new Date() : note?.dateCreated,
        title: data.name,
        description: data.note,
        category: data.category
      }))
    }
    router.push("/");
  };

  useEffect(() => {
    dispatch(setCategories());
    dispatch(setCurrentNote(Number(id)));
  }, [])

  return (
    <main className="page">
      <div className={styles.noteContainer}>
        <div className={styles.imageSection}>
          <Image
            width={400}
            height={400}
            src="/note_add_edit.svg"
            alt="test"
          />
        </div>
        <div className={styles.mainSection}>
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
                <TitleForm title={note === undefined? "" : note.title} />
                <br/>
                <NoteForm note={note?.description}/>
                <br/>
                <CategoryForm categories={categories} currentCategory={note === undefined? categories[0] : note.category}/>
                <br/>
                <button className={styles.button} type="submit">{queryParams.has("new") ? "Создать" : "Сохранить"}</button>
            </form>
          </FormProvider>
        </div>
        
      </div>
    </main>
  );
};

export default Page;
