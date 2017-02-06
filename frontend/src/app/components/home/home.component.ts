import { Component, OnInit, EventEmitter, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MealService, UserService } from '../../services';
import { Meal, PaginatedData, MealSaveRequest } from '../../models';
import { MealSaveAction, MealActionType } from '../../actions';
import { AddUpdateMealComponent } from './';

@Component({
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  public static PAGE_SIZE: number = 4;
  page: number = 0;
  mealPage: PaginatedData;
  loadingPage: boolean = false;
  userSave: EventEmitter<MealSaveAction>;

  @ViewChild('addUpdateMeal') addUpdateMealComponent: AddUpdateMealComponent;

  constructor(private route: ActivatedRoute, private mealService: MealService,
     private userService: UserService) {}

  ngOnInit() {
    this.mealPage = this.route.snapshot.data['meals'];
  }

  getPage(): number {
    return this.mealPage.number + 1;
  }

  hasNextPage() :boolean {
    return this.mealPage.number < this.mealPage.totalPages - 1;
  }

  hasPreviousPage() :boolean {
    return this.mealPage.number > 0;
  }

  nextPage() {
    this.updatePage(this.mealPage.number + 1);
  }

  previousPage() {
    this.updatePage(this.mealPage.number - 1);
  }

  updatePage(newPage: number) {
    this.mealService.getUserMeals(this.userService.getUser().id, newPage, HomeComponent.PAGE_SIZE).subscribe( mealPage => {
      this.mealPage = mealPage;
    })
  }

  createMealModal() {
    this.addUpdateMealComponent.showModal(new MealSaveRequest(), MealActionType.CREATE);
  }

  updateMealModal(m: Meal) {
    let mealRequest: MealSaveRequest = new MealSaveRequest();
    mealRequest.id = m.id;
    mealRequest.description = m.description;
    mealRequest.mealTime = m.mealTime;
    mealRequest.calorieValue = m.calorieValue;

    this.addUpdateMealComponent.showModal(mealRequest, MealActionType.UPDATE);
  }

  handleSaveRequest(m: MealSaveAction) {
    if (m.action == MealActionType.CREATE) {
      this.mealService.createMeal(this.userService.getUser().id, m.mealSaveRequest).subscribe( meal => {
        this.addUpdateMealComponent.mealSaveSucceded();
        this.updatePage(this.mealPage.number);
      });
    } else {
      this.mealService.updateMeal(this.userService.getUser().id, m.mealSaveRequest).subscribe( meal => {
        this.addUpdateMealComponent.mealSaveSucceded();
        for ( let i = 0; i < this.mealPage.items.length ; i++) {
          if (this.mealPage.items[i].id == meal.id) {
            this.mealPage.items[i] = meal;
            break;
          }
        }
      });
    }
  }

}
