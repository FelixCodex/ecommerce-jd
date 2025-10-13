export interface Product {
  id: string;
  title: string;
  description: string;
  personal: number;
  professional: number;
  image: string;
  gallery?: string[];
  driveId: string;
  weight: number;
}

export interface UserInterface {
  id: string;
  username: string;
  email: string;
  created_at: string;
}

export interface PaymentInterface {
  id: string;
  userId: string;
  state: string;
  price: string;
  created_at: string;
  bookingDate: string;
  orderId: string;
}

export interface ChatMessage {
  id: string;
  userId: string;
  isMessageFromUser: string;
  message: string;
  created_at: string;
}

export interface ChatCard {
  id: string;
  userId: string;
  seen: boolean;
}

export interface Beneficiary {
  id: string;
  name: string;
  ratingBeforeMax: number;
  ratingAfterMax: number;
  max: number;
  paid: number;
  accumulation: number;
  created_at: string;
}

export interface NewBeneficiary {
  id: string;
  name: string;
  ratingBeforeMax: number;
  ratingAfterMax: number;
  max: number;
}

export interface PurchasesInterface {
  id: string;
  userId: string;
  productId: string;
  purchased_at: string;
}

export interface ProductInfo {
  id: string;
  title: string;
  description: string;
  personal: number;
  professional: number;
  driveId: string;
  weight: number;
}
