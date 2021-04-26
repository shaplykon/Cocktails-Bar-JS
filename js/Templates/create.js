create = "<!DOCTYPE html>\n" +
    "<div class=\"anchor\"></div><form class=\"create-cocktail-form\" onsubmit=\"submitForm(); return false;\">\n" +
    "    <div class=\"cocktail-form-block\">\n" +
    "        <div class=\"cocktail-form-left\">\n" +
    "            <label for=\"cocktail-name\"></label>\n" +
    "            <input type=\"text\" id=\"cocktail-name\" name=\"cocktail-name\" value=\"\" placeholder=\"Name\" required=\"\">\n" +
    "            <br>\n" +
    "            <label for=\"cocktail-value\">Value:</label>\n" +
    "            <input type=\"number\" id=\"cocktail-value\" name=\"cocktail-value\" value=\"\" placeholder=\"ml\" required=\"\">\n" +
    " <div class=\"file-form-wrap\">\n" +
    "                <div class=\"file-upload\">\n" +
    "                    <label>\n" +
    "                        <input id=\"uploaded-file1\" type=\"file\" name=\"file\" onchange=\"getFileParam();\" />\n" +
    "                        <span>Choose file</span><br />\n" +
    "                    </label>\n" +
    "                </div>\n" +
    "                <div id=\"preview1\">&nbsp;</div>\n" +
    "                <div id=\"file-size1\">&nbsp;</div>\n" +
    "            </div>" +
    "            <label for=\"description-textarea\"></label>\n" +
    "            <textarea id=\"description-textarea\" name=\"name\" rows=\"3\" placeholder=\"Description\" required=\"\"></textarea>\n" +
    "        </div>\n" +
    "        <div class=\"cocktail-form-right\">\n" +
    "            <div class=\"add-ingredients-section\">\n" +
    "                <ul class=\"ingredients-select-list\">\n" +
    "                    <div class=\"ingredient-select-list-item\">\n" +
    "                        <div class=\"flex-ingredient-wrap\">\n" +
    "                            <select class=\"ingredients-select\" name=\"ingredients-select\">\n" +
    "                                <option value=\"water\">Water</option>\n" +
    "                                <option value=\"honey\">Honey</option>\n" +
    "                                <option value=\"syrup\">Syrup</option>\n" +
    "                                <option value=\"whipped-cream\">Whipped cream</option>\n" +
    "                                <option value=\"liquor\">Liquor</option>\n" +
    "                                <option value=\"whiskey\">Whiskey</option>\n" +
    "                            </select>\n" +
    "                                <input class=\"ingredient-value-input\" type=\"number\" name=\"ingredient-value\" value=\"\" placeholder=\"%\" required=\"\">\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </ul>\n" +
    "                <button id=\"add-ingredient-button\" type=\"button\" name=\"add-ingredient-button\" onclick=\"addIngredient();\"><i class=\"fa fa-plus\" aria-hidden=\"true\"></i>\n" +
    "                </button>\n" +
    "            </div>\n" +
    "            <button class=\"submit-button\" id=\"create-button\" name=\"create-button\">CREATE</button>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</form>\n" +
    "</body>\n" +
    "</html>";