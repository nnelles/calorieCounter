import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Meal } from "../../models";

@Component({
  selector: 'cc-meal-item',
  template:
  `<div class="card" style="width: 20rem;">
     <div class="card-block">
       <h4 class="card-title">{{meal.description}}</h4>
        <dl>
          <dt>Calories:</dt>
          <dd>{{meal.calorieValue}}</dd>
          <dt>Time Eaten</dt>
          <dd>{{meal.mealTime | date:'MMMM d yyyy, h:mm a'}}</dd>
        </dl>
     <a (click)="updateMealRequest()" class="btn btn-primary">Edit</a>
     <a (click)="deleteMeal()" class="btn btn-primary">Delete</a>
    </div>
  </div>`,
  styleUrls: []
})

export class MealItemComponent {
  @Input() meal: Meal;
  @Output('updateMeal') updateMealEmitter: EventEmitter<Meal> = new EventEmitter<Meal>();
  @Output('deleteMeal') deleteMealEmitter: EventEmitter<number> = new EventEmitter<number>();

  constructor() {}

  updateMealRequest() {
    this.updateMealEmitter.emit(this.meal);
  }

  deleteMeal() {
    this.deleteMealEmitter.emit(this.meal.id)
  }

}
