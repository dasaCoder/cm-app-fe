# Contact Management App

A contact management application built with React, Redux Toolkit, and TypeScript. Features CRUD operations, search functionality, and sorting capabilities.

## Features

- 📝 Contact Management
  - View contacts in a responsive grid layout
  - Add new contacts with name, email, and phone
  - Edit existing contact information
  - Delete contacts with confirmation
  - Canadian phone number format validation (XXX-XXX-XXXX)

- 🔍 Search and Sort
  - Search contacts by name or email
  - Sort by name (alphabetically)
  - Sort by creation date
  - Toggle ascending/descending order

- ✨ User Interface
  - Clean, modern design with Tailwind CSS
  - Modal forms for add/edit operations
  - Form validation with Formik
  - Responsive grid layout
  - Loading states and error handling

## Setup Instructions

1. Install dependencies:

```bash
npm install
```


2. Create environment file:

```bash
cp .env.example .env
```

3. Configure the API URL in `.env`:

```bash
REACT_APP_API_URL=http://localhost:3000
```

4. Start the development server:

```bash
npm run start
```

## Project Structure

```
src/
├── components/
│   └── contacts/
│       ├── ContactList.tsx    # Main contact list with search and sort
│       └── ContactForm.tsx    # Form component for add/edit
├── store/
│   ├── store.ts              # Redux store configuration
│   └── contactsSlice.ts      # Contact state management
└── types/
    └── contact.ts            # TypeScript interfaces
```

## Technologies Used

- React 18
- Redux Toolkit
- TypeScript
- Formik
- Tailwind CSS
- Axios

## Environment Variables

Required environment variables:
```
REACT_APP_API_URL=http://localhost:3000
```

## License

This project is licensed under the MIT License.

