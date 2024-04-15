import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";

export interface canComponentDeactivate {
    canDeactivateMethod: () => Observable<boolean> | Promise<boolean> | boolean;
}

export class canDeactivateGuard implements CanDeactivate<canComponentDeactivate> {
    canDeactivate(component: canComponentDeactivate,
        currentRoute: ActivatedRouteSnapshot,
        currentState: RouterStateSnapshot,
        nextState?: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
            return component.canDeactivateMethod();
    }
}