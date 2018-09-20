class App extends Base{
    constructor(){
        super();
        // Read data to our globals from json files
        this.livsmedelData;
        this.livsmedelDataIdHash = {};
        this.recipes;
        this.start();
        
        $.getJSON("/json/livsmedel.json", (data) => {
                this.livsmedelData = data;
                //filter the entire data to a smaller version
               
                // const nutritionNames = [
                //     'Kolhydrater',
                //     'Protein',
                //     'Salt',
                //     'Fett',
                //     'Summa mättade fettsyror',
                //     'Summa enkelomättade fettsyror',
                //     'Summa fleromättade fettsyror'
                // ];
                // const hashMap = data.reduce((acc, curr) => {
                //     console.log(curr.Naringsvarden.Naringsvarde.filter(el => nutritionNames.includes(el.Namn)));
                //     // return {
                //     //     ...acc,
                //     //     [curr.Nummer]: {
                //     //         id: curr.Nummer,
                //     //         facts: curr.Naringsvarden.Naringsvarde
                //     //             .filter()
                //     //             .map()
                //     //     },
                //     // }
                // }, {});
                // console.log(hashMap);

                this.createIdHashForLivsmedelData();
                $.getJSON('/json/recipe.json', (data) => {
                    this.recipes = data;
                    this.runTest();
                    let addRecipe = new AddRecipe(this.recipes);    
                })
            }
        );
        
    }

    navigation(){
        let navbar = new Navbar();
        $('header').empty();
        navbar.render('header');
        // get the current url
        let url = location.pathname;
        
        if (url == '/') {
            let startsidan = new Startsidan(this);
            $('main').empty();
            startsidan.render('main');
        }
        if (url == '/recept') {
            let recipe = new Recipe();
            $('main').empty();
            recipe.render('main');
        }
        if (url == '/huvudkategori') {
            $('main').empty();
            $('main').html(
                `<h1>${url}</h1>
                <h2>HTML/Render method here</h2>`
            );
        }
        if (url == '/maltid') {
            $('main').empty();
            $('main').html(
                `<h1>${url}</h1>
                <h2>HTML/Render method here</h2>`
            );
        }
        if (url == '/ingrediens') {
            $('main').empty();
            $('main').html(
                `<h1>${url}</h1>
                <h2>HTML/Render method here</h2>`
            );            
        }
        if (url == '/specialkost') {
            $('main').empty();
            $('main').html(
                `<h1>${url}</h1>
                <h2>HTML/Render method here</h2>`
            );            
        }
        if (url == '/varldens-mat') {
            $('main').empty();
            $('main').html(
                `<h1>${url}</h1>
                <h2>HTML/Render method here</h2>`
            );            
        }
        if (url == '/addrecipe') {
            let addRecipe = new addRecipe();
            $('main').empty();
            addRecipe.render('main');
        }
    }

    clickEvents(){
        let that = this;
        //Add item
        $(document).on("click", '#btn-add-allTasks', function() {
            item.addItem(currentTab);
        });
        //Navigation
        $(document).on('click','a.nav-btn',function(e){
            //Create a push state preventDefault
            let href = $(this).attr('href');
            history.pushState(null, null, href);
            //Call the change page function
            that.navigation();
            //Stop the browers from starting a page reload
            e.preventDefault();
        });
    }



    // re-writes livesmedeldata for easier filtering
    createIdHashForLivsmedelData(){
        for(let livsmedel of this.livsmedelData){
            this.livsmedelDataIdHash[livsmedel.Nummer] = livsmedel;
        }
    }
    
    runTest(){

        const test = new NutritionValues(this.livsmedelDataIdHash, this.recipes);
        // console.log(test.getNutritionValues('Omlett - Enkelt recept'));
        // console.log(test.getNutritionValues('Pam'));
        // test.getNutritionValues('Pamlet');
        // console.log(test.getNutritionValues('Omlett - Enkelt recept'));
    }

    start(){
        let navbar = new Navbar();
        // let recipe = new Recipe();
        $('header').empty();
        navbar.render('header');
        // recipe.render('header');
        //addRecipe.render('main');
    }

    
}