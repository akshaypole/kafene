var filter_options = document.getElementById("filter-options");
var k;

const userAction = async () => {
    const response = await fetch('https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/orders');
    const myJson = await response.json(); //extract JSON from the http response
    // do something with myJson
    k=myJson.length;
    var p_count = document.createElement('p');
    p_count.className = "counter";
    p_count.innerHTML = "Count: " + k;
    filter_options.appendChild(p_count);

    var new_orders = document.createElement('label');
    new_orders.className = "home-page-filter-checkbox";
    var new_orders_checkbox = document.createElement('input');
    new_orders_checkbox.type = "checkbox";
    new_orders_checkbox.name = "orders-packed";
    new_orders_checkbox.checked = "true";
    new_orders.appendChild(new_orders_checkbox);
    var span_element = document.createElement('span');
    span_element.className = "span-element";
    span_element.innerHTML = "New";
    new_orders.appendChild(span_element);
    filter_options.appendChild(new_orders);

    

    var packed_orders = document.createElement('label');
    packed_orders.className = "home-page-filter-checkbox";
    var packed_orders_checkbox = document.createElement('input');
    packed_orders_checkbox.type = "checkbox";
    packed_orders_checkbox.name = "orders-packed";
    packed_orders_checkbox.checked = "true";
    packed_orders.appendChild(packed_orders_checkbox);
    var span_element = document.createElement('span');
    span_element.className = "span-element";
    span_element.innerHTML = "Packed";
    packed_orders.appendChild(span_element);
    filter_options.appendChild(packed_orders);

    var intransit_orders = document.createElement('label');
    intransit_orders.className = "home-page-filter-checkbox";
    var intransit_orders_checkbox = document.createElement('input');
    intransit_orders_checkbox.type = "checkbox";
    intransit_orders_checkbox.name = "orders-packed";
    intransit_orders_checkbox.checked = "true";
    intransit_orders.appendChild(intransit_orders_checkbox);
    var span_element = document.createElement('span');
    span_element.className = "span-element";
    span_element.innerHTML = "InTransit";
    intransit_orders.appendChild(span_element);
    filter_options.appendChild(intransit_orders);

    var delivered_orders = document.createElement('label');
    delivered_orders.className = "home-page-filter-checkbox";
    var delivered_orders_checkbox = document.createElement('input');
    delivered_orders_checkbox.type = "checkbox";
    delivered_orders_checkbox.name = "orders-packed";
    delivered_orders_checkbox.checked = "true";
    delivered_orders.appendChild(delivered_orders_checkbox);
    var span_element = document.createElement('span');
    span_element.className = "span-element";
    span_element.innerHTML = "Delivered";
    delivered_orders.appendChild(span_element);
    filter_options.appendChild(delivered_orders);

    json2Table(myJson);

    
packed_orders_checkbox.addEventListener('change',function(){
    if(packed_orders_checkbox.checked == false){
        var lowStock = myJson.filter(function(mJson){
            return mJson.orderStatus !== "Packed";
        });
        json2Table(lowStock);
        p_count.innerHTML = "Count: " + lowStock.length;
    }else{
        json2Table(myJson);
        p_count.innerHTML = "Count: " + myJson.length;
    }
});

new_orders_checkbox.addEventListener('change',function(){
    if(new_orders_checkbox.checked == false){
        var lowStock = myJson.filter(function(mJson){
            return mJson.orderStatus !== "New";
        });
        json2Table(lowStock);
        p_count.innerHTML = "Count: " + lowStock.length;
    }else{
        json2Table(myJson);
        p_count.innerHTML = "Count: " + myJson.length;
    }
});

intransit_orders_checkbox.addEventListener('change',function(){
    if(intransit_orders_checkbox.checked == false){
        var lowStock = myJson.filter(function(mJson){
            return mJson.orderStatus !== "InTransit";
        });
        json2Table(lowStock);
        p_count.innerHTML = "Count: " + lowStock.length;
    }else{
        json2Table(myJson);
        p_count.innerHTML = "Count: " + myJson.length;
    }
});

delivered_orders_checkbox.addEventListener('change',function(){
    if(delivered_orders_checkbox.checked == false){
        var lowStock = myJson.filter(function(mJson){
            return mJson.orderStatus.localeCompare("Delivered");
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

            
            //tr = table.insertRow(-1);
            tr = new_tbody.insertRow(-1);
            if((i % 2) == 0)
                tr.className = "OrderTable ExpiredRow";
            else
                tr.className = "OrderTable";
            for (var j = 0; j < col.length; j++) {
                if(j!=3){
                    var tabCell = tr.insertCell(-1);
                    if(j==2){
                        tabCell.innerHTML = myJson[i][col[j]] +" " +myJson[i][col[j+1]];
                    }
                    else if(j==4)                    
                        tabCell.innerHTML = "$" + myJson[i][col[j]];
                    else
                        tabCell.innerHTML = myJson[i][col[j]];
                }
            }
        }


}


