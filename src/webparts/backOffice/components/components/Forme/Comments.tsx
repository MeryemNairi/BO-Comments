import * as React from 'react';
import { ICommentData } from './IFormProps';
import { getComments, updateCommentStatus } from './FormeService';
import styles from './Forme.module.scss';

export const Comments: React.FC = () => {
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

  const handleStatusChange = async (id: number, newStatus: 'valid' | 'invalid' | '') => {
    if (newStatus) {
      try {
        await updateCommentStatus(id, newStatus);
        alert('Comment status updated successfully!');
        fetchComments();
      } catch (error) {
        console.error('Error updating comment status:', error);
        alert('An error occurred while updating the comment status. Please try again.');
      }
    }
  };

  return (
    <div style={{ width: '100%', maxWidth: '900px', margin: '0 auto' }}>
      <h2 className={styles.recordsTitle}>Comments</h2>
      <table className={styles.recordsTable}>
        <thead>
          <tr>
            <th>Comment</th>
            <th>Date</th>
            <th>User</th>
            <th>Event</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {comments.map((comment, index) => (
            <tr key={index} className={styles.recordRow}>
              <td className={styles.recordField}>{comment.comment}</td>
              <td className={styles.recordField}>{comment.date.toLocaleDateString()}</td>
              <td className={styles.recordField}>{comment.User}</td>
              <td className={styles.recordField}>{comment.newsNews}</td>
              <td className={styles.recordField}>
                <select
                  value={comment.status || ''}
                  onChange={(e) => handleStatusChange(comment.id, e.target.value as 'valid' | 'invalid' | '')}
                  className={styles.statusSelect}
                >
                  <option value="">Select</option>
                  <option value="valid">Valid</option>
                  <option value="invalid">Invalid</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
