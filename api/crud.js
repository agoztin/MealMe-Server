const Meal = require("./../src/Meal.model");

const search = async(str) => {
    meals = await Meal.find({ strMeal: new RegExp(str, 'i') }).limit(50).exec();
    return meals;
};

const getAll = async () => {
    meals = await Meal.find();
    // await Meal.deleteMany({ strMeal: "Asado" });
    return meals;
};

const count = async() => {
    return await Meal.count();
}

const addOne = async (mealArray) => {
    if (!Array.isArray(mealArray)) {
        throw "That isn't an array!";
    }

    var meal = null;

    for (mealIndex in mealArray) {
        meal = mealArray[mealIndex];
        // First search by idMeal
        let mealFound = await Meal.findOne({ idMeal: meal.idMeal })
        // Second, search by strMeal
        if (!mealFound) {
            mealFound = await Meal.findOne({ strMeal: meal.strMeal })
        } else {
            console.log("Meal with idMeal: " + meal.idMeal + " already exists");
        }

        if (!mealFound) {
            if (meal.idMeal == null || meal.idMeal == 0) {
                let lastMeal = await Meal.find().sort({ idMeal:-1 }).limit(1);
                meal.idMeal = lastMeal[0].idMeal + 1;
            }
            newMeal = new Meal(meal);
            await newMeal.save();
            console.log(`Meal ${meal.idMeal} added!`);
            meal = newMeal;
        } else {
            console.log("Meal with strMeal: \"" + meal.strMeal + "\" already exists");
        }
    }

    return { meals: [meal] };
};

const clear = async() => {
    // WARNING!!! THIS DELETE EVERYTHING!
    result = await Meal.deleteMany();
    return result;
};

module.exports = { search, getAll, count, addOne, clear };