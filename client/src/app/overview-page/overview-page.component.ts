import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {AnalyticsService} from "../shared/services/analytics.service";
import {Observable} from "rxjs/index";
import {OverviewPage} from "../shared/interfaces";
import {MaterialInstance, MaterialService} from "../shared/classes/material.service";

@Component({
  selector: 'app-overview-page',
  templateUrl: './overview-page.component.html',
  styleUrls: ['./overview-page.component.css']
})
export class OverviewPageComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('tapTarget') tapTargetRef: ElementRef
  tabTarget: MaterialInstance
  data$: Observable<OverviewPage>
  yesterday = new Date()

  constructor(private service: AnalyticsService) {
  }

  ngOnInit() {
    this.data$ = this.service.getOverview()
    //Устанавливаем "Вчера" в виде даты
    this.yesterday.setDate(this.yesterday.getDate()-1)
  }

  ngAfterViewInit() {
    this.tabTarget = MaterialService.initTapTarget(this.tapTargetRef)
  }

  ngOnDestroy() {
    this.tabTarget.destroy()
  }

  openInfo() {
    this.tabTarget.open()
  }
}
