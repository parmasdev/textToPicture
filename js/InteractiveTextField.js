///////////////////////////////////////////////////////////////////////////////////////////
// InteractiveTextField
////////////////////////////////////////////////////////////////////////////////////////////

function InteractiveTextField(props) {

  const ACTION = {
    NONE: "none",
    RESETPOS: "resetPos",
    ADDSYN: "addSyn",
    UPSYN: "upSyn",
    DOWNSYN: "downSyn"
  }

  const classes = props.classes;
  const text = props.text;
  const setTextCallback=props.setTextCallback;
  const isButtonCleanVisible=props.isButtonCleanVisible;
  const bookData = props.bookData;

  const inputRef = React.useRef();

  const [isWordSelected, setIsWordSelected] = React.useState(false);
  const [isSyn, setIsSyn] = React.useState(false);
  const [isSyndown, setIsSyndown] = React.useState(false);
  const [isSynUp, setIsSynUp] = React.useState(false);

  const [isCurrentCurPos, setIsCurrentCurPos] = React.useState(text.length);

  //////////////////////////////////////////////////////////
  // selected word
  /////////////////////////////////////////////////////////
  const manageWord = function(action, optionalText) {

  var curPos = isCurrentCurPos;

  if (typeof inputRef.current !== 'undefined' && action==ACTION.RESETPOS) {
    curPos = inputRef.current.selectionStart;
    setIsCurrentCurPos(curPos);
  }

  var words = text.split(' ');

  if (typeof optionalText !== 'undefined') {
    words = optionalText.split(' ');
  }

  var currentSize = 0;
  var sectionBeforeWord="";
  var sectionAfterWord="";
  var manageWord = "";
  var isSyn = false;

  for (var i=0;i<words.length;i++) {
    var word=words[i];
    currentSize = currentSize + word.length+1;
    if (currentSize>curPos && manageWord=="") {
      manageWord = word;
      if (manageWord.includes("[")) {
        isSyn = true;
      }
    } else {
      if (manageWord=="") {
          sectionBeforeWord = sectionBeforeWord + (sectionBeforeWord==""?"":" ")+word;
      } else {
          sectionAfterWord = sectionAfterWord + " " + word;
      }
    }
  }

  if (manageWord=="" && !text.endsWith(" ")) {
    manageWord=words[words.length];
  }

  console.log("Avant mot =>> "+sectionBeforeWord);
  console.log("Le mot =>> "+manageWord);
  console.log("Apres mot =>> "+sectionAfterWord);


    if (typeof manageWord !== 'undefined') {

      if (action == ACTION.ADDSYN) {
        var newText = sectionBeforeWord + (sectionBeforeWord==""?"":" ") + manageWord
              +"["+manageWord+"]" + sectionAfterWord;
        setTextCallback(newText);
        }

        if (action == ACTION.UPSYN) {

          var newWords = manageWord.split("[");

          if (newWords.length>0) {

            var newWord = newWords[1];
            newWord = newWord.replace("]","");

            console.log("newWord ==> ",newWord);

            if (!newWord.includes("_")) {
              newWord = newWords[0]+ "[" + newWord+"_1]";
            } else {
              var word_nb = newWord.split("_");
              var nb=word_nb[1];
              if(Number.isInteger(nb)) {
                nb=1;
              }
              newWord = newWords[0]+ "[" + word_nb[0]+"_"+(parseInt(nb)+1) + "]";
            };

            var newText = sectionBeforeWord + (sectionBeforeWord==""?"":" ") + newWord + sectionAfterWord;
            setTextCallback(newText);
            isSyn=false;
          };

      }

      if (action == ACTION.DOWNSYN) {

        var newWords = manageWord.split("[");

        if (newWords.length>0) {

          var newWord = newWords[1];
          newWord = newWord.replace("]","");

          console.log("newWord ==> ",newWord);

          if (newWord.includes("_")) {
            var word_nb = newWord.split("_");
            var nb=word_nb[1];
            if(Number.isInteger(nb)) {
              nb=1;
            }
            if (nb==1) {
              newWord = newWords[0]+ "[" + word_nb[0]+ "]";
            } else {
              newWord = newWords[0]+ "[" + word_nb[0]+"_"+(parseInt(nb)-1) + "]";
            }
          } else {
            newWord = newWords[0];
          }

          var newText = sectionBeforeWord + (sectionBeforeWord==""?"":" ") + newWord + sectionAfterWord;
          setTextCallback(newText);
          //inputRef.current.focus();
          isSyn=false;
        };

    }

      if (isSyn) {
        setIsSyn(false);
        setIsSyndown(true);
        setIsSynUp(true);
      } else {
        setIsSyn(true);
        setIsSyndown(false);
        setIsSynUp(false);
      }

    } else {
      setIsSyn(false);
      setIsSyndown(false);
      setIsSynUp(false);
    }

}

  //////////////////////////////////////////////////////////
  // handleTextValueChange
  const handleTextValueChange = function(event) {
    //console.log("InteractiveTextField::handleTextValueChange");
    var newText = event.target.value;
    newText = newText.replace(/  /g," "); // 2 time change cur pos??
    setTextCallback(newText);
    manageWord(ACTION.RESETPOS, newText);

  };


  //////////////////////////////////////////////////////////
  // handleClickText
  const handleClickText = function(event) {
    //console.log("InteractiveTextField::handleCickText");
    manageWord(ACTION.RESETPOS);
  };

  //////////////////////////////////////////////////////////
  // onKeyPressed
  const onKeyPressed = function(event) {
    console.log("InteractiveTextField::onKeyPressed");
    manageWord(ACTION.RESETPOS);
  };

  React.useEffect(() => {
    console.log("define !!!");
    manageWord();
    if (typeof inputRef.current !== 'undefined') {
      inputRef.current.selectionStart = isCurrentCurPos;
      //inputRef.current.selectionEnd = isCurrentCurPos;
    }
  });

  return (

    <Grid container justify="center" alignItems="center">

      <TextField
        id="outlined-basic"
        fullWidth
        className={classes.textField}
        label="Mon texte"
        margin="normal"
        inputRef={inputRef}
        variant="outlined"
        value={text}
        onChange={(e)=> handleTextValueChange(e)}
        onClick={(e)=> handleClickText(e)}
        onKeyDown={(e)=> onKeyPressed(e)}
        tabIndex="0"
      />

      {isButtonCleanVisible &&
        <Button variant="contained" color="primary"
        disabled={text==""}
        onClick={()=> setTextCallback("")}
        >
         Effacer
      </Button>
    }
    &nbsp;
    {isSyn &&
      <Chip
        icon={<Icon>add_circle</Icon>}
        label="Syn"
        onClick={(e) => manageWord(ACTION.ADDSYN)}
      />
    }
    {isSynUp &&
      <Chip
        icon={<Icon>add_circle</Icon>}
        label="Syn"
        onClick={(e) => manageWord(ACTION.UPSYN)}
      />
    }
    {isSyndown &&
      <Chip
        icon={<Icon>remove_circle</Icon>}
        label="Syn"
        onClick={(e) => manageWord(ACTION.DOWNSYN)}
      />
    }
    </Grid>

)

}
