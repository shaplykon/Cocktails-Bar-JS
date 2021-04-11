create = "<!DOCTYPE html>\n" +

    "<div class=\"anchor\"></div><form class=\"create-coffee-form\" onsubmit=\"submitForm(); return false;\">\n" +
    "    <div class=\"coffee-form-block\">\n" +
    "        <div class=\"coffee-form-left\">\n" +
    "\n" +
    "            <label for=\"coffee-name\"></label>\n" +
    "            <input type=\"text\" id=\"coffee-name\" name=\"coffee-name\" value=\"\" placeholder=\"Name\" required=\"\">\n" +
    "            <br>\n" +
    "            <label for=\"coffee-value\">Value:</label>\n" +
    "\n" +
    "            <input type=\"number\" id=\"coffee-value\" name=\"coffee-value\" value=\"\" placeholder=\"ml\" oninput=\"recalculateImage();\" required=\"\">\n" +
    "\n" +
    "            <label for=\"description-textarea\"></label>\n" +
    "            <textarea id=\"description-textarea\" name=\"name\" rows=\"3\" placeholder=\"Description\" required=\"\"></textarea>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"coffee-form-right\">\n" +
    "            <div class=\"add-ingredients-section\">\n" +
    "                <ul class=\"ingredients-select-list\">\n" +
    "                    <div class=\"ingredient-select-list-item\">\n" +
    "                        <div class=\"flex-ingredient-wrap\">\n" +
    "                            <select class=\"ingredients-select\" name=\"ingredients-select\" onchange=\"recalculateImage();\">\n" +
    "                                <option value=\"espresso\">Espresso</option>\n" +
    "                                <option value=\"water\">Water</option>\n" +
    "                                <option value=\"milk\">Milk</option>\n" +
    "                                <option value=\"milk-foam\">Milk foam</option>\n" +
    "                                <option value=\"chocolate\">Chocolate</option>\n" +
    "                                <option value=\"honey\">Honey</option>\n" +
    "                                <option value=\"syrup\">Syrup</option>\n" +
    "                                <option value=\"whipped-cream\">Whipped cream</option>\n" +
    "                                <option value=\"liquor\">Liquor</option>\n" +
    "                                <option value=\"whiskey\">Whiskey</option>\n" +
    "                            </select>\n" +
    "                                <input class=\"ingredient-value-input\" type=\"number\" name=\"ingredient-value\" value=\"\" placeholder=\"%\" oninput=\"recalculateImage();\" required=\"\">\n" +
    "\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </ul>\n" +
    "                <button id=\"add-ingredient-button\" type=\"button\" name=\"add-ingredient-button\" onclick=\"addIngredient();\"><i class=\"fa fa-plus\" aria-hidden=\"true\"></i>\n" +
    "                </button>\n" +
    "            </div>\n" +
    "\n" +
    "            <button class=\"submit-button\" id=\"create-button\" name=\"create-button\">CREATE</button>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</form>\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "</body>\n" +
    "\n" +
    "</html>";