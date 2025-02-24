import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export interface Contact {
  id: number;
  name: string;
  email: string;
  phone?: string;
  createdAt: string;
}

interface ContactsState {
  contacts: Contact[];
  loading: boolean;
  error: string | null;
}

const initialState: ContactsState = {
  contacts: [],
  loading: false,
  error: null,
};

const API_URL = 'http://localhost:3000/contacts';

export const addContact = createAsyncThunk(
  'contacts/addContact',
  async (contact: Omit<Contact, 'id' | 'createdAt'>) => {
    const response = await axios.post(API_URL, contact);
    return response.data;
  }
);

export const fetchContacts = createAsyncThunk(
  'contacts/fetchContacts',
  async () => {
    const response = await axios.get(API_URL);
    return response.data;
  }
);

export const updateContact = createAsyncThunk(
  'contacts/updateContact',
  async ({ id, contact }: { id: number; contact: Partial<Contact> }) => {
    const response = await axios.put(`${API_URL}/${id}`, contact);
    return response.data;
  }
);

export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (id: number) => {
    await axios.delete(`${API_URL}/${id}`);
    return id;
  }
);

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.loading = false;
        state.contacts = action.payload;
        state.error = null;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch contacts';
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.contacts.push(action.payload);
      })
      .addCase(updateContact.fulfilled, (state, action) => {
        const index = state.contacts.findIndex((c) => c.id === action.payload.id);
        if (index !== -1) {
          state.contacts[index] = action.payload;
        }
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.contacts = state.contacts.filter((c) => c.id !== action.payload);
      });
  },
});

export default contactsSlice.reducer; 