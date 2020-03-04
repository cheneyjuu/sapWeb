import { Component, OnInit, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { STColumn, STComponent, STChange } from '@delon/abc';
import { SFSchema, SFUISchemaItem, SFComponent } from '@delon/form';
import { UserService } from '../../service/user.service';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-employee-list',
  templateUrl: './list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [UserService],
})
export class EmployeeListComponent implements OnInit {
  data = [];
  record: any;
  loading = false;

  searchSchema: SFSchema = {
    properties: {
      userName: {
        type: 'string',
        title: '姓名',
      },
      userCode: {
        type: 'string',
        title: '编码',
      },
    },
  };
  ui: SFUISchemaItem = {
    $userName: { size: 'small' },
    $userCode: { size: 'small' },
  };

  @ViewChild('sf', { static: false }) sf: SFComponent;
  @ViewChild('st', { static: false }) st: STComponent;
  columns: STColumn[] = [
    { title: '编号', index: 'id.value', type: 'radio' },
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
  ];

  constructor(private userSrv: UserService, private cdr: ChangeDetectorRef, private msgSrv: NzMessageService) {}

  ngOnInit() {
    this.loadUsers();
  }

  /**
   * 加载用户列表
   */
  loadUsers(): void {
    this.loading = true;
    this.userSrv.findAllUsers().subscribe((res: any) => {
      console.log({ users: res });

      this.loading = false;
      this.data = res.data;
      this.cdr.detectChanges();
    });
  }

  /**
   * 刷新数据
   */
  refreshData(): void {
    this.loadUsers();
  }

  /**
   * 复选框选中事件
   */
  colChange(e: STChange) {
    this.record = e.radio;
  }

  /**
   * 重置用户密码
   */
  resetPassword(): void {
    if (!this.record) {
      this.msgSrv.error('请先选择用户');
      return;
    }
    if (!this.record.userCode) {
      this.msgSrv.error('无效的用户');
      return;
    }
    this.userSrv.resetPassword(this.record.userCode).subscribe(() => {
      this.msgSrv.success('密码重置成功');
    });
  }

  /**
   * 释放用户
   */
  releaseUser(): void {
    if (!this.record) {
      this.msgSrv.error('请先选择用户');
      return;
    }
    if (!this.record.userCode) {
      this.msgSrv.error('无效的用户');
      return;
    }
    this.userSrv.releaseUser(this.record.userCode).subscribe((res: any) => {
      if (res.data === true) {
        this.msgSrv.success('用户已释放');
      } else {
        this.msgSrv.error('释放用户出错');
      }
    });
  }

  searchUser(evt: any): void {
    console.log({ evt });
    this.loading = true;
    this.userSrv.searchUser(evt).subscribe((res: any) => {
      console.log({ res });

      this.loading = false;
      this.data = res.data;
      this.cdr.detectChanges();
    });
  }
}
