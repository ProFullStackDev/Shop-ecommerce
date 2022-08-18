import { Injectable } from '@angular/core';
import { BuildingType } from '@shared/models/nft-shop-modal.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BuildShopsService {
  public buildShop = new BehaviorSubject<BuildingType[]>([]);

  constructor() {}
}
