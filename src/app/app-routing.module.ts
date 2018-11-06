import { Routes, RouterModule } from '@angular/router';

import { IssueViewerComponent } from './issue-viewer/issue-viewer.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AuthGuard } from './auth.guard';
import { UserAdminComponent } from './user-admin/user-admin.component';
import { IssueEditComponent } from './issue-edit/issue-edit.component';
import { IssueCreateComponent } from './issue-create/issue-create.component';

const appRoutes: Routes = [
  { path: '', component: IssueViewerComponent, canActivate: [AuthGuard] },
  { path: 'signin', component: SignInComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'user/admin', component: UserAdminComponent },
  { path: 'user/edit/:id', component: IssueEditComponent },
  { path: 'user/create', component: IssueCreateComponent },

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

export const AppRoutingModule = RouterModule.forRoot(appRoutes);
