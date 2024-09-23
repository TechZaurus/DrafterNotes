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
  setFilters,
  setNotes,
} from "../lib/features/notes/notesSlice";
import { setCategories } from "@/lib/features/notes/categoriesSlice";
import { useRouter } from "next/navigation";


export default function Home() {
  const notes = useSelector(
    (state: IRootState) => state.notes.notesState.notes
  );
  const filteredNotes = useSelector(
    (state: IRootState) => state.notes.filteredNotes.notes
  );
  const filters = useSelector((state: IRootState) => state.notes.filtersState);
  const categories = useSelector(
    (state: IRootState) => state.categories.categories
  );
  const filtersApplied = useSelector(
    (state: IRootState) => state.notes.filtersAppliedState
  );

  const onSelectSort = (sortOrder: string) => {
    router.push(filtersApplied ? "/" : `/?sortBy=${sortOrder}`);
    dispatch(
      setFilters({
        category: "",
        sortBy: sortOrder,
      })
    );
    dispatch(setFilterApplied(!filtersApplied));
  };

  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      dispatch(
        setNotes({
          notes: [
            {
              id: 1,
              dateCreated: new Date(),
              title: "Заметка 1",
              description: "Текст текст",
              category: "Категория 1",
            },
            {
              id: 2,
              dateCreated: new Date(),
              title: "Заметка 2",
              description: "Текст текст",
              category: "Категория 2",
            },
            {
              id: 3,
              dateCreated: new Date(),
              title: "Заметка 3",
              description: "Текст текст",
              category: "",
            },
          ],
        })
      );
    }, 500);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      dispatch(setCategories({ categories: ["Категория 1", "Категория 2"] }));
    }, 500);
  }, []);

  useEffect(() => {
    if (filters.category.length != 0 || filters.sortBy.length != 0) {
      setTimeout(() => {
        dispatch(
          setFilteredNotes({
            notes: [
              {
                id: 2,
                dateCreated: new Date(),
                title: "Заметка 2",
                description: "Текст текст",
                category: "Категория 2",
              },
            ],
          })
        );
      }, 500);
    }
  }, [filtersApplied]);

  const onClickCategory = () => {
    router.push(filtersApplied ? "/" : "/?category=1");
    dispatch(
      setFilters({
        category: "Категория 1",
        sortBy: "",
      })
    );
    dispatch(setFilterApplied(!filtersApplied));
  };

  return (
    <ReduxProvider>
      <div className="page">
        <main className={styles.main}>
          <Header>Мои заметки</Header>
          <br />
          <TagsLayout>
            <select
              onChange={(event) => onSelectSort(event.target.value)}
              value={filters.sortBy}
            >
              <option value={""}>По дате: сначала новые</option>
              <option value={"old"}>По дате: сначала старые</option>
            </select>
            {categories.map((category, index) => (
              <button key={index} onClick={() => onClickCategory()}>
                {category}
              </button>
            ))}
          </TagsLayout>
          <br />
          <GridLayout>
            {(filtersApplied ? filteredNotes : notes).map((note: Note, index) => (
              <CardLayout cardInfo={
                {
                  title: note.title,
                  description: note.description,
                  category: note.category
                }
              } 
              onClickCard={() => {
                console.log("OnClickCard")
                router.push("/" + String(note.id));
              }}
              onClickEdit={() => {
                console.log("onClickEdit")
                router.push("/" + String(note.id) + "/edit");
              }}
              key={index}>note.name</CardLayout>
            ))}
          </GridLayout>
        </main>
      </div>
    </ReduxProvider>
  );
}
