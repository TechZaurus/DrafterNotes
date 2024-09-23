import { createSlice, PayloadAction } from "@reduxjs/toolkit"


export interface NotesState {
    notesState: Notes;
    filtersAppliedState: boolean;
    filteredNotes: Notes;
    filtersState: Filters;
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


const initialState: NotesState = {
    notesState: {notes: []},
    filtersAppliedState: false,
    filteredNotes: {notes: []},
    filtersState: {category: "", sortBy: ""}
}


export const notesSlice = createSlice({
  name: "notes", 
  initialState,
  reducers: {
    setNotes(state, action: PayloadAction<Notes>) {
        state.notesState.notes = action.payload.notes;
    },
    setFilteredNotes(state, action: PayloadAction<Notes>) {
        state.filteredNotes.notes = action.payload.notes;
    },
    setFilterApplied(state, action: PayloadAction<boolean>) {
        state.filtersAppliedState = action.payload;
    }, 
    setFilters(state, action: PayloadAction<Filters>) {
        state.filtersState = action.payload;
    }
  } 
})

export const { setNotes, setFilterApplied, setFilteredNotes, setFilters } = notesSlice.actions;


export default notesSlice.reducer 