import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/common/cart-item';
import { Product } from 'src/app/common/product';
import { Constants } from 'src/app/constants';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-product-detail-view',
  templateUrl: './product-detail-view.component.html',
  styleUrls: ['./product-detail-view.component.css']
})
export class ProductDetailViewComponent implements OnInit{

  product_Id!: number;
  products: Product[] = [];
  master_Detailed_Product!: Product;

  constructor(
    private cartService: CartService,
    private router: ActivatedRoute
  ) { }
  ngOnInit() {

    this.fetchProductDetailsForMaterView()
  }


  fetchProductDetailsForMaterView() {
    this.product_Id = +this.router.snapshot.paramMap.get("id")!;
    console.log(" The product_id fetched from the route params in PDV component", this.product_Id);

    this.products = JSON.parse(localStorage.getItem(Constants.StorageKeys.PRODUCTS)!);
    console.log("The Products fetched form the Local STorage in PDV component: ", this.products);

    //Filtering the products in local storage based on the Product ID selected by user
    const filtered_Product: Product[] =this.products.filter((item) => 
      item.id === this.product_Id
    )
    if(filtered_Product.length === 1){
      this.master_Detailed_Product = filtered_Product[0];
    }
  }

  updateCartStatus() {

    console.log('The ,astered detailed product: ', this.master_Detailed_Product);
    const cartItem = new CartItem(this.master_Detailed_Product);
    console.log('The cart item added to cart is: ', cartItem);

    this.cartService.addToCart(cartItem);

    }


}
