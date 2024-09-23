import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import axios from "axios";


export interface NotesState {
    notesState: Notes;
    filtersAppliedState: boolean;
    filteredNotes: Notes;
    currentNote: Note | undefined;
}


export interface Note {
    id: number;
    dateCreated: Date;
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


const notesData = [
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
  ];


const initialState: NotesState = {
    notesState: {notes: []},
    filtersAppliedState: false,
    filteredNotes: {notes: []},
    currentNote: undefined
}


function compare( a: Note, b: Note ) {
    if ( a.dateCreated.getTime() < b.dateCreated.getTime() ){
      return -1;
    }
    if ( a.dateCreated.getTime() > b.dateCreated.getTime() ){
      return 1;
    }
    return 0;
  }



export const notesSlice = createSlice({
  name: "notes", 
  initialState,
  reducers: {
    setNotes(state, action: PayloadAction<void>) {
        state.notesState.notes = notesData;
    },
    setFilteredNotes(state, action: PayloadAction<Filters>) {
        const notes = state.notesState.notes;
        let newNotes: Array<Note> = [...notes];
        const category = action.payload.category;
        const sortBy = action.payload.sortBy;
        if (category != null && category.length > 0) {
            newNotes = [...notes.filter(note => note.category === category)];
        }
        if (sortBy === "old") {
            newNotes = [...newNotes.sort(compare)];
        }
        console.log("New notes: ", newNotes);
        state.filteredNotes.notes = newNotes;
    },
    setFilterApplied(state, action: PayloadAction<boolean>) {
        state.filtersAppliedState = action.payload;
    },
    setCurrentNote(state, action: PayloadAction<number>) {
        state.currentNote = notesData[action.payload];
    },
    editNote(state, action: PayloadAction<Note>) {
        const note = action.payload;
        console.log("Edit: ", note);
        state.notesState.notes[note.id - 1] = note;
    } ,
    addNote(state, action: PayloadAction<Note>) {
        console.log("Add: ", action.payload);
        state.notesState.notes.push(action.payload);
    }
  } 
})

export const { setNotes, setFilterApplied, setFilteredNotes, setCurrentNote, editNote, addNote } = notesSlice.actions;


export default notesSlice.reducer 