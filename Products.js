var filter_options = document.getElementById("filter-options");
var k;
const userAction = async () => {
    const response = await fetch('https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/products');
    const myJson = await response.json(); //extract JSON from the http response
    // do something with myJson
    k=myJson.length;
    var p_count = document.createElement('p');
    p_count.className = "counter";
    p_count.innerHTML = "Count: " + k;
    filter_options.appendChild(p_count);

    
    var new_orders_checkbox = document.createElement('input');
    new_orders_checkbox.type = "checkbox";
    new_orders_checkbox.name = "orders-packed";
    new_orders_checkbox.checked = "true";
    var new_orders = document.createElement('label');
    new_orders.className = "home-page-filter-checkbox";
    new_orders.appendChild(new_orders_checkbox);
    var span_element = document.createElement('span');
    span_element.className = "span-element";
    span_element.innerHTML = "Expired";
    new_orders.appendChild(span_element);
    filter_options.appendChild(new_orders);

    json2Table(myJson);

    new_orders_checkbox.addEventListener('change', function(){

        
        if(new_orders_checkbox.checked == false){
            // var lowStock = myJson.filter(function(mJson){
                
                
            // });
            var new_date = new Date();
            var new_date2 = Date.parse(new_date);
            var d =[];
            for(var i =0;i<myJson.length;i++){
                var jsonDate = Date.parse(myJson[i].expiryDate);

                if(jsonDate > new_date2){
                    d.push(myJson[i]);
                }

            }
            console.log(d);
            json2Table(d);
            p_count.innerHTML = "Count: " + d.length;
        }else{
            json2Table(myJson);
            p_count.innerHTML = "Count: " + myJson.length;
        }

    });


    var packed_orders = document.createElement('label');
    packed_orders.className = "home-page-filter-checkbox";
    var packed_orders_checkbox = document.createElement('input');
    packed_orders_checkbox.type = "checkbox";
    packed_orders_checkbox.name = "orders-packed";
    packed_orders_checkbox.checked = "true";
    packed_orders.appendChild(packed_orders_checkbox);
    var span_element = document.createElement('span');
    span_element.className = "span-element";
    span_element.innerHTML = "Low Stock";
    packed_orders.appendChild(span_element);
    
    filter_options.appendChild(packed_orders);

    json2Table(myJson);

    packed_orders_checkbox.addEventListener('change', function(){
        if(packed_orders_checkbox.checked == false){
            var lowStock = myJson.filter(function(mJson){
                return mJson.stock > 100;
            });
            json2Table(lowStock);
            p_count.innerHTML = "Count: " + lowStock.length;
        }else{
            json2Table(myJson);
            p_count.innerHTML = "Count: " + myJson.length;
        }

    });

  }

  function json2Table(myJson){
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

        if((i % 2) == 0)
            tr.className = "OrderTable ExpiredRow";
        else
            tr.className = "OrderTable";

        for (var j = 0; j < col.length; j++) {
            if(j!=5){
                var tabCell = tr.insertCell(-1);
                if(j==0 || j==2 || j==4 || j==6)
                    tabCell.className = "SecondaryText";
                if(j==1 || j==3)
                    tabCell.className = "PrimaryText";
                
                if(j==4)                    
                    tabCell.innerHTML = "$" + myJson[i][col[j]];
                else
                    tabCell.innerHTML = myJson[i][col[j]];
            }
        }
    }
  }
