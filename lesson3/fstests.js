var fs = require('fs');
var obj =
{
    "firstName":"Edgar",
    "lastName":"Gharagyozyan",
    "age":14,
    "tumo_student":true
}
function main(){
    var newObj = JSON.stringify(obj);
    fs.writeFileSync("obj.json",newObj);
}
main();