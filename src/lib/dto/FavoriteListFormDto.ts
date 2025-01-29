export interface FavoriteListFormProps {
  initialName?: string;
  initialDescription?: string;
  onUpdate?: (name: string, description: string) => void;
}
