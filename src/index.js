function displayRecipe(response) {
  let recipeElement = document.getElementById("recipe");
  recipeElement.innerHTML = response.data.answer;
  recipeElement.classList.remove('hidden');
  recipeElement.classList.add('slide-in', 'visible');
}

function generateRecipe(event) {
  event.preventDefault();

  let instructionsInput = document.querySelector("#user-instructions");
  let recipeDiv = document.getElementById('recipe');

  recipeDiv.innerHTML = '';

  if (!instructionsInput.value.trim()) {
    recipeDiv.innerText = 'Please provide some instructions to generate a recipe.';
    recipeDiv.classList.remove('hidden');
    return;
  }

  let apikey = "edd71eate75a4ddb934d0ad77f69aeob"; 

  let context = 
    "You are a skilled chef known for creating simple and easy-to-follow recipes. Your task is to generate a recipe in basic HTML format. Make the recipe title bold using <strong></strong>, and list each step of the recipe inside an unordered list (<ul>) with each step inside a list item (<li>). Each step should be on its own row. List each ingredient on its own row. Do not include the html tag on the generated recipe. Do not include any unnecessary HTML tags. Sign the recipe at the bottom with 'Enjoy! 😜'. Ensure the recipe is clear and follows the user's instructions.";
    let prompt = `User instructions: Create a recipe for ${instructionsInput.value}`;
  let apiURL = `https://api.shecodes.io/ai/v1/generate?prompt=${prompt}&context=${context}&key=${apikey}`;
  
let recipeElement = document.querySelector("#recipe");
  recipeElement.classList.remove("hidden");
  recipeElement.innerHTML = `<div class="generating">⌛ Generating your ${instructionsInput.value} 🤤 recipe</div>`;

  console.log(`Generating recipe`);
  console.log(`Prompt: ${prompt}`);
  console.log(`Context: ${context}`);

  axios.get(apiURL)
    .then(displayRecipe)
    .catch(function (error) {
      console.error("Error generating recipe:", error);
      recipeDiv.innerText = 'Request failed. Please try again!';
      recipeDiv.classList.remove('hidden');
    });
}

let recipeFormElement = document.querySelector("#recipe-generator-form");
recipeFormElement.addEventListener("submit", generateRecipe);