import * as React from 'react';
import { IFormProps } from './IFormProps';
import Navbar from '../../Header/navbar';
import Footer from './NewFooter/Footer';
import FirstBanner from './First Banner/FB';
import { Comments } from './Comments';
import { Events } from './Events';
import { UpcomingEvents } from './UpcomingEvents';
import { BoiteIdees } from './BoiteIdees'; // Importer le nouveau composant

import styles from './Forme.module.scss';

export const Forme: React.FC<IFormProps> = ({ context }) => {
  const [selectedSection, setSelectedSection] = React.useState<'comments' | 'events' | 'upevents' | 'boiteidees'>('comments');

  return (
    <>
      <div style={{ width: '100%', maxWidth: '900px', margin: '0 auto', padding: '0 20px' }}>
        <Navbar />
        <FirstBanner context={context} />
        <div style={{ width: '100%', maxWidth: '900px', margin: '0 auto' }}>
          <div className={styles.buttonContainer}>
            <button onClick={() => setSelectedSection('events')} className={styles.sectionButton}>
              Events
            </button>
            <button onClick={() => setSelectedSection('comments')} className={styles.sectionButton}>
              Comments
            </button>
            <button onClick={() => setSelectedSection('upevents')} className={styles.sectionButton}>
              UpEvents
            </button>
            <button onClick={() => setSelectedSection('boiteidees')} className={styles.sectionButton}>
              Boîte d'idées
            </button>
          </div>
          {selectedSection === 'events' && <Events />}
          {selectedSection === 'comments' && <Comments />}
          {selectedSection === 'upevents' && <UpcomingEvents />}
          {selectedSection === 'boiteidees' && <BoiteIdees />} {/* Render Boîte d'idées */}
        </div>
        <Footer />
      </div>
    </>
  );
};
