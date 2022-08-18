import { ChangeDetectionStrategy, Component, Input, Output, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { StationLetterService, StationLetterPOM } from '@core/services/game/stationLetter.service';
import { SystemUserService } from '@core/system/system-user.service';
import { ModalDto } from '@routes/dashboard/models/game-board';
import { MessagesModalDto } from '@shared/models/messages-modal.model';
import { CustomOverlayRef } from '@shared/modules/modal/classes/custom-overlay-ref';
import { MODAL_DATA } from '@shared/modules/modal/classes/modal-data';
import { MESSAGE_LIST } from '@shared/statics/messages-modal/messages-modal.static';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessagesComponent implements OnInit {
  @ViewChild('scrollable') scrollable: ElementRef;

  public messages: StationLetterPOM[] = [];
  public isScrollable = false;
  public messagePreview = false;
  public unreadNumber = 0;
  public test = 0;
  // public messageInfo: MessagesModalDto | null;
  public messageInfo: any;

  constructor(
    @Inject(MODAL_DATA) public readonly modalData: ModalDto,
    private letter: StationLetterService,
    private readonly user: SystemUserService,
    @Inject(CustomOverlayRef) private readonly overlayRef: CustomOverlayRef
  ) {
    // this.getStationLetter();
  }

  ngOnInit(): void {
    this.getStationLetter();
  }

  public onScroll(): void {
    this.isScrollable = this.scrollable.nativeElement.scrollTop;
  }

  public closeModal(): void {
    this.close();
  }

  public getStationLetter() {
    this.letter
      .queryLetter()
      .subscribe(
        res => {
          this.messages = res;
          this.unreadNumber = res.filter(item => item.isRead).length;
          // console.log(this.unreadNumber, '我是查询站内信11111', this.messages);
        },
        error => {
          console.error(error);
        }
      )
      .add();
  }

  public toggleMessage(message: MessagesModalDto | null): void {
    this.messagePreview = !this.messagePreview;

    if (!message) {
      this.isScrollable = false;
      this.messageInfo = null;
      return;
    }
    this.messageInfo = message;

    if (this.messageInfo.isRead) {
      return;
    }

    console.log('message', this.messageInfo);
    this.letter
      .alreadyRead({ id: this.messageInfo.id })
      .subscribe(
        res => {
          if (res.message == 'success') {
            this.user.getStationLetter();
          }
        },
        error => {
          console.error(error);
        }
      )
      .add();
    // this.messageInfo = new MessagesModalDto(
    //   'Welcome to TYQOON, thanks for signing up and joining the next generation of digital commerce. \n' +
    //     '\n' +
    //     'TYQOON is a wonderful place to shop for everything you want, expand your earning potential, and conquer the world. \n' +
    //     '\n' +
    //     'Check out the Gameboard and make yourself at home. Everyone can become a billionare!',
    //   false
    // );
  }

  private close(data: ModalDto | null = null): void {
    this.overlayRef.close(data);
  }
}
