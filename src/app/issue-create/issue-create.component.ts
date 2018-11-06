import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { IssueService } from '../services/issue.service';
import { Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-issue-create',
  templateUrl: './issue-create.component.html',
  styleUrls: ['./issue-create.component.css']
})
export class IssueCreateComponent {
  form: FormGroup;
  id: any;
  sub: Subscription;

  constructor(
    private fb: FormBuilder,
    private issueService: IssueService,
    private router: Router
  ) {
    this.form = this.fb.group({
      title: [''],
      responsible: [''],
      severity: [''],
      description: ['']
    });
  }

  save() {
    const val = this.form.value;

    if (val.title && val.responsible && val.severity && val.description) {
      this.issueService.createUserIssue(val).subscribe(
        () => {
          this.router.navigateByUrl('/user/admin');
        },
        error => {
          this.cancel();
        }
      );
    }
  }

  cancel() {
    this.router.navigateByUrl('/user/admin');
  }

  toggled(event) {
    console.log(event);
  }

  getVal(event) {
    console.log(event.target.value);
  }
}
