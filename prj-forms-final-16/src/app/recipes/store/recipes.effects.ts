import { Actions, Effect, ofType } from "@ngrx/effects";
import { map, switchMap, withLatestFrom } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";

import * as RecipesAction from './recipes.actions';
import { Recipe } from "../recipe.model";
import * as fromApp from '../../store/app.reducer';

@Injectable()
export class RecipeEffects {

    @Effect()
    fetchRecipes = this.actions$.pipe(ofType(RecipesAction.FETCH_RECIPE),
        switchMap(() => {
            return this.http.get<Recipe[]>('https://ng-recipe-book-901c6-default-rtdb.firebaseio.com/recipes.json')
        }),
        map(recipes => {
            return recipes.map(recipe => {
                return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] }
            })
        }),
        map(recipes => {
            return new RecipesAction.SetRecipes(recipes);
        }))

    @Effect({dispatch: false})
    StoreRecipes = this.actions$.pipe(ofType(RecipesAction.STORE_RECIPE),
    withLatestFrom(this.store.select('recipes')),
        switchMap(([actionData, recipesState]) => {
            return this.http.put('https://ng-recipe-book-901c6-default-rtdb.firebaseio.com/recipes.json', recipesState.recipes)
        })
    )

    constructor(private actions$: Actions, private http: HttpClient, private store: Store<fromApp.AppState>) { }
} 