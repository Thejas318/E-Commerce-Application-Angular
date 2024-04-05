import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CartItem } from 'src/app/common/cart-item';
import { Product } from 'src/app/common/product';
import { Constants } from 'src/app/constants';
import { CartService } from 'src/app/service/cart.service';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  // templateUrl: './product-list-table.component.html',
  // templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  currentCategory_Id: number = 1;
  previousCategoryId: number = 1;
  category_Name: string = "";
  searchMode: boolean = false;
  productName: string = "";

  //New properties for pagination
  thePageNumber: number = 1;
  thePageSize: number = 5;
  theTotalElements: number = 0;

  previousKeyWord: string = "";


  
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private pageNavigator: Router,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listProducts();


    });
  }

  listProducts() {

    this.searchMode = this.route.snapshot.paramMap.has('keyword');

    if (this.searchMode) {
      this.handleSearchProducts();

    }
    else {
      this.handleListProducts();

    }
  }

  handleSearchProducts() {
    this.productName = this.route.snapshot.paramMap.get('keyword')!;

    //If the previous keyword is not same as the current keyword, set the pagenumber as 1 so that the first page of products are displayed.
    if( this.previousKeyWord != this.productName){
      this.thePageNumber = 1;
    }

    this.previousKeyWord = this.productName;
    console.log(`The current keyword is ${this.productName}, and the pagenumber is ${this.thePageNumber}`);

    //search for products using keyword
    this.productService.getProductsByNameAndPaginate(this.productName, 
                                                    this.thePageNumber - 1,
                                                    this.thePageSize)
                                                    .subscribe(this.processResult())
    };

  handleListProducts() {

    // Check if the category_id is present in the URL
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');
    const hasCategoryName: boolean = this.route.snapshot.paramMap.has('categoryName');

    this.currentCategory_Id = hasCategoryId ? +this.route.snapshot.paramMap.get('id')! : 1;
    this.category_Name = hasCategoryName ? this.route.snapshot.paramMap.get('categoryName')! : "Books";

    //If the previous category ID is not same as the current category ID, set the pagenumber as 1 so that the first page of products are displayed.
    if(this.previousCategoryId != this.currentCategory_Id){
      this.thePageNumber = 1;
    }

    this.previousCategoryId = this.currentCategory_Id;
    console.log(`currentCategoryId=${this.currentCategory_Id}, thePageNumber=${this.thePageNumber}`);
    //search for products using category ID

    this.productService.getProductsListPaginate((this.thePageNumber - 1), 
                                                this.thePageSize, 
                                                this.currentCategory_Id)
                                                .subscribe(this.processResult())
    
  };

  processResult(){
    return (data: any) => {
    this.products = data._embedded.products;
        this.thePageNumber = (data.page.number + 1);
        this.thePageSize = data.page.size;
        this.theTotalElements = data.page.totalElements;

        localStorage.setItem(Constants.StorageKeys.PRODUCTS, JSON.stringify(this.products));
        console.log("Products received from backend", data._embedded.products)
  };
}

  updatePageSize(pageSize: string) {
      this.thePageSize = +pageSize;
      console.log("The Page size selected by user: ", this.thePageSize);
      this.thePageNumber = 1;
      this.listProducts();
    }

  detailedViewPageNavigator(product_Id: number){
    console.log("ID of the Product selected by the user for detailed view: ", product_Id);
    this.pageNavigator.navigate([`products/${product_Id}`]);
  }

  updateCartStatus(theProduct: Product) {

    console.log(`Product selected by the user: ${theProduct.name}, $ ${theProduct.unitPrice}`);
    const theCartItem = new CartItem(theProduct);
    console.log("cart item prepared for add to cart method", theCartItem);
    this.cartService.addToCart(theCartItem);

    }

}

