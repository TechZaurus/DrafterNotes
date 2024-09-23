"use client";
import { useSelector } from "react-redux";
import CardLayout from "./components/CardLayout/CardLayout";
import GridLayout from "./components/GridLayout/GridLayout";
import Header from "./components/Header/Header";
import TagsLayout from "./components/TagsLayout/TagsLayout";
import styles from "./page.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { IRootState, useAppDispatch } from "@/lib/store";
import ReduxProvider from "@/app/ReduxProvider";
import { useEffect } from "react";
import {
  Note,
  setFilterApplied,
  setFilteredNotes,
  setNotes,
} from "../lib/features/notes/notesSlice";
import { setCategories } from "@/lib/features/notes/categoriesSlice";
import { useRouter, useSearchParams } from "next/navigation";


export default function Home() {
  const notes = useSelector(
    (state: IRootState) => state.notes.notesState.notes
  );
  const filteredNotes = useSelector(
    (state: IRootState) => state.notes.filteredNotes.notes
  );
  const categories = useSelector(
    (state: IRootState) => state.categories.categories
  );
  const filtersApplied = useSelector(
    (state: IRootState) => state.notes.filtersAppliedState
  );

  const onSelectSort = (sortOrder: string) => {
    const category = params.get("category");
    router.push(
       `/?sortBy=${sortOrder}&category=${category == null ? "" : category}`
    );
    dispatch(
      setFilterApplied(
        sortOrder != "" || (category != null && category.length > 0)
      )
    );
  };

  
  const onClickCategory = (index: number, category: string) => {
    const categoryParam = params.get("category");
    if (category === categoryParam) {
      category = "";
    }
    const sortBy = params.get("sortBy");
    router.push(
      `/?sortBy=${sortBy === null ? "" : sortBy}&category=${category}`
   );
   dispatch(
    setFilterApplied(
      category != "" || (sortBy != null && sortBy.length > 0)
    )
  );
  };

  const dispatch = useAppDispatch();
  const router = useRouter();
  const params = useSearchParams();

  const getAllNotes = () => {
    dispatch(
      setNotes()
    );
  };

  const getFilteredNotes = () => {
    const paramCategory = params.get("category");
    const paramSortBy = params.get("sortBy");
    const category = paramCategory === null ? "" : paramCategory;
    const sortBy = paramSortBy === null ? "" : paramSortBy;
    dispatch(setFilteredNotes({ category, sortBy }));
  };

  useEffect(() => {
    setTimeout(() => {
      const sortOption = params.get("sortBy");
      const categoryOption = params.get("category");
      if (
        (sortOption != null && sortOption.length > 0) ||
        (categoryOption != null && categoryOption.length > 0)
      ) {
        dispatch(setFilterApplied(true));
        getFilteredNotes();
      } else {
        getAllNotes();
      }
    }, 500);
  }, [params]);

  useEffect(() => {
    setTimeout(() => {
      dispatch(
        setCategories()
      );
    }, 500);
  }, []);

  const onClickAdd = () => {
    router.push(`/${notes.length + 1}/edit?new`);
  };

  const sortParam = params.get("sortBy");
  const categoryParam = params.get("category");
  const selectParam = sortParam === null ? "" : sortParam;
  const buttonParam = categoryParam === null ? "" : categoryParam;

  return (
    <ReduxProvider>
      <div className="page">
        <main className={styles.main}>
          <Header>Мои заметки</Header>
          <br />
          <TagsLayout>
            <select
              className={styles.select}
              onChange={(event) => onSelectSort(event.target.value)}
              value={selectParam}
            >
              <option value={""}>По дате: сначала новые</option>
              <option value={"old"}>По дате: сначала старые</option>
            </select>
            <button className={styles.addButton} onClick={() => onClickAdd()}>+ Добавить</button>
            {categories.map((category, index) => (
              <button
                className={
                  category.length > 0 && category === buttonParam
                    ? styles.category__Selected
                    : styles.category
                }
                key={index}
                onClick={() => onClickCategory(index, category)}
              >
                {category}
              </button>
            ))}
          </TagsLayout>
          <br />
          <GridLayout>
            {(filtersApplied ? filteredNotes : notes).map(
              (note: Note, index) => (
                <CardLayout
                  cardInfo={{
                    title: note.title,
                    description: note.description,
                    category: note.category,
                  }}
                  onClickCard={() => {
                    router.push("/" + String(note.id));
                  }}
                  onClickEdit={() => {
                    router.push("/" + String(note.id) + "/edit");
                  }}
                  key={index}
                >
                  note.name
                </CardLayout>
              )
            )}
          </GridLayout>
        </main>
      </div>
    </ReduxProvider>
  );
}
