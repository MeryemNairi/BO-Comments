import { sp } from '@pnp/sp'; // Ensure you have @pnp/sp installed and configured

// Define the structure of your event data
export interface IEventData {
    Id?: number; 
    News: string;
    Description: string;
    Date: Date;
}

// ... existing code ...

export const getEvents = async (): Promise<IEventData[]> => {
    try {
        const items = await sp.web.lists.getByTitle('LatestNewsV2').items.getAll();
        return items.map(item => ({
            Id: item.Id,  // Ajout de l'Id
            News: item.News,
            Description: item.Description,
            Date: new Date(item.Date),
        }));
    } catch (error) {
        console.error('Error fetching events:', error);
        throw error;
    }
};

// ... existing code ...

export const postEvent = async (event: IEventData): Promise<void> => {
    try {
        await sp.web.lists.getByTitle('LatestNewsV2').items.add({
            News: event.News,
            Description: event.Description,
            Date: event.Date.toISOString(),
        });
    } catch (error) {
        console.error('Error posting event:', error);
        throw error;
    }
};



export const deleteEvent = async (eventId: number): Promise<void> => {
    try {
        await sp.web.lists.getByTitle('LatestNewsV2').items.getById(eventId).delete();
    } catch (error) {
        console.error('Erreur lors de la suppression de l\'événement:', error);
        throw error;
    }
};

export const updateEvent = async (event: IEventData): Promise<void> => {
    try {
        if (event.Id) {
            await sp.web.lists.getByTitle('LatestNewsV2').items.getById(event.Id).update({
                News: event.News,
                Description: event.Description,
                Date: event.Date.toISOString(),
            });
        } else {
            throw new Error('L\'ID de l\'événement est requis pour la mise à jour.');
        }
    } catch (error) {
        console.error('Erreur lors de la mise à jour de l\'événement:', error);
        throw error;
    }
};
