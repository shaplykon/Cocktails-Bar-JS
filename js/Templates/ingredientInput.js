ingredientInput = "<div class=\"flex-ingredient-wrap\">\n" +
    "     <select class=\"ingredients-select\" name=\"ingredients-select\" onchange=\"recalculateImage();\">\n" +
    "       <option value=\"espresso\">Espresso</option>\n" +
    "       <option value=\"water\">Water</option>\n" +
    "       <option value=\"milk\">Milk</option>\n" +
    "       <option value=\"milk-foam\">Milk foam</option>\n" +
    "       <option value=\"chocolate\">Chocolate</option>\n" +
    "       <option value=\"honey\">Honey</option>\n" +
    "       <option value=\"syrup\">Syrup</option>\n" +
    "       <option value=\"whipped-cream\">Whipped cream</option>\n" +
    "       <option value=\"liquor\">Liquor</option>\n" +
    "       <option value=\"whiskey\">Whiskey</option>\n" +
    "     </select>\n" +
    "     <input class=\"ingredient-value-input\" type=\"number\" name=\"ingredient-value\" value=\"\" placeholder=\"%\" oninput=\"recalculateImage();\" required>\n" +
    "     <button class=\"remove-ingredient-button\" type=\"button\" name=\"remove-ingredient-button\" onclick=\"removeIngredient();\"><i class=\"fa fa-minus\"></i></button>\n" +
    "  </div>"