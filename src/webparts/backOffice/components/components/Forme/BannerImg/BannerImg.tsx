import * as React from 'react';
import { IUpEventData, getUpcomingEvents, postUpcomingEvent, deleteUpcomingEvent, updateUpcomingEvent, uploadImage } from './BannerImgService';
import styles from './BannerImg.module.scss';

// Composant pour gérer les événements à venir
export const BannerImg: React.FC = () => {
  // State pour gérer les données des événements et les entrées du formulaire
  const [events, setEvents] = React.useState<IUpEventData[]>([]);
  const [newEvent, setNewEvent] = React.useState<IUpEventData>({
    ImgUrl: '',
  });
  const [selectedEvent, setSelectedEvent] = React.useState<IUpEventData | null>(null);
  const [imageFile, setImageFile] = React.useState<File | null>(null);

  // Récupérer les événements lorsque le composant est monté
  React.useEffect(() => {
    fetchEvents();
  }, []);

  // Récupérer les événements depuis le serveur
  const fetchEvents = async () => {
    try {
      const eventData = await getUpcomingEvents();
      setEvents(eventData);
    } catch (error) {
      console.error('Error fetching upcoming events:', error);
    }
  };

  // Gérer le téléchargement d'image
  const handleImageUpload = async () => {
    if (imageFile) {
      try {
        const imageUrl = await uploadImage(imageFile);
        setNewEvent((prevState) => ({
          ...prevState,
          ImgUrl: imageUrl,
        }));
        setImageFile(null); // Reset file input
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  };


  // Gérer la soumission du formulaire pour ajouter un nouvel événement
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!newEvent.ImgUrl && imageFile) {
        // Upload image first if not already uploaded
        await handleImageUpload();
      }
      await postUpcomingEvent(newEvent);
      setNewEvent({ ImgUrl: '' });
      fetchEvents(); // Refresh the event list
    } catch (error) {
      console.error('Error posting upcoming event:', error);
    }
  };


  // Gérer la suppression d'un événement
  const handleDelete = async (eventId: number) => {
    try {
      await deleteUpcomingEvent(eventId);
      fetchEvents(); // Rafraîchir la liste des événements après suppression
    } catch (error) {
      console.error('Error deleting upcoming event:', error);
    }
  };

  // Gérer la mise à jour d'un événement
  const handleUpdate = async () => {
    if (selectedEvent) {
      try {
        await updateUpcomingEvent(selectedEvent);
        setSelectedEvent(null); // Reset selected event
        fetchEvents(); // Refresh the events after update
      } catch (error) {
        console.error('Error updating upcoming event:', error);
      }
    }
  };



  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div>
        <div style={{ marginBottom: '50px' }}></div>
        <form className={styles.formContainer1} onSubmit={handleSubmit}>
          <div className={styles.spacing}></div>
          <div className={styles.inputField}>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files ? e.target.files[0] : null)}
              className={styles.input}
            />
            <button type="button" onClick={handleImageUpload} className={styles.button}>
              Upload Image
            </button>
          </div>
          <div className={styles.spacing}></div>
          <div>
            <button type="submit" className={styles.button}>Post Event</button>
          </div>
        </form>

        <div className={styles.spacing}></div>

        <div>
          <h2 className={styles.recordsTitle}>Upcoming Events</h2>
          <table className={styles.recordsTable}>
            <thead>
              <tr>
                <th>Image</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <tr key={event.Id} className={styles.recordRow}>
                  <td className={styles.recordActions}>
                    {event.ImgUrl && (
                      <img
                        src={event.ImgUrl}
                        alt={event.ImgUrl}
                        style={{
                          width: '50px', // Taille de l'image
                          height: '50px', // Taille égale pour garder une forme carrée
                          objectFit: 'cover', // Ajuste l'image pour qu'elle remplisse le carré sans se déformer
                          borderRadius: '5px', // Ajoute des coins arrondis
                          border: '1px solid #ddd', // Ajoute une bordure pour délimiter l'image
                        }}                      />
                    )}
                  </td>
                  <td className={styles.recordActions}>
                    <svg
                      width="28"
                      height="28"
                      viewBox="0 0 34 34"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      onClick={() => handleUpdate()}
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
                      className={styles.deleteIcon}
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
