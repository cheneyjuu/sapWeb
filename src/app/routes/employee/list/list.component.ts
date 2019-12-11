import { Component, OnInit, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { STColumn, STComponent } from '@delon/abc';
import { SFSchema } from '@delon/form';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [UserService],
})
export class EmployeeListComponent implements OnInit {
  data = [];

  @ViewChild('st', { static: false }) st: STComponent;
  columns: STColumn[] = [
    { title: '人员编码', index: 'userCode' },
    { title: '姓名', index: 'userName' },
    { title: '岗位代码', index: 'jobCode' },
    { title: '岗位名称', index: 'jobName' },
    { title: '区域代码', index: 'regionCode' },
    { title: '区域名称', index: 'regionName' },
    { title: '分公司编码', index: 'branchCode' },
    { title: '分公司名称', index: 'branchName' },
    { title: '工厂代码', index: 'factoryCode' },
    { title: '工厂名称', index: 'factoryName' },
    {
      title: '是否维修人员',
      index: 'isMalStaff',
      type: 'yn',
      yn: {
        truth: '是',
        yes: '是',
        no: '否',
        mode: 'text',
      },
    },
    {
      title: '',
      buttons: [
        // { text: '查看', click: (item: any) => `/form/${item.id}` },
        // { text: '编辑', type: 'static', component: FormEditComponent, click: 'reload' },
      ],
    },
  ];

  constructor(private userSrv: UserService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userSrv.findAllUsers().subscribe((res: any) => {
      this.data = res.data;
      this.cdr.detectChanges();
    });
  }
}
