import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { IssueService } from '../services/issue.service';
import { Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-issue-edit',
  templateUrl: './issue-edit.component.html',
  styleUrls: ['./issue-edit.component.css']
})
export class IssueEditComponent implements OnInit, OnDestroy {
  form: FormGroup;
  id: any;
  sub: Subscription;

  constructor(
    private fb: FormBuilder,
    private issueService: IssueService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = this.fb.group({
      title: [''],
      responsible: [''],
      severity: [''],
      description: [''],
      status: ['']
    });
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      console.log(params);
      this.id = params['id'];

      this.issueService.getUserIssue(this.id).subscribe(issue => {
        const { title, responsible, severity, description, status } = issue;
        this.form.patchValue({
          title,
          responsible,
          severity,
          description,
          status
        });
      });
    });
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  saveChanges() {
    const val = this.form.value;
    console.log(val);

    if (val.responsible && val.severity && val.description && val.status) {
      this.issueService.editUserIssue(this.id, val).subscribe(
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
}
