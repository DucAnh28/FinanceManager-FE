import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Category} from "../model/category";
import {AccountService} from "../../account/service/account.service";

const API = 'http://localhost:8080/categories/'

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private httpClient: HttpClient,
              private accountService : AccountService) {}

  findAll(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(API + this.accountService.currentUserValue.id);
  }

  findById(id: number): Observable<any> {
    return this.httpClient.get(API + 'find?cate_id=' + id);
  }


  save(category: any): Observable<any> {
    return this.httpClient.post(API, category);
  }

  update(id: number, category: any): Observable<any> {
    return this.httpClient.put(API + `${id}`, category);
  }

  delete(id: number):Observable<any>{
    return this.httpClient.delete(API + `${id}`);
  }

  findCateByUser(id: number):Observable<Category[]>{
    return this.httpClient.get<Category[]>(API+"/list/"+id);
  }
}
