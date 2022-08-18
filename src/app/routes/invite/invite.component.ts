import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SystemUserService } from '@core/system/system-user.service';

@Component({
  selector: 'app-invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.css']
})
export class InviteComponent implements OnInit {
  constructor(private activeRoute: ActivatedRoute, private readonly user: SystemUserService, private router: Router) {}

  ngOnInit(): void {
    const params = this.activeRoute.snapshot.queryParams;
    // console.log(this.user.isLogin(), '查看路由参数', params.recommenderId);
    if (this.user.isLogin()) {
      this.router.navigate(['/']);
    } else {
      this.router.navigate(['/', 'register'], { queryParams: { recommenderId: params.recommenderId } });
    }
  }
}
