////////////////////////////////////////////////////////////////////////////////////////////
// textToPicture
////////////////////////////////////////////////////////////////////////////////////////////

function TextToPicture(props) {

  const classes = props.classes;
  const text = props.text;
  const synonymArray = props.synonymArray;
  const direction = props.direction; //column | row
  const imageSize = "70px";
  const textSize = "h5"; // h1 to h9

  var myText = text;
  var myTextImage = text.toLowerCase();
  var isPluriel = false;

  if (myText.includes("[") && myText.endsWith("]")) {
    var myNewTextArrray = myText.split("[");
    myText = myNewTextArrray[0];
    myTextImage = myNewTextArrray[1];
    myTextImage = myTextImage.slice(0, -1);
    if (myTextImage.endsWith("X2")) {
      isPluriel = true;
      myTextImage = myTextImage.slice(0, -2);
    }
  }

  myText = myText.replace(/_/g," ");

  if (synonymArray.hasOwnProperty(myTextImage)) {
    myTextImage = synonymArray[myTextImage];
  }

  return (

    <Grid
  container
  direction={direction}
  justify="center"
  alignItems="center"
>
   <Box>
     <img src={"myImages\\"+myTextImage+".jpg"} height={imageSize}
     onError={(e)=>{e.target.src="myImages\\none.jpg";}}/>
     {isPluriel? (
       <img src={"myImages\\"+myTextImage+".jpg"} height={imageSize}
       onError={(e)=>{e.target.src="myImages\\none.jpg";}}/>
     ):(
       <div></div>
     )
     }
   </Box>
   <Box>
     <Typography variant={textSize} gutterBottom>
      {myText}
    </Typography>
   </Box>
  </Grid>

  )
};
