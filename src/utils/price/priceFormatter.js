// Importing the necessary module
import Intl from "intl";
// Function to format price
export function formattedPrice(price) {
    console.log(`price: ${price}`);
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'TZS',
      minimumFractionDigits: 0,
    });
    const formattedPrice = formatter.format(price);
    return `${formattedPrice}`;
  }
  