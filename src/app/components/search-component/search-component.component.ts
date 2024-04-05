import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-search-component',
  templateUrl: './search-component.component.html',
  styleUrls: ['./search-component.component.css']
})
export class SearchComponentComponent implements OnInit{
 
  product_Name: string = "";
  
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router
    ) {}
  ngOnInit(): void {

    // this.searchByProductName();



    
  }
  navigateToProductListComponent(productName: string) {
    this.router.navigate([`/search/${ productName }`]); 
  }

  // searchByProductName() {

  //   const hasProductName: boolean = this.route.snapshot.paramMap.has('keyword');

  //   this.product_Name = hasProductName ? this.route.snapshot.paramMap.get('keyword')! : "";

  //   this.productService.getProductsByName(this.product_Name).subscribe(
  //     data => 
  //   )
  // }

}
