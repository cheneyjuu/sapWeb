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
  records = [];
  loading = false;

  columns: STColumn[] = [
    { title: '编号', index: 'id.value', type: 'checkbox' },
    { title: '设备编码', index: 'deviceCode' },
    { title: '设备名称', index: 'deviceName' },
    { title: '功能位置编码', index: 'functionPositionCode' },
    { title: '功能位置名称', index: 'functionPositionName' },
    {
      title: '是否瓶颈机台',
      index: 'bottleneckDevice',
      type: 'badge',
      badge: {
        是: { text: '是', color: 'error' },
        否: { text: '否', color: 'success' },
      },
    },
    { title: { text: '剩余时间', optional: '（单位：分钟）' }, index: 'restTime' },
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
    this.loading = true;
    const userCode = localStorage.getItem('userCode');
    if (!userCode) {
      this.msgSrv.error('当前登录用户无效!');
      return;
    }
    this.botSrv.loadUserDevices(userCode).subscribe((res: any) => {
      this.loading = false;
      this.data = res.data;
      this.cdr.detectChanges();
    });
  }

  colChange(e: STChange) {
    if (e.type === 'checkbox') {
      this.records = e.checkbox;
    }
  }

  adjustBottleneck(): void {
    this.modal.createStatic(BottleneckAdjustComponent, { params: this.records }).subscribe((res: any) => {
      if (res.data === true) {
        this.msgSrv.success('调整成功');
      } else {
        this.msgSrv.error('机台调整失败');
      }
    });
  }
}
