import { ChangeDetectionStrategy, Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

import { DropdownItem, SelectType } from '../../models/app-select.model';

@Component({
  selector: 'app-select',
  templateUrl: './app-select.component.html',
  styleUrls: ['./app-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppSelectComponent implements OnInit {
  @Input() defaultItemLang: string | null;
  @Input() dropdownItem: DropdownItem[] = [];
  @Input() type: SelectType = SelectType.Language;
  @Input() selectedLanguage = false;
  @Output() readonly checkLanguage = new EventEmitter<string>();

  public activeItem: DropdownItem;

  ngOnInit(): void {
    let currentItem;

    if (this.defaultItemLang) {
      currentItem = this.dropdownItem.find(item => item.lang === this.defaultItemLang);
    } else {
      currentItem = this.dropdownItem.find(item => item);
    }

    if (!currentItem) {
      return;
    }

    this.activeItem = new DropdownItem(currentItem.id, currentItem.icon, currentItem.currency, currentItem.lang, currentItem.text);
  }

  public setActiveItem(selectedItem: DropdownItem): void {
    const currentItem = this.dropdownItem.find(item => item.id === selectedItem.id);
    if (!currentItem || !selectedItem?.lang) {
      return;
    }

    this.checkLanguage.emit(selectedItem.lang);

    this.activeItem = new DropdownItem(currentItem.id, currentItem.icon, currentItem.currency, currentItem.lang, currentItem.text);
  }

  public trackById(index: number, item: DropdownItem): number {
    return item.id;
  }
}
