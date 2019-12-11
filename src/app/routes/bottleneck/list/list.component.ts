import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { STColumn, STComponent } from '@delon/abc';
import { SFSchema } from '@delon/form';
import { BottleneckService } from '../../service/bottleneck.service';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-bottleneck-list',
  templateUrl: './list.component.html',
  providers: [BottleneckService],
})
export class BottleneckListComponent implements OnInit {
  data = [];
  constructor(private msgSrv: NzMessageService, private modal: ModalHelper, private botSrv: BottleneckService) {}

  ngOnInit() {}

  loadDevices(): void {
    const userCode = localStorage.getItem('userCode');
    if (!userCode) {
      this.msgSrv.error('当前登录用户无效!');
      return;
    }
    this.botSrv.loadUserDevices(userCode).subscribe((res: any[]) => {
      if (res && res.length > 0) {
        res[0].active = true;
      }
      this.data = res;
    });
  }
}
