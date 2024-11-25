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
          <h2 className={styles.recordsTitle}>Boîte à idées</h2>
          <table className={styles.recordsTable}>
            <thead>
              <tr>
                <th>Commentaire</th>
                <th>Date</th>
                <th>Utilisateur</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact) => (
                <tr key={contact.Id} className={styles.recordRow}>
                  <td className={styles.recordField}>{contact.comment}</td>
                  <td className={styles.recordField}>{contact.date.toDateString()}</td>
                  <td className={styles.recordField}>{contact.User}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>

  );
};

export default BoiteIdees;
