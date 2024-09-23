import { http } from "msw";

export const handlers = [
  http.get("/notes", () => {
    return new Response(JSON.stringify([
  {
    id: 1,
    dateCreated: new Date(1469453907836),
    title: "Заметка 1",
    description: "Текст текст",
    category: "Категория 1",
  },
  {
    id: 2,
    dateCreated: new Date(1469433907836),
    title: "Заметка 2",
    description: "Текст текст",
    category: "Категория 2",
  },
  {
    id: 3,
    dateCreated: new Date(1469403907836),
    title: "Заметка 3",
    description: "Текст текст",
    category: "",
  },
]));
  }),
];