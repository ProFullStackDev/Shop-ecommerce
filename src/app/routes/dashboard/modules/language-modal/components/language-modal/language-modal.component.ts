import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {DropdownItem} from "@shared/components/app-select/models/app-select.model";
import {LANGUAGES_LIST} from "@shared/statics/languages-select/languages-select.static";
import {CustomOverlayRef} from "@shared/modules/modal/classes/custom-overlay-ref";
import {PlanList} from "@shared/models/get-prime-modal.model";
import {PLAN_LIST} from "@shared/statics/get-prime-modal/get-prime-modal.static";
import {FormControl} from "@angular/forms";
import {MODAL_DATA} from "@shared/modules/modal/classes/modal-data";
import {ModalDto} from "@routes/dashboard/models/game-board";
import {OverlayService} from "@shared/modules/modal/services/overlay.service";
import {MyProfileModalComponent} from "@routes/dashboard/modules/my-profile-modal/components/my-profile-modal/my-profile-modal.component";

@Component({
  selector: 'app-language-modal',
  templateUrl: './language-modal.component.html',
  styleUrls: ['./language-modal.component.css']
})
export class LanguageModalComponent implements OnInit {
  @ViewChild('scrollable') scrollable: ElementRef;

  public isScrollable = false;

  readonly languageList: DropdownItem[] = LANGUAGES_LIST;

  constructor(
    @Inject(CustomOverlayRef) private readonly overlayRef: CustomOverlayRef
  ) { }

  ngOnInit(): void {
  }

  onScroll(): void {
    this.isScrollable = this.scrollable.nativeElement.scrollTop;
  }

  setActiveItem(selectedItem: DropdownItem): void {
    this.close(selectedItem);
  }

  trackById(index: number, item: DropdownItem): number {
    return item.id;
  }

  private close(data: any | null = null): void {
    this.overlayRef.close(data);
  }
}
