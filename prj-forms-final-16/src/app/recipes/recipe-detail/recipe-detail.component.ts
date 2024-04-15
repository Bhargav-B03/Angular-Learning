import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, switchMap } from 'rxjs/operators';

import { Recipe } from '../recipe.model';
import * as fromApp from '../../store/app.reducer';
import * as RecipeActions from '../store/recipes.actions';
import * as ShoppingListActions from '../../shopping-list/store/shopping-list.action';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromApp.AppState>) {
  }

  ngOnInit() {
    this.route.params.pipe(map(params => +params['id']), switchMap(id => {
      this.id = id;
      return this.store.select('recipes');
    }),
      map(recipeState => {
        return recipeState.recipes.find((recipe, index) => index === this.id)
      })
    )
      .subscribe(recipe => {
        this.recipe = recipe;
      })
    // this.route.params
    //   .subscribe(
    //     (params: Params) => {
    //       this.id = +params['id'];
    //       // this.recipe = this.recipeService.getRecipe(this.id);
    //       this.store.select('recipes').pipe(map(recipeState => { return recipeState.recipes.find((recipe, index) => index === this.id) })).subscribe(recipe=>{
    //         this.recipe = recipe;
    //       })
    //     }
    //   );
  }

  onAddToShoppingList() {
    // this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
    this.store.dispatch(new ShoppingListActions.AddIngredients(this.recipe.ingredients));
  }

  onEditRecipe() {
    this.router.navigate(['edit'], { relativeTo: this.route });
    // this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route});
  }

  onDeleteRecipe() {
    // this.recipeService.deleteRecipe(this.id);
    this.store.dispatch(new RecipeActions.DeleteRecipe(this.id));
    this.router.navigate(['/recipes']);
  }

}
