import {Component, OnInit} from '@angular/core';
import {CategoriesService} from "../../shared/services/categories.service";
import {Observable} from "rxjs/index";
import {Category} from "../../shared/interfaces";

@Component({
  selector: 'app-order-categories',
  templateUrl: './order-categories.component.html',
  styles: []
})
export class OrderCategoriesComponent implements OnInit {
/* $ обозначает асинхронный код */
  categories$:Observable<Category[]>

  constructor(private categoriesService: CategoriesService) {
  }

  ngOnInit() {
    // переопределяем данную переменную. Говорим что стрим, который только что создали (типа Observable),
    // у нас будет равнятся тому, что вернёт сервис.
    // И чтоб получить список всех категорий, у нас есть метод fetch
  this.categories$=this.categoriesService.fetch()
  }

}
