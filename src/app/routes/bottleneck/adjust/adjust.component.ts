import { Component, OnInit, ViewChild } from '@angular/core';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { SFSchema, SFUISchema } from '@delon/form';
import { BottleneckService } from '../../service/bottleneck.service';

@Component({
  selector: 'app-bottleneck-adjust',
  templateUrl: './adjust.component.html',
  providers: [BottleneckService],
})
export class BottleneckAdjustComponent implements OnInit {
  record: any = {};

  schema: SFSchema = {
    properties: {
      deviceCode: { type: 'string', title: '设备编号' },
      deviceName: { type: 'string', title: '设备名称' },
      startDateTime: { type: 'string', title: '开始时间', format: 'date-time' },
      endDateTime: { type: 'string', title: '结束时间', format: 'date-time' },
    },
    required: ['startTime', 'endTime'],
  };
  ui: SFUISchema = {
    '*': {
      spanLabelFixed: 100,
      grid: { span: 12 },
    },
    $deviceCode: {
      widget: 'text',
    },
    $deviceName: {
      widget: 'text',
    },
  };

  constructor(private modal: NzModalRef, private msgSrv: NzMessageService, private botSrv: BottleneckService) {}

  ngOnInit(): void {}

  save(value: any) {
    value.userCode = localStorage.getItem('userCode');
    value.startDate = value.startDateTime.substring(0, 10);
    value.startTime = value.startDateTime.substring(11, 16);
    value.endDate = value.endDateTime.substring(0, 10);
    value.endTime = value.endDateTime.substring(11, 16);
    console.log({ value });

    this.botSrv.adjustDevice(value).subscribe((res: any) => {
      this.modal.destroy(res);
    });
  }

  close(): void {
    this.modal.destroy();
  }
}
