import { Component, OnInit, ViewChild, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { STColumn, STComponent, STChange } from '@delon/abc';
import { SFSchema } from '@delon/form';
import { BottleneckService } from '../../service/bottleneck.service';
import { NzMessageService } from 'ng-zorro-antd';
import { BottleneckAdjustComponent } from '../adjust/adjust.component';

@Component({
  selector: 'app-bottleneck-list',
  templateUrl: './list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [BottleneckService],
})
export class BottleneckListComponent implements OnInit {
  data = [];
  record: any;

  columns: STColumn[] = [
    { title: '编号', index: 'id.value', type: 'radio' },
    { title: '设备编码', index: 'deviceCode' },
    { title: '设备名称', index: 'deviceName' },
    { title: '功能位置编码', index: 'functionPositionCode' },
    { title: '功能位置名称', index: 'functionPositionName' },
    { title: '是否瓶颈设备', index: 'bottleneckDevice' },
    { title: '剩余时间', index: 'restTime' },
    { title: '维护工厂编码', index: 'factoryCode' },
    { title: '工厂名称', index: 'factoryName' },
    { title: '资产卡片号', index: 'careCode' },
    { title: 'ABC分类编码', index: 'abcCode' },
    { title: 'ABC分类名称', index: 'abcName' },
  ];

  constructor(
    private msgSrv: NzMessageService,
    private modal: ModalHelper,
    private botSrv: BottleneckService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.loadDevices();
  }

  loadDevices(): void {
    const userCode = localStorage.getItem('userCode');
    if (!userCode) {
      this.msgSrv.error('当前登录用户无效!');
      return;
    }
    this.botSrv.loadUserDevices(userCode).subscribe((res: any) => {
      this.data = res.data;
      this.cdr.detectChanges();
    });
  }

  colChange(e: STChange) {
    this.record = e.radio;
  }

  adjustBottleneck(): void {
    this.modal.createStatic(BottleneckAdjustComponent, { record: this.record }).subscribe((res: any) => {
      if (res.data === true) {
        this.msgSrv.success('调整成功');
      } else {
        this.msgSrv.error('机台调整失败');
      }
    });
  }
}
