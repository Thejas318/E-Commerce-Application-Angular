import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductCategory } from 'src/app/common/product-category';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-product-category-menu',
  templateUrl: './product-category-menu.component.html',
  styleUrls: ['./product-category-menu.component.css']
})
export class ProductCategoryMenuComponent implements OnInit{

  productCategory: ProductCategory[] = [];

  constructor(
    private route: Router,
    private productService: ProductService
    ) {}


  ngOnInit() {

    this.getProductCategoryList();
  }

  getProductCategoryList() {
    this.productService.getProductCategories().subscribe(
      data => {
        this.productCategory = data;
        console.log("product category received from backend", data)
      }
    );

  }
  navigate(category_id:number, categoryName: string){
    this.route.navigate(['/category/' + `${category_id}` + '/' + `${categoryName}`]);
  }

}
