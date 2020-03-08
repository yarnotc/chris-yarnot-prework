let an_array= ["Steve","Carl","Sean"];
for(i= 0; i<3; i++){
  an_array.push(prompt("Give me a name"));
}
for(i= 0; i<an_array.length; i++){
	console.log("Name #"+i+" is "+an_array[i]);
}