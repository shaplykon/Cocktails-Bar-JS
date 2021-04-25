register =
    "<div class=\"auth-block\">\n" +
    "    <h1>Sign up</h1>\n" +
    "\n" +
    "    <form enctype=\"multipart/form-data\">\n" +
    "        <label for=\"login\">Login</label>\n" +
    "        <input type=\"text\" id=\"login\" name=\"login\" placeholder=\"Login\"/>\n" +
    "        <label for=\"password\">Password</label>\n" +
    "        <input type=\"password\" id=\"password\" name=\"password\" placeholder=\"Password\"/>\n" +
    "        <label for=\"repeat_password\">Repeat password</label>\n" +
    "        <input type=\"password\" id=\"repeat_password\" name=\"repeat_password\" placeholder=\"Repeat password\"/>\n" +
    "        <input type=\"checkbox\" id=\"rules_agreement\" name=\"agreement\" onclick=\"checkboxClicked()\"/>\n" +
    "        <label for=\"rules_agreement\" class=\"checkbox-label\">I agree with rules</label>\n" +
    "        <div class=\"auth-error\" id=\"errorField\"></div>\n" +
    "        <input type=\"button\" value=\"Sign up\" id=\"sign_button\" disabled onclick=\"registerFunction()\">\n" +
    "    </form>\n" +
    "</div>";