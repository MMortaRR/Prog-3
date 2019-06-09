var fs = require('fs');
var obj =
{
    "firstName":"Gev",
    "lastName":"Panosyan",
    "age":14,
    "tumo_student":true
}
function main(){
    var newObj = JSON.stringify(obj);
    fs.writeFileSync("obj.json",newObj);
}
main();