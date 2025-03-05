import * as React from 'react';
import { IEventData, getEvents, postEvent, deleteEvent, updateEvent } from './EventsService';
import styles from './Events.module.scss';

export const Events: React.FC = () => {
  // State to manage events data and the new event form input
  const [events, setEvents] = React.useState<IEventData[]>([]);
 
const [newEvent, setNewEvent] = React.useState<IEventData>({
  Id: undefined,  // Ajout de l'Id
  News: '',
  Description: '',
  Date: new Date(),
});

  const [, ] = React.useState<IEventData | null>(null);

  // Fetch events when the component mounts
  React.useEffect(() => {
    fetchEvents();
  }, []);

  // Fetch events from the server
  const fetchEvents = async () => {
    try {
      const eventData = await getEvents();
      setEvents(eventData);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  // Handle input changes for the new event form
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewEvent((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle date change for the new event form
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewEvent((prevState) => ({
      ...prevState,
      Date: new Date(e.target.value),
    }));
  };

  // Handle form submission for adding a new event
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await postEvent(newEvent);
      setNewEvent({ News: '', Description: '', Date: new Date() });
      fetchEvents(); // Refresh the event list
    } catch (error) {
      console.error('Error posting event:', error);
    }
  };

  // Handle event deletion
  const handleDelete = async (eventId: number) => {
    // Afficher une boîte de dialogue de confirmation
    const isConfirmed = window.confirm("Êtes-vous sûr de vouloir supprimer cet événement ?");
    
    if (isConfirmed) {
        try {
            await deleteEvent(eventId);
            fetchEvents(); // Refresh the event list after deletion
        } catch (error) {
            console.error('Error deleting event:', error);
        }
    }
  };

  // Handle event update
  const [editingEvent, setEditingEvent] = React.useState<IEventData | null>(null);

  const handleUpdate = async (event: IEventData) => {
      if (editingEvent && editingEvent.Id === event.Id) {
          try {
              await updateEvent(editingEvent);
              setEditingEvent(null);
              fetchEvents();
          } catch (error) {
              console.error('Error updating event:', error);
          }
      } else {
          setEditingEvent(event);
      }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div>
        <div style={{ marginBottom: '50px' }}></div>
        <form className={styles.formContainer1} onSubmit={handleSubmit}>
          <div className={styles.inputField}>
            <input
              type="text"
              name="News"
              value={newEvent.News}
              onChange={handleInputChange}
              placeholder="News"
              required
              className={styles.input}
            />
          </div>
          <div className={styles.spacing}></div>
          <div className={styles.inputField}>
            <textarea
              name="Description"
              value={newEvent.Description}
              onChange={handleInputChange}
              placeholder="Description"
              required
              className={styles.input}
            />
          </div>
          <div className={styles.spacing}></div>
          <div className={styles.inputField}>
            <input
              type="date"
              name="Date"
              value={newEvent.Date.toISOString().split('T')[0]}
              onChange={handleDateChange}
              required
              className={styles.input}
            />
          </div>
          <div className={styles.spacing}></div>
          <div>
            <button type="submit" className={styles.button}>Post Event</button>
          </div>
        </form>

        <div className={styles.spacing}></div>

        <div>
          <h2 className={styles.recordsTitle}>Events</h2>
          <table className={styles.recordsTable}>
            <thead>
              <tr>
                <th>News</th>
                <th>Description</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <tr key={event.Id} className={styles.recordRow}>
                  <td className={styles.recordField}>{event.News}</td>
                  <td className={styles.recordField}>{event.Description}</td>
                  <td className={styles.recordField}>{event.Date.toDateString()}</td>
                  <td className={styles.recordField}>
                    <span className={styles.iconSpace}></span>
                    <svg
                      width="28"
                      height="28"
                      viewBox="0 0 34 34"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      onClick={() => handleUpdate(event)}
                    >
                      <path d="M10.2609 25.4956H4.25V19.4847L20.4496 3.28514C20.7152 3.01956 21.0755 2.87036 21.4512 2.87036C21.8268 2.87036 22.1871 3.01956 22.4527 3.28514L26.4605 7.29147C26.5922 7.42305 26.6967 7.57929 26.768 7.75127C26.8393 7.92325 26.876 8.10759 26.876 8.29377C26.876 8.47994 26.8393 8.66429 26.768 8.83627C26.6967 9.00825 26.5922 9.16449 26.4605 9.29606L10.2609 25.4956ZM4.25 28.329H29.75V31.1623H4.25V28.329Z" fill="#FEC46D" />
                    </svg>
                    <span className={styles.iconSpace}></span>
                    <svg
                      width="28"
                      height="28"
                      viewBox="0 0 42 42"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      onClick={() => handleDelete(event.Id!)}
                    >
                      <path d="M33.25 7H27.125L25.375 5.25H16.625L14.875 7H8.75V10.5H33.25M10.5 33.25C10.5 34.1783 10.8687 35.0685 11.5251 35.7249C12.1815 36.3813 13.0717 36.75 14 36.75H28C28.9283 36.75 29.8185 36.3813 30.4749 35.7249C31.1313 35.0685 31.5 34.1783 31.5 33.25V12.25H10.5V33.25Z" fill="#FF5454" />
                    </svg>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

        </div>
      </div>
    </div>
  );
};
