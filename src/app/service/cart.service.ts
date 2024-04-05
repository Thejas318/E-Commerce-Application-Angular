import { Injectable } from '@angular/core';
import { CartItem } from '../common/cart-item';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: CartItem[] = [];

  totalPrice: Subject<number> = new Subject<number>();

  totalQuantity: Subject<number> = new Subject<number>();

  constructor() { }


  addToCart(theCartItem: CartItem) {
    //check if we already have the item in the cart
    let alreadyexistingInCart: boolean = false;
    let existingCartItem: CartItem = undefined!;

    if (this.cartItems.length > 0) {

      existingCartItem = this.cartItems.find(tempCartItem => tempCartItem.id === theCartItem.id)!;

      //check if we found that given item.
      alreadyexistingInCart = (existingCartItem != undefined);
    }

    if (alreadyexistingInCart) {

      //increment the quantity of the item
      existingCartItem.quantity++;
    }

    else {

      //Just add the item to the array
      this.cartItems.push(theCartItem);
    }

    // compute the total price and total quantity
    this.computeCartTotals();
  }

  computeCartTotals() {

    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;

    for (let tempCartitem of this.cartItems) {

      totalPriceValue = totalPriceValue + (tempCartitem.quantity * tempCartitem.unitPrice);

      totalQuantityValue = totalQuantityValue + tempCartitem.quantity;
    }

    // publish the new values for total price and quantity .... all the subscribers will receive the new value
    this.totalPrice.next(+totalPriceValue.toFixed(2));
    this.totalQuantity.next(totalQuantityValue);

    // log the cart the items for debugging.

    this.logCartData(totalPriceValue, totalQuantityValue);
  }

  logCartData(totalPriceValue: number, totalQuantityValue: number) {

    console.log(`contents of the cart`)
    for (let tempCartItem of this.cartItems) {
      const subTotalPrice = tempCartItem.quantity * tempCartItem.unitPrice;
      console.log(`name: ${tempCartItem.name}, quantity = ${tempCartItem.quantity},` +
        `unitPrice= ${tempCartItem.unitPrice}, subTotalPrice=${subTotalPrice}`);

    }
    console.log(`Total Price value of the cart = ${totalPriceValue.toFixed(2)} and ` +
      `the total quantity value of the cart = ${totalQuantityValue}`);
    console.log("---------------")

  }
}
