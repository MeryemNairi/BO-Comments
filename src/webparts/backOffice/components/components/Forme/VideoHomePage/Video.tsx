import * as React from 'react';
import styles from './Video.module.scss';
import { WebPartContext } from '@microsoft/sp-webpart-base';

interface IVideoProps {
    context: WebPartContext;
}

const Video: React.FC<IVideoProps> = (props: IVideoProps) => {
    const [videos, setVideos] = React.useState<{ url: string; title: string }[]>([]);
    const [newVideoFile, setNewVideoFile] = React.useState<File | null>(null);
    const [newVideoTitle, setNewVideoTitle] = React.useState<string>(''); // State for video title

    React.useEffect(() => {
        fetchVideosFromSharePoint();
    }, []);

    const fetchVideosFromSharePoint = async () => {
        try {
            const response = await fetch(
                `${props.context.pageContext.web.absoluteUrl}/_api/web/GetFolderByServerRelativeUrl('/sites/Cnet/Assets/HomePage_Vd')/Files`,
                {
                    headers: {
                        Accept: 'application/json;odata=nometadata',
                    },
                }
            );

            const data = await response.json();
            const videoData = data.value.map((item: any) => ({
                url: item.ServerRelativeUrl,
                title: item.Name.split('.')[0], // Removing the file extension for display
            }));
            setVideos(videoData);
        } catch (error) {
            console.error('Erreur lors de la récupération des vidéos :', error);
        }
    };

    const handleVideoUpload = async () => {
        if (!newVideoFile || !newVideoTitle.trim()) {
            alert('Veuillez sélectionner un fichier et ajouter un titre pour la vidéo.');
            return;
        }

        const encodedTitle = encodeURIComponent(newVideoTitle.trim());
        const uploadUrl = `${props.context.pageContext.web.absoluteUrl}/_api/web/GetFolderByServerRelativeUrl('/sites/Cnet/Assets/HomePage_Vd')/Files/add(url='${encodedTitle}.mp4', overwrite=true)`;

        try {
            const digestResponse = await fetch(`${props.context.pageContext.web.absoluteUrl}/_api/contextinfo`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json;odata=nometadata',
                },
            });
            const digestData = await digestResponse.json();
            const requestDigest = digestData.FormDigestValue;

            console.log('Starting upload to:', uploadUrl);

            const response = await fetch(uploadUrl, {
                method: 'POST',
                body: newVideoFile,
                headers: {
                    Accept: 'application/json;odata=nometadata',
                    'Content-Type': 'application/octet-stream',
                    'X-RequestDigest': requestDigest,
                },
            });

            if (response.ok) {
                alert('La vidéo a été téléchargée avec succès!');
                setNewVideoFile(null);
                setNewVideoTitle(''); // Reset title after successful upload
                fetchVideosFromSharePoint(); // Refresh the video list
            } else {
                alert('Erreur lors du téléchargement de la vidéo.');
                console.error('Response error:', response.status, response.statusText);
            }
        } catch (error) {
            console.error('Erreur lors du téléchargement de la vidéo :', error);
        }
    };

    const handleVideoDelete = async (videoTitle: string) => {
        try {
            const deleteUrl = `${props.context.pageContext.web.absoluteUrl}/_api/web/GetFileByServerRelativeUrl('/sites/Cnet/Assets/HomePage_Vd/${videoTitle}.mp4')`;
            const response = await fetch(deleteUrl, {
                method: 'DELETE',
                headers: {
                    Accept: 'application/json;odata=nometadata',
                },
            });

            if (response.ok) {
                alert(`La vidéo "${videoTitle}" a été supprimée avec succès.`);
                fetchVideosFromSharePoint();
            } else {
                alert('Erreur lors de la suppression de la vidéo.');
            }
        } catch (error) {
            console.error('Erreur lors de la suppression de la vidéo :', error);
        }
    };

    return (
        <div className={styles.videoManager}>
            <h2>Gestion des Vidéos</h2>

            {/* Upload Section */}
            <div className={styles.uploadSection}>
                <h3>Ajouter une nouvelle vidéo</h3>
                <input
                    type="text"
                    placeholder="Titre de la vidéo"
                    value={newVideoTitle}
                    onChange={(e) => setNewVideoTitle(e.target.value)}
                    className={styles.inputTitle}
                />
                <input
                    type="file"
                    accept="video/*"
                    onChange={(e) => setNewVideoFile(e.target.files ? e.target.files[0] : null)}
                    className={styles.inputFile}
                />
                <button onClick={handleVideoUpload} className={styles.uploadButton}>Télécharger</button>
            </div>

            {/* Display Section */}
            <div className={styles.videoList}>
                <h3>Vidéos enregistrées</h3>
                {videos.map((video, index) => (
                    <div key={index} className={styles.videoItem}>
                        <a href={video.url} target="_blank" rel="noopener noreferrer" className={styles.videoLink}>
                            {video.title}
                        </a>
                        <button onClick={() => handleVideoDelete(video.title)} className={styles.deleteButton}>Supprimer</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Video;
