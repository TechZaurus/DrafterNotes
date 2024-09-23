'use client'
import "bootstrap/dist/css/bootstrap.min.css";
import Image from "next/image";
import styles from "./page.module.css";
import TagsLayout from "@/app/components/TagsLayout/TagsLayout";
import { FormProvider, SubmitHandler, useForm, useFormContext } from "react-hook-form";

interface IFormInputs {
    name: string;
    note: string;
    category: string;
  }

const TitleForm = () => {
  const {register} = useFormContext<IFormInputs>();
  return (
    <div>
      <label>Название заметки:</label>
      <br/>
      <input className={styles.titleField} {...register("name")} />
    </div>
  );
};

const NoteForm = () => {
    const {register} = useFormContext<IFormInputs>();
    return (
        <div>
            <label>Описание:</label>
            <br/>
            <div className={styles.noteField}>
                <textarea style={{width: "100%"}} rows={12} {...register("note")}/>
            </div>
        </div>
    );
}


const CategoryForm = () => {
  const {register} = useFormContext<IFormInputs>();
  return (
    <div>
      <label>Категория:</label>
      <br/>
      <select {...register("category")}>
        <option value={"cat_1"}>Категория 1</option>
        <option value={"cat_2"}>Категория 2</option>
      </select>
    </div>
  );
}


const Page = () => {
  const methods = useForm<IFormInputs>();
  const onSubmit : SubmitHandler<IFormInputs> = (data) => {
    console.log(data);
  };

  return (
    <main className="page">
      <div className={styles.noteContainer}>
        <div className={styles.imageSection}>
          <Image
            width={500}
            height={500}
            src="https://img.freepik.com/premium-vector/test-time-concept-clipboard-with-dough-form-pencil-stopwatch-vector-filling-writing-tests_153097-6256.jpg"
            alt="test"
          />
        </div>
        <div className={styles.mainSection}>
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
                <TitleForm/>
                <br/>
                <NoteForm/>
                <br/>
                <CategoryForm/>
                <br/>
                <button type="submit">Кнопка</button>
            </form>
          </FormProvider>
        </div>
        
      </div>
    </main>
  );
};

export default Page;
