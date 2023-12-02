async function getFirstIntInString(string)
{
  var firstInt = null;
  string.split("").forEach((char) => {
    if( char >= '0' && char <= '9' && firstInt == null){
      firstInt = char;
    }
  })
  return firstInt;
}

function reverseString(string)
{
  return string.split("").reverse().join("");
}

function concatInts(int1, int2)
{
  const concatInt = Number('' + int1 + int2);
  return concatInt;
}

async function processElement(element) {
  var firstInt = await getFirstIntInString(element);
  var lastInt = await getFirstIntInString(reverseString(element));
  var concatInt = concatInts(firstInt, lastInt);
  return concatInt;
}

async function getInputFromFile(filename)
{
  try {
    const response = await fetch('/readFromTxt?filename='+filename, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    var json = JSON.parse(JSON.stringify(await response.json()));
    var inputLines = json["input"].split('\n');
    var total = 0;

    var results = await Promise.all(inputLines.map(processElement));
    total = results.reduce((acc, value) => acc + value, 0);

    document.getElementById("output").innerHTML=total; 
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}