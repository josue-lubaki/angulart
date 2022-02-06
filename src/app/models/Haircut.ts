import { HAIRCUT } from './constantes/Haircut';

export interface Haircut {
  id: string;
  imageURL: string;
  title: string;
  price: number;
  estimatingTime: string;
  description: string;
}
