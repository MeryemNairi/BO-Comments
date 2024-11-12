import * as React from 'react';
import { IFormProps } from './IFormProps';
import Navbar from '../../Header/navbar';
import Footer from './NewFooter/Footer';
import FirstBanner from './First Banner/FB';
import { Comments } from './Comments';
import { Events } from './Events';
import { UpcomingEvents } from './UpcomingEvents';
import { BoiteIdees } from './BoiteIdees'; // Importer le nouveau composant
import { EventsHomePage } from './BestOff/UpcomingEvents';
import { EventsHome } from './ImgsNews/UpcomingEvents';
import {BannerImg} from './BannerImg/BannerImg';

import styles from './Forme.module.scss';

export const Forme: React.FC<IFormProps> = ({ context }) => {
  const [selectedSection, setSelectedSection] = React.useState<'comments' | 'events' | 'upevents' | 'boiteidees' | 'EventsHomePage' |'EventsHome' |'BannerImg' | 'default'>('default'); // Ajout de 'default'

  return (
    <>
      <div style={{ width: '100%', maxWidth: '900px', margin: '0 auto', padding: '0 20px' }}>
        <Navbar />
        <FirstBanner context={context} />

        {/* Conteneur pour les boutons de sélection */}
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
          <button onClick={() => setSelectedSection('EventsHomePage')} className={styles.sectionButton}>
            Best Off
          </button>
          <button onClick={() => setSelectedSection('EventsHome')} className={styles.sectionButton}>
          EventsHome
          </button>
          <button onClick={() => setSelectedSection('BannerImg')} className={styles.sectionButton}>
          BannerImg
          </button>

        </div>

        {/* Affichage de la section sélectionnée */}
        <div style={{ width: '100%', maxWidth: '900px', margin: '0 auto' }}>
          {selectedSection === 'default' ? (
            <div className={styles.svgContainer}>
              <svg width="472" height="470" viewBox="0 0 472 470" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M434.358 65.7765C431.715 55.4365 418.876 47 405.802 47H66.198C53.1 47 40.2616 55.4365 37.642 65.7765L32.8984 94H439.078L434.358 65.7765ZM458.123 117.5H13.8532C11.947 117.501 10.0621 117.899 8.31915 118.668C6.57624 119.436 5.01378 120.559 3.73185 121.964C2.44993 123.369 1.4768 125.025 0.874812 126.826C0.272821 128.627 0.0552382 130.533 0.236 132.423L22.0188 406.644C22.4527 411.119 24.5445 415.274 27.8864 418.297C31.2283 421.321 35.581 422.997 40.0964 423H431.88C436.395 422.997 440.748 421.321 444.09 418.297C447.432 415.274 449.524 411.119 449.958 406.644L471.74 132.423C471.921 130.533 471.704 128.627 471.102 126.826C470.5 125.025 469.526 123.369 468.245 121.964C466.963 120.559 465.4 119.436 463.657 118.668C461.914 117.899 460.029 117.501 458.123 117.5ZM293.537 196.812C299.408 196.812 305.038 199.135 309.19 203.269C313.341 207.403 315.674 213.009 315.674 218.855C315.674 224.702 313.341 230.308 309.19 234.442C305.038 238.576 299.408 240.899 293.537 240.899C287.666 240.899 282.035 238.576 277.884 234.442C273.732 230.308 271.4 224.702 271.4 218.855C271.4 213.009 273.732 207.403 277.884 203.269C282.035 199.135 287.666 196.813 293.537 196.812ZM129.8 329L188.47 194.721L255.187 302.257L312.393 273.963L342.2 329H129.8Z" fill="#2B466C" />
              </svg>
            </div>
          ) : (
            <>
              {selectedSection === 'events' && <Events />}
              {selectedSection === 'comments' && <Comments />}
              {selectedSection === 'upevents' && <UpcomingEvents />}
              {selectedSection === 'boiteidees' && <BoiteIdees />}
              {selectedSection === 'EventsHomePage' && <EventsHomePage />}
              {selectedSection === 'EventsHome' && <EventsHome />}
              {selectedSection === 'BannerImg' && <BannerImg />}



            </>
          )}
        </div>

        <Footer />
      </div>
    </>
  );
};
