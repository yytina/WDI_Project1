var integerArray = [1,3,67,35,153,73,375];
var maxNum=0;
for (i=0;i<integerArray.length;i++){
	if (maxNum<integerArray[i]){
		maxNum=integerArray[i];
	}
}

console.log(maxNum);