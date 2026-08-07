// App.js
import React, { useState } from 'react';
import './App.css';

const initialRooms = [
  { id: 1, name: 'Conference Hall', capacity: 20, image: 'https://picsum.photos/seed/confA/400/200' },
  { id: 2, name: 'Power Meeting Room B', capacity: 6, image: 'https://picsum.photos/seed/meetB/400/200' },
  { id: 3, name: 'Hanger Bay room', capacity: 8, image: 'https://picsum.photos/seed/boardC/400/200' },
  { id: 4, name: 'Engineer Hub', capacity: 12, image: 'https://picsum.photos/seed/boardA/400/200' },
];

const initialBookings = [
  { id: 1, roomId: 1, date: '2026-07-05', timeSlot: '10:00-11:00', bookedBy: 'Alice' },
  { id: 2, roomId: 2, date: '2026-07-05', timeSlot: '14:00-15:00', bookedBy: 'Bob' },
];

const TIME_SLOTS = [
  '09:00-10:00', '10:00-11:00', '11:00-12:00', '12:00-13:00',
  '13:00-14:00', '14:00-15:00', '15:00-16:00', '16:00-17:00',
];

function App() {
  const [rooms, setRooms] = useState(initialRooms);
  const [bookings, setBookings] = useState(initialBookings);
  const [showModal, setShowModal] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [newBooking, setNewBooking] = useState({
    date: '',
    timeSlot: TIME_SLOTS[0],
    bookedBy: '',
  });

  const handleAddBooking = () => {
    if (!selectedRoom) return;
    const { date, timeSlot, bookedBy } = newBooking;
    if (!date || !bookedBy.trim()) {
      alert('Please fill in all fields.');
      return;
    }

    const today = new Date().toISOString().split('T')[0];
    if (date < today) {
      alert('You cannot book a room in the past.');
      return;
    }

    const conflict = bookings.some(
      (b) =>
        b.roomId === selectedRoom.id &&
        b.date === date &&
        b.timeSlot === timeSlot
    );
    if (conflict) {
      alert('This room is already booked at that time.');
      return;
    }
    const newId = bookings.length ? Math.max(...bookings.map(b => b.id)) + 1 : 1;
    const booking = {
      id: newId,
      roomId: selectedRoom.id,
      date,
      timeSlot,
      bookedBy: bookedBy.trim(),
    };
    setBookings([...bookings, booking]);
    resetModal();
  };

  const handleCancelBooking = (id) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      setBookings(bookings.filter(b => b.id !== id));
    }
  };

  const openModal = (room) => {
    setSelectedRoom(room);
    setShowModal(true);
    setNewBooking({
      date: '',
      timeSlot: TIME_SLOTS[0],
      bookedBy: '',
    });
  };

  const resetModal = () => {
    setShowModal(false);
    setSelectedRoom(null);
    setNewBooking({ date: '', timeSlot: TIME_SLOTS[0], bookedBy: '' });
  };

  const getRoomName = (roomId) => {
    const room = rooms.find(r => r.id === roomId);
    return room ? room.name : 'Unknown';
  };

  return (
    <div className="app">
      <header>
        <h1>🚀 Space Rooms 🚀 </h1>
      </header>

      <main>
        <section className="rooms-section">
          <h2>Available Rooms</h2>
          <div className="rooms-grid">
            {rooms.map(room => (
              <div key={room.id} className="room-card">
                <img src={room.image} alt={room.name} className="room-image" />
                <h3>{room.name}</h3>
                <p>Capacity: {room.capacity} people</p>
                <button onClick={() => openModal(room)}>Book this room</button>
              </div>
            ))}
          </div>
        </section>

        <section className="bookings-section">
          <h2>Current Bookings</h2>
          {bookings.length === 0 ? (
            <p>No bookings yet.</p>
          ) : (
            <table className="bookings-table">
              <thead>
                <tr>
                  <th>Room</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Booked By</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map(booking => (
                  <tr key={booking.id}>
                    <td>{getRoomName(booking.roomId)}</td>
                    <td>{booking.date}</td>
                    <td>{booking.timeSlot}</td>
                    <td>{booking.bookedBy}</td>
                    <td>
                      <button className="cancel-btn" onClick={() => handleCancelBooking(booking.id)}>
                        Cancel
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>
      </main>

      {showModal && selectedRoom && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Book {selectedRoom.name}</h2>
            <p>Capacity: {selectedRoom.capacity}</p>
            <form onSubmit={(e) => { e.preventDefault(); handleAddBooking(); }}>
              <div className="form-group">
                <label>Date:</label>
                <input
                  type="date"
                  value={newBooking.date}
                  onChange={(e) => setNewBooking({ ...newBooking, date: e.target.value })}
                  min={new Date().toISOString().split('T')[0]}  // 👈 DISABLE PAST DATES
                  required
                />
              </div>
              <div className="form-group">
                <label>Time Slot:</label>
                <select
                  value={newBooking.timeSlot}
                  onChange={(e) => setNewBooking({ ...newBooking, timeSlot: e.target.value })}
                >
                  {TIME_SLOTS.map(slot => (
                    <option key={slot} value={slot}>{slot}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Your Name:</label>
                <input
                  type="text"
                  value={newBooking.bookedBy}
                  onChange={(e) => setNewBooking({ ...newBooking, bookedBy: e.target.value })}
                  placeholder="Enter your name"
                  required
                />
              </div>
              <div className="modal-actions">
                <button type="button" onClick={resetModal}>Cancel</button>
                <button type="submit">Confirm Booking</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;