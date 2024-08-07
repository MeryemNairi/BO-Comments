import * as React from 'react';
import { IFormProps, ICommentData } from './IFormProps';
import { getComments, deleteComment } from './FormeService'; // Assurez-vous que le chemin d'importation est correct
import styles from './Forme.module.scss';
import Navbar from '../../Header/navbar';
import Footer from './NewFooter/Footer';
import FirstBanner from './First Banner/FB';

export const Forme: React.FC<IFormProps> = ({ context }) => {

  const [comments, setComments] = React.useState<ICommentData[]>([]);

  React.useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const commentData = await getComments();
      setComments(commentData);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const handleDeleteComment = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this comment?')) {
      try {
        await deleteComment(id);
        alert('Comment deleted successfully!');
        fetchComments();
      } catch (error) {
        console.error('Error deleting comment:', error);
        alert('An error occurred while deleting the comment. Please try again.');
      }
    }
  };

  return (
    <>
      <div style={{ width: '100%', maxWidth: '900px', margin: '0 auto', padding: '0 20px' }}>
        <Navbar />
        <FirstBanner context={context} />
        <div style={{ width: '100%', maxWidth: '900px', margin: '0 auto' }}>
  <h2 className={styles.recordsTitle}>Comments</h2>
  <table className={styles.recordsTable}>
    <thead>
      <tr>
        <th>Comment</th>
        <th>Date</th>
        <th>User</th>
        <th>Event</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {comments.map((comment, index) => (
        <tr key={index} className={styles.recordRow}>
          <td className={styles.recordField}>{comment.comment}</td>
          <td className={styles.recordField}>{comment.date.toLocaleDateString()}</td>
          <td className={styles.recordField}>{comment.User}</td>
          <td className={styles.recordField}>{comment.newsNews}</td>
          <td className={styles.recordActions}>
            <svg
              width="28"
              height="28"
              viewBox="0 0 42 42"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              onClick={() => handleDeleteComment(comment.id)}
              className={styles.deleteIcon}
            >
              <path d="M33.25 7H27.125L25.375 5.25H16.625L14.875 7H8.75V10.5H33.25M10.5 33.25C10.5 34.1783 10.8687 35.0685 11.5251 35.7249C12.1815 36.3813 13.0717 36.75 14 36.75H28C28.9283 36.75 29.8185 36.3813 30.4749 35.7249C31.1313 35.0685 31.5 34.1783 31.5 33.25V12.25H10.5V33.25Z" fill="#FF5454" />
            </svg>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

        <Footer />
      </div>
    </>
  );
};
