import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CategoriesService} from "../../shared/services/categories.service";
import {switchMap} from "rxjs/operators";
import {of} from "rxjs";
import {MaterialService} from "../../shared/classes/material.service";
import {Category} from "../../shared/interfaces";


@Component({
  selector: 'app-categories-form',
  templateUrl: './categories-form.component.html',
  styleUrls: ['./categories-form.component.css']
})
export class CategoriesFormComponent implements OnInit {
  @ViewChild('input') inputRef: ElementRef
  form: FormGroup
  isNew = true
  image: File
  imagePreview: string | ArrayBuffer = ''
  category: Category

  constructor(private route: ActivatedRoute,
              private router: Router,
              private categoriesService: CategoriesService) {
  }

  ngOnInit() {
    //Новая категория или изменение категории
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required)
    })
    //Отключаем кноки до загрузки контента
    this.form.disable()
    this.route.params
      .pipe(
        switchMap(
          (params: Params) => {
            if (params['id']) {
              this.isNew = false
              return this.categoriesService.getById(params['id'])
            }
            return of(null)
          }
        )
      )
      //Асинхронная загрузка контента, результирующий стрим
      .subscribe(
        //Для подсказок оборачиваетм category-> (category:Category). Задаём явный тип
        (category: Category) => {
          if (category) {
            //Если у нас есть категория, то задаём определение. Нужно для патча файла
            this.category = category
            this.form.patchValue({
              name: category.name
            })
            //Предварительный просмотр изображения
            this.imagePreview = category.imageSrc
            MaterialService.updateTextInputs()
          }
          //включаем кнопки после загрузки контента
          this.form.enable()
        },
        error => MaterialService.toast(error.error.message)
      )


  }

  //Удаление категории
  deleteCategory() {
    const decision = window.confirm(`Вы уверены что хотите удалить категорию "${this.category.name}"?`)
    if (decision) {
      this.categoriesService.delete(this.category._id)
        .subscribe(
          response => MaterialService.toast(response.message),
          error => MaterialService.toast(error.error.message),
          () => this.router.navigate(['/categories'])
        )
    }

  }

  //Загрузка изображения по кллику на кнопку загрузки
  triggerClick() {
    this.inputRef.nativeElement.click()
  }

  //Загрузка файла на сервер
  onFileUpload(event: any) {

    const file = event.target.files[0]
    this.image = file
    const reader = new FileReader()
    reader.onload = () => {
      this.imagePreview = reader.result
    }
    reader.readAsDataURL(file)

  }

  //Данные из формы информации категории
  onSubmit() {
    let obs$
    this.form.disable()

    if (this.isNew) {
      //create
      obs$ = this.categoriesService.create(this.form.value.name, this.image)
    } else {
      //update
      obs$ = this.categoriesService.update(this.category._id, this.form.value.name, this.image)
    }
    obs$.subscribe(
      category => {
        this.category = category
        MaterialService.toast('Изменения сохранены')
        this.form.enable()
        this.router.navigate([`/categories/`],{relativeTo: this.route})
      },
      error => {
        MaterialService.toast(error.error.message)
        this.form.enable()
      }
    )
  }
}
