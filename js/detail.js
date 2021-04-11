function leaveComment(){
    const storageRef = firebase.storage().ref();
    storageRef.child('images/' + "test").put("123");

}