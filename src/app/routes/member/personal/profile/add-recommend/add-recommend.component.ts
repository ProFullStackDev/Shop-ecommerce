import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BasicService } from '@core/services/user/basic.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-add-recommend',
  templateUrl: './add-recommend.component.html',
  providers: [BasicService]
})
export class AddRecommendComponent implements OnInit {
  constructor(private fb: FormBuilder, private basicSrv: BasicService, private message: NzMessageService) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      recommendId: [null, Validators.required]
    });
  }

  timeInterval: any;

  validateForm!: FormGroup;

  loading = {
    submit: false
  };

  validate() {
    return new Observable(observable => {
      if (this.validateForm.valid) {
        const { recommendId } = this.validateForm.value;
        this.basicSrv.bindRecommender({ recommenderId: recommendId }).subscribe({
          next: () => {
            this.message.success('添加成功');
            observable.next();
            observable.complete();
          },
          error: error => {
            console.error(error);
            observable.error(error);
            this.message.error(error.message);
          }
        });
      } else {
        observable.error();
        Object.values(this.validateForm.controls).forEach(control => {
          if (control.invalid) {
            control.markAsDirty();
            control.updateValueAndValidity({ onlySelf: true });
          }
        });
      }
    });
  }
}
