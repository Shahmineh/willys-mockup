class AddRecipe extends Base {
  constructor(recipes){
    super();
    this.ingredientCounter = 0;
    this.instructionCounter = 0;
    this.recipes = recipes;
    this.renderForm();
    this.eventHandler();
  }

  renderForm(){
    $('main').empty();
    this.render('main');
    this.addIngredient();
    this.addInstruction();
  }

  addIngredient(){
    let that = this;
    $( ".ingredients-outer" ).append(`
      <div class="ingredients d-flex">
        <i class="fas fa-times" id="remove-ingredient-btn"></i>
        <input type="text" class="form-control mr-2 ravara-input" id="ravara-input-${that.ingredientCounter}" placeholder="Råvara" required>
        <input type="text" class="form-control mr-2 amount-input" id="amount-input-${that.ingredientCounter}" placeholder="Mängd" required>
        <select class="select-button custom-select amount-select" id="amount-select-${that.ingredientCounter}" required>
          <option selected value="null">Mängd:</option>
          <option value="styck">styck</option>
          <option value="liter">liter</option>
          <option value="deciliter">deciliter</option>
          <option value="matsked">matsked</option>
          <option value="tesked">tesked</option>
          <option value="kryddmått">kryddmått</option>
        </select>
        <input type="text" class="form-control ml-2 gram-input" id="gram-input-${that.ingredientCounter}" placeholder="Gram" required>
      </div>
    `);
    that.ingredientCounter++;
  }

  addInstruction(){
    let that = this;
    $( ".how" ).append(`
      <div class="how-to">
        <i class="fas fa-times" id="remove-howto-btn"></i> 
        <p class="textnumber mr-2">${that.instructionCounter}</p>
        <div class="text-input">
          <textarea class="form-control-text" aria-label="With textarea" id="instructions-text-${that.instructionCounter}" required></textarea>
        </div>
      </div>
    `);
    that.instructionCounter++;
  }

  formValidation(recipe) {
    let that = this;
    const forms = document.getElementsByClassName('needs-validation');
    let validation = Array.prototype.filter.call(forms, function(form) {
      form.addEventListener('submit', function(event) {
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
        if(form.checkValidity() === true){
          JSON._save('recipe.json', [...that.recipes, recipe]);
        }
        form.classList.add('was-validated');
      }, false);
    });
  }

  eventHandler(){
    let that = this;
    //Add ingredient
    $(document).on('click', "#add-ingredient-btn", function() {
      that.addIngredient()
    });   
    //Remove ingredient
    $(document).on('click', '#remove-ingredient-btn', function(){
      $(this).parent('div.ingredients').remove();
      that.ingredientCounter--;
    });
    //add instruction
    $(document).on('click',  "#add-howto-btn" , function() {that.addInstruction()});   
    //Remove instruction
    $(document).on('click', '#remove-howto-btn', function(){
      $(this).parent('div.how-to').remove();
      that.instructionCounter--;
    });

    //  ALL VALIDATIONS NEED A BIT OF IMPROVEMENT, SPECIALLY VALIDATING BY DATA TYPE
    //Validation name
    $(document).on('keyup', '#recipe-name', function() {
      let val = $(this).val();
      if(val.length > 0){
        $(this).removeClass('is-invalid').addClass('is-valid');
      }
        else {
          $(this).addClass('is-invalid').removeClass('is-valid');    
      }
    }); 
    //Validation portions
    $(document).on('change', '.portions-select', function() {
      let val = $(this).val();
      if(val.length > 0){
        $(this).removeClass('is-invalid').addClass('is-valid');
      }
        else {
          $(this).addClass('is-invalid').removeClass('is-valid');    
      }
    }); 
    //Validation time
    $(document).on('keyup', '.time-input', function() {
      let val = $(this).val();
      if(val.length > 0){
        $(this).removeClass('is-invalid').addClass('is-valid');
      }
        else {
          $(this).addClass('is-invalid').removeClass('is-valid');    
      }
    }); 
    //Validation ingredient
    $(document).on('keyup', '.ravara-input', function() {
      let val = $(this).val();
      if(val.length > 0){
        $(this).removeClass('is-invalid').addClass('is-valid');

      }
      else {
        $(this).removeClass('is-valid').addClass('is-invalid');
      }
    });
    //Validation amount
    $(document).on('keyup', '.amount-input', function(){
      let val = $(this).val();
      if(val.length > 0){
        $(this).removeClass('is-invalid').addClass('is-valid');
      }
      else{
        $(this).removeClass('is-valid').addClass('is-invalid');
      }
    });
    //Validation unit
    $(document).on('change', '.amount-select', function() {
      let val = $(this).val();
      if(val !== 'null'){
        $(this).removeClass('is-invalid').addClass('is-valid');
      }
      else {
        $(this).removeClass('is-valid').addClass('is-invalid');        
      }
    });
    //Validation weight
    $(document).on('keyup', '.gram-input', function(){
      let val = $(this).val();
      if(val.length > 0){
        $(this).removeClass('is-invalid').addClass('is-valid');
      }
      else{
        $(this).removeClass('is-valid').addClass('is-invalid');
      }
    });

    //Submit
    $(document).on('click', '#submit-btn', function(){
      let ingredients = Array(that.ingredientCounter)
        .fill({})
        .reduce((acc, curr, index)=>{
          return [
            ...acc,
            {
              number: $(`#ravara-input-${index}`).val(),
              amount: $(`#amount-input-${index}`).val(),
              unit: $(`#amount-select-${index}`).val(),
              weight: $(`#gram-input-${index}`).val(),
            }
          ]
        },[]);

      let recipe = {
        name: $('#recipe-name').val(),
        time: $('#time-input').val(),
        portions: $('#portions-select').val(),
        description: 'Quisque ut dolor gravida, placerat libero vel, euismod.',
        ingredients: ingredients
      };
      that.formValidation(recipe);
    });
  }
}
