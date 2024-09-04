import * as React from 'react';
import { IContactData, getContacts } from './ContactV3Service'; // Assurez-vous que le chemin d'importation est correct
import styles from './Events.module.scss';

// Composant pour gérer les contacts
export const BoiteIdees: React.FC = () => {
  // State pour gérer les données des contacts et les entrées du formulaire
  const [contacts, setContacts] = React.useState<IContactData[]>([]);
  

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
                <div className={styles.recordField}>{contact.comment}</div>
                <div className={styles.recordField}>{contact.date.toDateString()}</div>
                <div className={styles.recordField}>{contact.User}</div>
                <span className={styles.iconSpace}></span>

              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoiteIdees;
