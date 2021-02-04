import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import {MaterialInstance, MaterialService} from "../shared/classes/material.service";
import {OrderService} from "./order.service";
import {OrdersService} from "../shared/services/orders.service";
import {Order, OrderPosition} from "../shared/interfaces";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styles: [],
  providers: [OrderService]
})
export class OrderPageComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('modal') modalRef: ElementRef
  modal: MaterialInstance
  oSub: Subscription
  isRoot: boolean
  pending = false

  constructor(private router: Router,
              public order: OrderService,
              private ordersService: OrdersService,
  ) {
  }

  ngOnInit() {
    //Проверка: изменение страницы на страницу с другой навигацией
    this.isRoot = this.router.url === '/order'
    //прослушка событий на изменения страниц
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isRoot = this.router.url === '/order'
      }
    })
  }

  ngOnDestroy() {
    this.modal.destroy()
    if (this.oSub) {
      this.oSub.unsubscribe()
    }
  }

  ngAfterViewInit() {
    this.modal = MaterialService.initModal(this.modalRef)
  }

  removePosition(orderPosition: OrderPosition) {
    this.order.remove(orderPosition)
  }

  open() {
    this.modal.open()
  }

  cancel() {
    this.modal.close()
  }

  submit() {
    this.pending = true
    const order: Order = {
      list: this.order.list.map(item => {
        delete item._id
        return item
      })
    }
    this.oSub = this.ordersService.create(order).subscribe(
      newOrder => {
        MaterialService.toast(`Order num. ${newOrder.order} added.`)
        this.order.clear()
      },
      error => MaterialService.toast(error.error.message),
      () => {
        this.modal.close()
        this.pending = false
      }
    )
  }
}
