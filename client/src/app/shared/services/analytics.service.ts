import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs/index";
import {AnalyticsPage, OverviewPage} from "../interfaces";

// делаем данный класс injectable и добавляем providedIn root для регистрации
@Injectable({
  providedIn: 'root'
})

export class AnalyticsService {
  constructor(private http: HttpClient) {
  }
//возвращаем объект http и с помощью метода get делаем запрос на старницу /api/analytics/overview
  getOverview():Observable<OverviewPage> {
    return this.http.get<OverviewPage>('/api/analytics/overview')
  }

  getAnalytics():Observable<AnalyticsPage> {

    return this.http.get<AnalyticsPage>('/api/analytics/analytics')
  }
}
