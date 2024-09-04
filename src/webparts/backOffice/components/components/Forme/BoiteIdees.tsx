import * as React from 'react';
import { IContactData, getContacts, deleteContact, updateContact } from './ContactV3Service'; // Assurez-vous que le chemin d'importation est correct
import styles from './Events.module.scss';

// Composant pour gérer les contacts
export const BoiteIdees: React.FC = () => {
  // State pour gérer les données des contacts et les entrées du formulaire
  const [contacts, setContacts] = React.useState<IContactData[]>([]);
  
  const [selectedContact, setSelectedContact] = React.useState<IContactData | null>(null);

  // Récupérer les contacts lorsque le composant est monté
  React.useEffect(() => {
    fetchContacts();
  }, []);

  // Récupérer les contacts depuis le serveur
  const fetchContacts = async () => {
    try {
      const contactData = await getContacts();
      setContacts(contactData);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
  };


  // Gérer la suppression d'un contact
  const handleDelete = async (contactId: number) => {
    try {
      await deleteContact(contactId);
      fetchContacts(); // Rafraîchir la liste des contacts après suppression
    } catch (error) {
      console.error('Error deleting contact:', error);
    }
  };

  // Gérer la mise à jour d'un contact
  const handleUpdate = async (contact: IContactData) => {
    try {
      if (selectedContact) {
        await updateContact(selectedContact);
        setSelectedContact(null); // Réinitialiser le contact sélectionné après la mise à jour
        fetchContacts(); // Rafraîchir la liste des contacts après mise à jour
      }
    } catch (error) {
      console.error('Error updating contact:', error);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div>
        <div style={{ marginBottom: '50px' }}></div>
        <div className={styles.spacing}></div>

        <div>
          <h2 className={styles.recordsTitle}>Contacts</h2>
          <div className={styles.recordsContainer}>
            {contacts.map((contact) => (
              <div key={contact.Id} className={styles.record}>
                <div className={styles.recordField}>{contact.Comment}</div>
                <div className={styles.recordField}>{contact.Date.toDateString()}</div>
                <div className={styles.recordField}>{contact.User}</div>
                <span className={styles.iconSpace}></span>
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 34 34"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  onClick={() => handleUpdate(contact)}
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
                  onClick={() => handleDelete(contact.Id!)}
                >
                  <path d="M33.25 7H27.125L25.375 5.25H16.625L14.875 7H8.75V10.5H33.25M10.5 33.25C10.5 34.1783 10.8687 35.0685 11.5251 35.7249C12.1815 36.3813 13.0717 36.75 14 36.75H28C28.9283 36.75 29.8185 36.3813 30.4749 35.7249C31.1313 35.0685 31.5 34.1783 31.5 33.25V12.25H10.5V33.25Z" fill="#FF5454" />
                </svg>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoiteIdees;
