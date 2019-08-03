const cafeList = document.querySelector('#cafe-list');

// create element & render cafe
function renderCafe(doc) {
    let li = document.createElement('li');
    let name = document.createElement('span');
    let city = document.createElement('span');

    li.setAttribute('data-id', doc.id);
    name.textContent = doc.data().name;
    city.textContent = doc.data().city;

    li.appendChild(name);
    li.appendChild(city);

    cafeList.appendChild(li);
}

// getting data
db.collection('cafes').get().then(function (snapshot) {
    snapshot.docs.forEach(function(doc){
        renderCafe(doc);
    });
});

//db.collection("cafes").add({
//    name: "Live's mocha",
//    city: "Liveland",
//    like: 1815
//})
//.then(function (docRef) {
//    console.log("Document written with ID: ", docRef.id);
//})
//.catch(function (error) {
//    console.error("Error adding document: ", error);
//});