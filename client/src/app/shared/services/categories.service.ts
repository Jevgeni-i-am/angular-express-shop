import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Category, Message} from "../interfaces";

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  constructor(private http: HttpClient) {
  }

  //получает список всех категорий
  fetch(): Observable<Category[]> {
    return this.http.get<Category[]>('/api/category')
  }

  getById(id: string): Observable<Category> {
    return this.http.get<Category>(`/api/category/${id}`)
  }

  //Отправка файла на сервер
  create(name: string, image?: File): Observable<Category> {
    const fd = new FormData()
    if (image) {
      //Имя Image взято с create запроса бэкэнда
      fd.append('image', image, image.name)
    }
    fd.append('name', name)

    return this.http.post<Category>('/api/category', fd)
  }

  //Обновление файла на сервере
  update(id: string, name: string, image?: File): Observable<Category> {
    const fd = new FormData()

    if (image) {
      //Имя Image взято с create запроса бэкэнда
      fd.append('image', image, image.name)
    }
    fd.append('name', name)

    return this.http.patch<Category>(`/api/category/${id}`, fd)
  }

  //Удаление категории. Тип Message импортируется из файла interfaces
  delete(id:string):Observable<Message>{
return this.http.delete<Message>(`/api/category/${id}`)
  }

}

