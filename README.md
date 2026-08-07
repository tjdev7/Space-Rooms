# Space-Rooms

A simple, front‑end only room booking and meeting date application built with React. It allows users to view available rooms, book them for specific dates and time slots, and cancel existing bookings.

## Features

- **Room listing** – shows all rooms with name, capacity, and a representative image.
- **Book a room** – click “Book this room” to open a modal; choose a date (future only), a time slot, and enter your name.
- **Conflict prevention** – automatically checks if the room is already booked for the chosen date and time.
- **View bookings** – all current bookings are displayed in a table with room, date, time, and booker.
- **Cancel bookings** – remove any booking with a confirmation prompt.
- **Past date blocking** – dates before today are disabled in the date picker and validated on submission.
- **Visual cards** – each room card includes a photo, making the interface more engaging.

## Tech Stack

- React (with Hooks)
- Plain CSS (no external libraries)
- Mock data stored in component state

## Getting Started

1. **Clone or download** this repository.
2. Navigate to the project directory and install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Project Structure

```
src/
├── App.js        – main component (state, logic, UI)
├── App.css       – all styles
└── index.js      – entry point (create‑react‑app default)
```

## Data Model

- **Rooms** – array of objects: `{ id, name, capacity, image }`
- **Bookings** – array of objects: `{ id, roomId, date, timeSlot, bookedBy }`
- **Time slots** – predefined list of strings (e.g. `"10:00-11:00"`)

All data is stored in React state. To persist, replace state with an API call or `localStorage`.

## Extending the Prototype

This is a foundational demo. You can easily add:

- Persistent storage (localStorage or a backend API)
- User authentication (show only user’s bookings)
- Dynamic time slot availability (based on existing bookings)
- Recurring bookings or multi‑day reservations
- A component library (Material‑UI, Ant Design) for a more polished UI
- Notifications or toast messages instead of `alert()`

## License

MIT – free to use and modify.