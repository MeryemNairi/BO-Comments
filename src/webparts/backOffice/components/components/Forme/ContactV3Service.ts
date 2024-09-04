import { sp } from '@pnp/sp'; // Assurez-vous que @pnp/sp est installé et configuré

// Définir la structure des données de ContactV3
export interface IContactData {
    Id?: number;
    comment: string;
    date: Date;
    User: string;
}

// Fonction pour obtenir les contacts
export const getContacts = async (): Promise<IContactData[]> => {
    try {
        const items = await sp.web.lists.getByTitle('ContactV3').items.getAll();
        return items.map(item => ({
            Id: item.Id,
            comment: item.comment,
            date: new Date(item.date),
            User: item.User,
        }));
    } catch (error) {
        console.error('Error fetching contacts:', error);
        throw error;
    }
};

