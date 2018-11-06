import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IssueService } from '../services/issue.service';
import { Issue } from '../models/Issue';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-admin',
  templateUrl: './user-admin.component.html',
  styleUrls: ['./user-admin.component.css']
})
export class UserAdminComponent implements OnInit {
  issues$: Observable<Issue[]>;
  form: FormGroup;

  constructor(
    private issueService: IssueService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.issues$ = this.issueService.getAllUserIssues();
  }

  truncateDesc(str) {
    if (str.length > 30) {
      return str.slice(0, str.length - str.length / 1.2) + '.....';
    }
    return str;
  }

  goToEdit(id) {
    console.log(id);
    this.router.navigate(['user/edit', id]);
  }

  goToCreate() {
    this.router.navigateByUrl('/user/create');
  }
}
