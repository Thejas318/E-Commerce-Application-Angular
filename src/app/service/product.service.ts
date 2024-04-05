import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../common/product';
import { map } from 'rxjs/operators'
import { ProductCategory } from '../common/product-category';
@Injectable({
  providedIn: 'root'
})
export class ProductService {



  product_Size = 25;
  constructor(private http: HttpClient) { }

  private appUrl: string = "http://localhost:8081/api";


  //Fetches the Product List based on category_id
  getProductsList(category_Id: number): Observable<Product[]> {

    const productsSearchUrl = `${this.appUrl}/products/search/findByCategoryId?id=${category_Id}`;
    return this.getProducts(productsSearchUrl);
  }

  //Fetches the product list based on product name
  getProductsByName(product_Name: string): Observable<Product[]> {
    const searchByNameUrl = `${this.appUrl}/products/search/findByNameContaining?name=${product_Name}`;

    return this.getProducts(searchByNameUrl);

  }

  //Fetches the product list based on product name, page size and page number
  getProductsByNameAndPaginate(product_Name: string, page_Number: number, page_Size: number): Observable<GetResponseProducts> {
    const searchByNameUrl = `${this.appUrl}/products/search/findByNameContaining?name=${product_Name}` + 
                            `&page=${page_Number}&` + `size=${page_Size}`;

    console.log("Logging the pagination URl", searchByNameUrl);                        

    return this.http.get<GetResponseProducts>(searchByNameUrl);
  }

  

  //Fetches the Product List based on category_id, size and page
  getProductsListPaginate(thePageNumber: number, thePageSize: number, category_Id: number): Observable<GetResponseProducts> {

    const productsSearchUrl = `${this.appUrl}/products/search/findByCategoryId?id=${category_Id}` + 
                                `&page=${thePageNumber}&` + `size=${thePageSize}`;

        console.log("Looging the pagination URl", productsSearchUrl);                        
    return this.http.get<GetResponseProducts>(productsSearchUrl);
  }

  //It will take the URL as input and calls backend service to fetch the products.
  private getProducts(productsSearchUrl: string): Observable<Product[]> {
    return this.http.get<GetResponseProducts>(productsSearchUrl).pipe(
      map(response => response._embedded.products)
    );
  }

  //Fetches all the product categories form backend.
  getProductCategories(): Observable<ProductCategory[]> {
    const productsCategorySearchUrl = `${this.appUrl}/product-category`;
    return this.http.get<GetResponseProductcategory>(productsCategorySearchUrl).pipe(
      map(reponse =>
        reponse._embedded.productCategory)
    )
  }
}

interface GetResponseProducts {
  _embedded: {
    products: Product[];
  },
  page: {
    size: number,
    totalElements: number,
    totalPages: number,
    number: number,
  }
}

interface GetResponseProductcategory {
  _embedded: {
    productCategory: ProductCategory[];
  }
}
