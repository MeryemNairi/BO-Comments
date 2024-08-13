import { sp } from '@pnp/sp';
import { ICommentData } from './IFormProps'; // Assurez-vous que le chemin d'importation est correct

// Comment Service Functions
export const submitComment = async (commentData: ICommentData) => {
  try {
    const list = sp.web.lists.getByTitle('commentV3');
    const itemData = {
      comment: commentData.comment,
      date: commentData.date.toISOString(), // Assurez-vous que la date est au format ISO si nécessaire
      User: commentData.User,
      newsNews: commentData.newsNews,
      status: commentData.status // Ajout du statut
    };
    // Ajoutez le commentaire avec le statut
    await list.items.add(itemData);
  } catch (error) {
    console.error('Error submitting comment:', error);
    throw new Error('An error occurred while submitting the comment. Please try again.');
  }
};

export const getComments = async (): Promise<ICommentData[]> => {
  try {
    const list = sp.web.lists.getByTitle('commentV3');
    const items = await list.items.orderBy('Id', false).select('Id', 'comment', 'date', 'User', 'newsNews', 'status').get();
    return items.map((item: any) => ({
      id: item.Id,
      comment: item.comment,
      date: new Date(item.date), // Assurez-vous que la date est convertie correctement
      User: item.User,
      newsNews: item.newsNews,
      status: item.status // Ajout du statut
    }));
  } catch (error) {
    console.error('Error fetching comments:', error);
    throw new Error('An error occurred while fetching comments. Please try again.');
  }
};

export const updateComment = async (id: number, commentData: ICommentData) => {
  try {
    const list = sp.web.lists.getByTitle('commentV3');
    await list.items.getById(id).update({
      comment: commentData.comment,
      date: commentData.date.toISOString(), // Assurez-vous que la date est au format ISO si nécessaire
      User: commentData.User,
      newsNews: commentData.newsNews,
      status: commentData.status // Ajout du statut
    });
  } catch (error) {
    console.error('Error updating comment:', error);
    throw new Error('An error occurred while updating the comment. Please try again.');
  }
};

export const deleteComment = async (id: number) => {
  try {
    const list = sp.web.lists.getByTitle('commentV3');
    await list.items.getById(id).delete();
  } catch (error) {
    console.error('Error deleting comment:', error);
    throw new Error('An error occurred while deleting the comment. Please try again.');
  }
};

export const updateCommentStatus = async (id: number, status: 'valid' | 'invalid'): Promise<void> => {
  try {
    const list = sp.web.lists.getByTitle('commentV3');
    await list.items.getById(id).update({
      status: status // Update only the status field
    });
  } catch (error) {
    console.error('Error updating comment status:', error);
    throw new Error('An error occurred while updating the comment status. Please try again.');
  }
};
