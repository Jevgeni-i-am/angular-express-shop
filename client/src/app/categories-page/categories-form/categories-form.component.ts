import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CategoriesService} from "../../shared/services/categories.service";
import {switchMap} from "rxjs/operators";
import {of} from "rxjs";
import {MaterialService} from "../../shared/classes/material.service";
import {error} from "@angular/compiler/src/util";


@Component({
  selector: 'app-categories-form',
  templateUrl: './categories-form.component.html',
  styleUrls: ['./categories-form.component.css']
})
export class CategoriesFormComponent implements OnInit {
  @ViewChild('input') inputRef: ElementRef
  form: FormGroup
  isNew = true
  image = File
  imagePreview: string | ArrayBuffer =''

  constructor(private route: ActivatedRoute,
              private categoriesService: CategoriesService) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required)
    })
    //Отключаем кноки до загрузки контента
    this.form.disable()
    this.route.params
      .pipe(
        switchMap(
          (params) => {
            if (params['id']) {
              this.isNew = false
              return this.categoriesService.getById(params['id'])
            }
            of(null)
          }
        )
      )
      //Асинхронная загрузка контента
      .subscribe(
        category => {
          if (category) {
            this.form.patchValue({
              name: category.name
            })
            MaterialService.updateTextInputs()
          }
          //включаем кнопки после загрузки контента
          this.form.enable()
        },
        error=>MaterialService.toast(error.error.message)

      )


  }

  //Загрузка изображения по кллику на кнопку загрузки
  triggerClick() {
    this.inputRef.nativeElement.click()
  }

  onFileUpload(event: any) {
    const file = event.target.files[0]
    this.image = file
    const reader = new FileReader()
    reader.onload=()=>{
      this.imagePreview =reader.result
    }
    reader.readAsDataURL(file)

  }

  onSubmit() {

  }
}
