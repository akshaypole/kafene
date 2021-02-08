

const userAction = async () => {
    const response = await fetch('https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/users'); 
    const myJson = await response.json(); 
   
    var table = document.getElementById("table_id");
    var new_tbody = table.getElementsByTagName('tbody')[0];
    new_tbody.innerHTML = "";
    var col = [];
          for (var i = 0; i < myJson.length; i++) {
              for (var key in myJson[i]) {
                  if (col.indexOf(key) === -1) {
                      col.push(key);
                  }
              }
          }
          
          
  
           for (var i = 0; i < myJson.length; i++) {
  
             tr = new_tbody.insertRow(-1);           
  
              for (var j = 0; j < col.length; j++) {
                  if(j!=5){
                      var tabCell = tr.insertCell(-1);
                      if(j==1){        
                          var img = document.createElement("img");
                          img.src = myJson[i][col[j]];
                          //tabCell.innerHTML = img;                         
                          tabCell.appendChild(img);
                      }
                      else if(j==6)
                          tabCell.innerHTML = myJson[i][col[j-1]] + ", " + myJson[i][col[j]];
                      else
                          tabCell.innerHTML = myJson[i][col[j]];
                  }
              }
          }
  
          
  }
  function mySearch() {
    //alert("in");
      // Declare variables
      var input, filter, table, tr, td, i, txtValue;
      input = document.getElementById("searchTxt");
      filter = input.value.toUpperCase();
      table = document.getElementById("table_id");
      tr = table.getElementsByTagName("tr");
    
      // Loop through all table rows, and hide those who don't match the search query
      for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[2];
        if (td) {
          txtValue = td.textContent || td.innerText;
          if (txtValue.toUpperCase().indexOf(filter) > -1) {
            tr[i].style.display = "";
          } else {
            tr[i].style.display = "none";
          }
        }
      }
    }
    