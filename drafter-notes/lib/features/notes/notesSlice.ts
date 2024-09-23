import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export interface NotesState {
  notesState: Notes;
  filtersAppliedState: boolean;
  filteredNotes: Notes;
  currentNote: Note | undefined;
}

export interface Note {
  id: number;
  dateCreated: number;
  title: string;
  description: string;
  category: string;
}

export interface Notes {
  notes: Array<Note>;
}

export interface Filters {
  category: string;
  sortBy: string;
}

export interface EditAction {
  note: Note;
  callback: () => void;
}

const initialState: NotesState = {
  notesState: { notes: [] },
  filtersAppliedState: false,
  filteredNotes: { notes: [] },
  currentNote: undefined,
};

function compare(a: Note, b: Note) {
  if (a.dateCreated < b.dateCreated) {
    return -1;
  }
  if (a.dateCreated > b.dateCreated) {
    return 1;
  }
  return 0;
}


export const getNotes = (callback: (notes: Note[]) => void) =>  {
  axios
        .get("http://127.0.0.1:8080/notes")
        .then((response) => {
          const newNotes: Array<Note> = response.data.map((note: Note) =>  { return {
            id: Number(note.id),
            dateCreated: note.dateCreated,
            title: note.title,
            description: note.description,
            category: note.category
          }});
          callback(newNotes);
        })
        .catch((error) => {
          console.log(error)
        });
}

export const getNote = (id: number, callback: (note: Note) => void, onError: () => void) => {
    axios
        .get(`http://127.0.0.1:8080/notes/${id}`)
        .then((response) => {
          const note = response.data;
          const newNote = {
            id: Number(note.id),
            dateCreated: note.dateCreated,
            title: note.title,
            description: note.description,
            category: note.category
          };
          callback(newNote);
        })
        .catch(() => {
          onError();
        });
}

export const editNote = (id: number, note: Note, callback: () => void) => {
  axios
    .put(`http://127.0.0.1:8080/notes/${id}`, JSON.stringify({
      id: String(note.id),
      title: note.title,
      description: note.description,
      dateCreated: note.dateCreated,
      category: note.category
    }))
    .then(() => {
      callback();
    })
    .catch(() => {
      //TODO
    });
}

export const addNote = (note: Note, callback: () => void) => {
  axios
    .post(`http://127.0.0.1:8080/notes/`, JSON.stringify({
      id: String(note.id),
      title: note.title,
      description: note.description,
      dateCreated: note.dateCreated,
      category: note.category
    }))
    .then(() => {
      callback();
    })
    .catch(() => {
      //TODO
    });
}

export const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    setNotes(state, action: PayloadAction<Notes>) {
      state.notesState.notes = action.payload.notes;
    },
    setFilteredNotes(state, action: PayloadAction<Filters>) {
      const notes = state.notesState.notes;
      let newNotes: Array<Note> = [...notes];
      const category = action.payload.category;
      const sortBy = action.payload.sortBy;
      if (category != null && category.length > 0) {
        newNotes = [...notes.filter((note) => note.category === category)];
      }
      if (sortBy === "old") {
        newNotes = [...newNotes.sort(compare)];
      }
      state.filteredNotes.notes = newNotes;
    },
    setFilterApplied(state, action: PayloadAction<boolean>) {
      state.filtersAppliedState = action.payload;
    },
    setCurrentNote(state, action: PayloadAction<Note | undefined>) {
      state.currentNote = action.payload;
      //state.currentNote = notesData[action.payload];
    },
    // editNote(state, action: PayloadAction<EditAction>) {
    //   const note = action.payload.note;
    //   axios
    //     .put(`http://127.0.0.1:8080/notes/${note.id}`, note)
    //     .then(() => {
    //       action.payload.callback();
    //     })
    //     .catch(() => {
    //       //TODO
    //     });
    //   // state.notesState.notes[note.id - 1] = note;
    // },
    // addNote(state, action: PayloadAction<EditAction>) {
    //   const note = action.payload.note;
    //   axios
    //     .post(`http://127.0.0.1:8080/notes/${note.id}`)
    //     .then(() => {
    //       action.payload.callback();
    //     })
    //     .catch(() => {
    //       //TODO
    //     });
    //   //state.notesState.notes.push(action.payload);
    // },
  },
});

export const {
  setNotes,
  setFilterApplied,
  setFilteredNotes,
  setCurrentNote,
  //editNote,
  //addNote,
} = notesSlice.actions;

export default notesSlice.reducer;
