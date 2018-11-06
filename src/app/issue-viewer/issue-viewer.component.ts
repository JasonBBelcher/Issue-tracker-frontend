import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IssueService } from '../services/issue.service';
import { Issue } from '../models/Issue';

@Component({
  selector: 'app-issue-viewer',
  templateUrl: './issue-viewer.component.html',
  styleUrls: ['./issue-viewer.component.css']
})
export class IssueViewerComponent implements OnInit {
  issues$: Observable<Issue[]>;
  constructor(private issueSvc: IssueService) {}

  ngOnInit() {
    this.issues$ = this.issueSvc.getAllIssues();
  }

  truncateDesc(str) {
    if (str.length > 45) {
      return str.slice(0, str.length - str.length / 1.2) + '.....';
    }
    return str;
  }
}
