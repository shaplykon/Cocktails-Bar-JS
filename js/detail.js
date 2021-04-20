function leaveComment(){
    let commentText = document.getElementById("comment").value;
    let author = auth.currentUser.email;
    let comment = new Comments(author, commentText, new Date());
    let cocktailId = getParams('id');
    cocktailStorage.addComment(cocktailId, comment);

    document.getElementById("comment").value = "";

    populateComments(cocktailId).then(r => {});
}

async function populateDetail(id){


    let cocktail = await cocktailStorage.getCocktail(id);

    let name = cocktail.name;
    let description = cocktail.description;

    let descriptionDiv = document.getElementById("description");
    let nameDiv = document.getElementById("name-label");
    let valueDiv = document.getElementById("value-label");
    let ingredientsDiv = document.getElementById("ingredients-section");
    let infoDiv = document.getElementById("info-section");

    descriptionDiv.innerHTML = description;
    nameDiv.innerHTML = name;
    valueDiv.innerHTML = "Value: " + cocktail.value + " ml";
    for(let i = 0; i < cocktail.ingredients.length; i++){
        let ingredient = document.createElement("p");
        ingredient.innerHTML = cocktail.ingredients[i].name + " : " + cocktail.ingredients[i].value + "ml";
        ingredientsDiv.appendChild(ingredient);
    }

    let author = document.createElement("p");
    author.innerHTML = "Author : " + cocktail.addedBy;
    infoDiv.appendChild(author);

    let date = document.createElement("p");
    date.innerHTML = "Date : " + cocktail.createDate;
    infoDiv.appendChild(date);

    await populateComments(id);
}

async function populateComments(cocktailId) {
    let rootDiv = document.getElementById("root");
    let prevCommentsDiv = document.getElementById("comments");

    let cocktail = await cocktailStorage.getCocktail(cocktailId);

    let comments = cocktail.comments;

    let commentsList = [];

    for(let commentId in comments){
        commentsList.push({id: commentId, author: comments[commentId].author, text: comments[commentId].text, date: comments[commentId].date} );
    }

    commentsList.reverse();

    if (commentsList.length > 0) {
        let commentsDiv = document.createElement("div");
        commentsDiv.classList.add("comments");
        commentsDiv.id = "comments";
        let commentsTitleDiv = document.createElement("h3");
        commentsTitleDiv.classList.add("title-comments");
        commentsTitleDiv.innerText = "Comments: " + commentsList.length;

        commentsDiv.appendChild(commentsTitleDiv);


        for (let i = 0; i < commentsList.length; i++) {
            let commentDiv = document.createElement("div");
            commentDiv.classList.add("comment");

            let imageDiv = document.createElement("img");
            imageDiv.src = "http://www.gravatar.com/avatar/" + MD5(commentsList[i].author) +
                "?d=https://www.freeiconspng.com/uploads/flat-face-icon-23.png";

            let authorDiv = document.createElement("div");
            authorDiv.classList.add("author");
            authorDiv.innerHTML = commentsList[i].author

            let dataDiv = document.createElement("div");
            dataDiv.classList.add("metadata");

            let dateDiv = document.createElement("span");
            dateDiv.classList.add("time");
            dateDiv.innerHTML = "Date: " + commentsList[i].date;
            dataDiv.appendChild(dateDiv);

            let commentTextDiv = document.createElement("div");
            commentTextDiv.classList.add("comment-text");
            commentTextDiv.innerHTML = commentsList[i].text;

            commentDiv.appendChild(imageDiv);
            commentDiv.appendChild(authorDiv);
            commentDiv.appendChild(dataDiv);

            if(auth.currentUser !== null){
                if (auth.currentUser.email === commentsList[i].author){
                    let deleteDiv = document.createElement("button");
                    deleteDiv.classList.add("delete-comment");
                    deleteDiv.addEventListener("click",
                        function() { deleteComment(cocktailId,commentsList[i].id); }, false);
                    deleteDiv.innerHTML = "Delete";
                    commentDiv.appendChild(deleteDiv);
                }
            }
            commentDiv.appendChild(commentTextDiv);
            commentsDiv.appendChild(commentDiv);

        }
        if(prevCommentsDiv !== null){
            rootDiv.removeChild(prevCommentsDiv);
        }
        rootDiv.appendChild(commentsDiv);
    }
}

function deleteComment(cocktailId, commentId){
    cocktailStorage.deleteComment(cocktailId, commentId)
        .then(() => populateComments(cocktailId));
}



