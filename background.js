chrome.runtime.onInstalled.addListener(()=>{
    $.ajax({
        type: "POST",
        url: "http://localhost:5000/products",
        data: { testData: "Hi i am the test data from the ajax post request call" },
        success: function(response){
            console.log(response.data);
        }
    });
})