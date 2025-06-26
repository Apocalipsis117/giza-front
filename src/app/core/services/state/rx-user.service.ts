import { inject, Injectable } from '@angular/core';
import { Login_API } from '@interfaces/index';
import { Store } from '@ngrx/store';
import * as actions from '@actions/user.action';
import * as selects from '@selectors/user.select';
import { share } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RxUserService {
    private appstore = inject(Store);

    dispachLogin(data: Login_API | null) {
        this.appstore.dispatch(actions.action_user_login({ data }))
    }

    get selectLogin() {
        return this.appstore.select(selects.select_user_data_login).pipe(share());
    }
}
