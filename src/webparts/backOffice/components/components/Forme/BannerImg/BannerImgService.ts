import { sp } from '@pnp/sp'; // Assurez-vous que @pnp/sp est installé et configuré

// Définir la structure des données des événements à venir
export interface IUpEventData {
    Id?: number;
    ImgUrl: string;
}

// Fonction pour obtenir les événements à venir
export const getUpcomingEvents = async (): Promise<IUpEventData[]> => {
    try {
        const items = await sp.web.lists.getByTitle('MediaTek').items.getAll();
        return items.map(item => ({
            Id: item.Id,
            ImgUrl: item.ImgUrl,
        }));
    } catch (error) {
        console.error('Error fetching upcoming events:', error);
        throw error;
    }
};

// Fonction pour ajouter un nouvel événement
export const postUpcomingEvent = async (event: IUpEventData): Promise<void> => {
    try {
        await sp.web.lists.getByTitle('MediaTek').items.add({
            ImgUrl: event.ImgUrl,
        });
    } catch (error) {
        console.error('Error posting upcoming event:', error);
        throw error;
    }
};

// Fonction pour supprimer un événement
export const deleteUpcomingEvent = async (eventId: number): Promise<void> => {
    try {
        await sp.web.lists.getByTitle('MediaTek2').items.getById(eventId).delete();
    } catch (error) {
        console.error('Error deleting upcoming event:', error);
        throw error;
    }
};

// Fonction pour mettre à jour un événement
export const updateUpcomingEvent = async (event: IUpEventData): Promise<void> => {
    try {
        if (event.Id) {
            await sp.web.lists.getByTitle('MediaTek').items.getById(event.Id).update({
                ImgUrl: event.ImgUrl,
            });
        } else {
            throw new Error('Event ID is required for update.');
        }
    } catch (error) {
        console.error('Error updating upcoming event:', error);
        throw error;
    }
};

// Fonction pour télécharger une image et obtenir l'URL
export const uploadImage = async (file: File): Promise<string> => {
    try {
        // Définir le chemin de stockage dans SharePoint
        const fileName = file.name;
        const filePath = `/sites/Cnet/Assets/${fileName}`;
        
        // Téléverser le fichier
        await sp.web.getFolderByServerRelativeUrl('/sites/Cnet/Assets').files.add(fileName, file, true);

        // Obtenir l'URL du fichier téléversé
        return filePath;
    } catch (error) {
        console.error('Error uploading image:', error);
        throw error;
    }
};

export const storeImageLinkInMediaTek2 = async (imgUrl: string): Promise<void> => {
    try {
        await sp.web.lists.getByTitle('MediaTek2').items.add({
            ImgUrl: imgUrl,
        });
    } catch (error) {
        console.error('Error storing image link in MediaTek2:', error);
        throw error;
    }
};
