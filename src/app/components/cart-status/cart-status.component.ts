import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-cart-status',
  templateUrl: './cart-status.component.html',
  styleUrls: ['./cart-status.component.css']
})
export class CartStatusComponent implements OnInit {

  //New properties for cart status
  totalPrice: number = 0.00;
  totalQuantity: number = 0;
  constructor(private cartService: CartService) {

  }

  ngOnInit(): void {

    this.updateCartStatus();
    
  }
  updateCartStatus() {

    this.cartService.totalPrice.subscribe(price =>
      this.totalPrice = price
    )

    this.cartService.totalQuantity.subscribe(quantity =>
      this.totalQuantity = quantity
    )
  }

}
