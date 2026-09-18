export interface OrderItemPayload {
  name: string;
  variant?: string;
  quantity: number;
  price: number;
}

export interface WhatsAppOrderData {
  clientName: string;
  clientPhone: string;
  region: string;
  city: string;
  address: string;
  items: OrderItemPayload[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  comment?: string;
}

export function generateWhatsAppOrderLink(data: WhatsAppOrderData): string {
  let text = `*Nouvelle Commande — FNG Beauty*\n\n`;
  
  text += `*Client :* ${data.clientName}\n`;
  text += `*Téléphone :* ${data.clientPhone}\n\n`;
  
  text += `*Livraison :*\n`;
  text += `Région : ${data.region}\n`;
  text += `Ville : ${data.city}\n`;
  text += `Adresse : ${data.address}\n\n`;

  text += `*Produits :*\n`;
  data.items.forEach((item) => {
    const variantText = item.variant ? ` (${item.variant})` : '';
    text += `- ${item.name}${variantText} x${item.quantity} : ${(item.price * item.quantity).toLocaleString()} FCFA\n`;
  });

  text += `\n*Sous-total :* ${data.subtotal.toLocaleString()} FCFA\n`;
  text += `*Frais de livraison :* ${data.deliveryFee.toLocaleString()} FCFA\n`;
  text += `*TOTAL :* ${data.total.toLocaleString()} FCFA\n`;

  if (data.comment) {
    text += `\n*Commentaire :* ${data.comment}`;
  }

  const encodedMessage = encodeURIComponent(text);
  return `https://wa.me/221756329985?text=${encodedMessage}`;
}
