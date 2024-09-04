import { sp } from '@pnp/sp'; // Assurez-vous que @pnp/sp est installé et configuré

// Définir la structure des données de ContactV3
export interface IContactData {
    Id?: number;
    Comment: string;
    Date: Date;
    User: string;
}

// Fonction pour obtenir les contacts
export const getContacts = async (): Promise<IContactData[]> => {
    try {
        const items = await sp.web.lists.getByTitle('ContactV3').items.getAll();
        return items.map(item => ({
            Id: item.Id,
            Comment: item.Comment,
            Date: new Date(item.Date),
            User: item.User,
        }));
    } catch (error) {
        console.error('Error fetching contacts:', error);
        throw error;
    }
};

// Fonction pour ajouter un nouveau contact
export const postContact = async (contact: IContactData): Promise<void> => {
    try {
        await sp.web.lists.getByTitle('ContactV3').items.add({
            Comment: contact.Comment,
            Date: contact.Date.toISOString(),
            User: contact.User,
        });
    } catch (error) {
        console.error('Error posting contact:', error);
        throw error;
    }
};

// Fonction pour supprimer un contact
export const deleteContact = async (contactId: number): Promise<void> => {
    try {
        await sp.web.lists.getByTitle('ContactV3').items.getById(contactId).delete();
    } catch (error) {
        console.error('Error deleting contact:', error);
        throw error;
    }
};

// Fonction pour mettre à jour un contact
export const updateContact = async (contact: IContactData): Promise<void> => {
    try {
        if (contact.Id) {
            await sp.web.lists.getByTitle('ContactV3').items.getById(contact.Id).update({
                Comment: contact.Comment,
                Date: contact.Date.toISOString(),
                User: contact.User,
            });
        } else {
            throw new Error('Contact ID is required for update.');
        }
    } catch (error) {
        console.error('Error updating contact:', error);
        throw error;
    }
};
