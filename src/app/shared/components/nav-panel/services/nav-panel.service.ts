import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs';
import { PagesList } from "../models/nav-panel.model";
import {PAGES_LINKS} from "../../../../mock/nav-panel.mock";

@Injectable({providedIn: 'root'})
export class NavPanelService {

  constructor() { }

  public getPagesList(): Observable<PagesList[]> {
    return of(PAGES_LINKS);
  }
}
