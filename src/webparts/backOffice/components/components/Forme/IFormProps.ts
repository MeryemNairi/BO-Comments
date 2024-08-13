export interface IFormProps {
  context: any; 
}

export interface ICommentData {
  id: number;
  comment: string;
  date: Date;
  User: string;
  newsNews: string;
  status: 'valide' | 'invalide'; // Ajout de l'attribut status avec les valeurs possibles
}
