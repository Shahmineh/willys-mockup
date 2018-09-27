class Recipe extends Base {
  constructor(selectedRecipe, ingredients, recipes){
    super();
    this.filter = new Filter(ingredients, recipes);
    this.selectedRecipe = this.filter.findRecipeId(selectedRecipe);
    this.nutrition = new NutritionValues(ingredients, recipes);
    this.localPortion = this.selectedRecipe.portions;
    this.ratio = 1;
    this.eventHandlers();
  } 

  eventHandlers(){
    let that = this;
    $(document).on('click', "#recipe-remove", function() {
      that.localPortion > 1 ? that.localPortion-- : null;
      that.recalculateValues();
    });
    $(document).on('click', "#recipe-add", function() {
      that.localPortion++;
      that.recalculateValues();
    });
  }

  recalculateValues(){
    let that = this;
    that.ratio = that.localPortion/that.selectedRecipe.portions;
    $('main').empty();
    that.render('main');
    that.ingredientList();
    that.instructionList();
    that.nutritionValuesList();
  }


  ingredientList(){
    let that = this;
    this.selectedRecipe.ingredients.map( ingredient => {
      return $(".ingredient-control").append(`<li class="ingredient-layout"><b>${ingredient.amount*that.ratio} ${ingredient.unit}</b> ${this.filter.getIngredientName(ingredient.number)}</li>`);
    });
  }

  instructionList(){
    let that = this;
    Object.values(this.selectedRecipe.steps).map( instruction => {
      return $(".recipe").append(`<li class="recipe-layout">${instruction}</li>`);
    });
  }

  nutritionValuesList(){
    let that = this;
    let nutritionValues = this.nutrition.getNutritionValues(this.selectedRecipe.name);
    Object.keys(nutritionValues).map( key => {
      return $(".nutrition-control").append(`<li class="ingredient-layout"><span>${key}: </span><b>${(nutritionValues[key].split('g')[0]*that.ratio).toFixed(1)}g</b></li>`);
    });
  }
  
}