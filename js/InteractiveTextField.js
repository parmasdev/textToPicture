///////////////////////////////////////////////////////////////////////////////////////////
// InteractiveTextField
////////////////////////////////////////////////////////////////////////////////////////////

function InteractiveTextField(props) {

  const ACTION = {
    NONE: "none",
    RESETPOS: "resetPos",
    ADDSYN: "addSyn",
    UPSYN: "upSyn",
    DOWNSYN: "downSyn",
    ADD: "add"
  }

  const classes = props.classes;
  const text = props.text;
  const setTextCallback=props.setTextCallback;
  const isButtonCleanVisible=props.isButtonCleanVisible;
  const bookData = props.bookData;

  const inputRef = React.useRef();

  const [isWordSelected, setIsWordSelected] = React.useState(false);
  const [selectedWord, setSelectedWord] = React.useState("");

  const [isSyn, setIsSyn] = React.useState(false);
  const [isSyndown, setIsSyndown] = React.useState(false);
  const [isSynUp, setIsSynUp] = React.useState(false);

  const [isCurrentCurPos, setIsCurrentCurPos] = React.useState(text.length);

  const [isDialogSearchOpen, setIsDialogSearchOpen] = React.useState(false);


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

  if (typeof optionalText !== 'undefined' && action != ACTION.ADD) {
    words = optionalText.split(' ');
  }

  var currentSize = 0;
  var sectionBeforeWord="";
  var sectionAfterWord="";
  var tmpSelectedManageWord = "";
  var isSyn = false;

  for (var i=0;i<words.length;i++) {
    var word=words[i];
    currentSize = currentSize + word.length+1;
    if (currentSize>curPos && tmpSelectedManageWord=="") {
      tmpSelectedManageWord = word;
      if (tmpSelectedManageWord.includes("[")) {
        isSyn = true;
      }
    } else {
      if (tmpSelectedManageWord=="") {
          sectionBeforeWord = sectionBeforeWord + (sectionBeforeWord==""?"":" ")+word;
      } else {
          sectionAfterWord = sectionAfterWord + " " + word;
      }
    }
  }

  if (tmpSelectedManageWord=="" && !text.endsWith(" ")) {
    tmpSelectedManageWord=words[words.length];
  }

  //console.log("Avant mot =>> "+sectionBeforeWord);
  //console.log("Le mot =>> "+tmpSelectedManageWord);
  //console.log("Apres mot =>> "+sectionAfterWord);


  if (typeof inputRef.current !== 'undefined' && action==ACTION.RESETPOS) {

    var newWords = (typeof tmpSelectedManageWord !== 'undefined'?
                              tmpSelectedManageWord.split("["):[]);

    if (newWords.length>1) {
      var newWord = newWords[1];
      newWord = newWord.replace("]","");
      setSelectedWord(newWord);
    } else {
      setSelectedWord(tmpSelectedManageWord);
    }
  }

  if (action == ACTION.ADD) {

    var newWords = (typeof tmpSelectedManageWord !== 'undefined'?
                              tmpSelectedManageWord.split("["):[]);

    if (newWords.length>1) {
      optionalText = newWords[0]+ "[" + optionalText+"]";
    }

    var newText = sectionBeforeWord + (sectionBeforeWord==""?"":" ")
    + optionalText + sectionAfterWord;
    setTextCallback(newText);
  }

    if (typeof tmpSelectedManageWord !== 'undefined') {

      if (action == ACTION.ADDSYN) {
        var newText = sectionBeforeWord + (sectionBeforeWord==""?"":" ") + tmpSelectedManageWord
              +"["+tmpSelectedManageWord+"]" + sectionAfterWord;
        setTextCallback(newText);
        }

        if (action == ACTION.UPSYN) {

          var newWords = tmpSelectedManageWord.split("[");

          if (newWords.length>0) {

            var newWord = newWords[1];
            newWord = newWord.replace("]","");

            if (!newWord.includes("#")) {
              newWord = newWords[0]+ "[" + newWord+"#1]";
            } else {
              var word_nb = newWord.split("#");
              var nb=word_nb[1];
              if(Number.isInteger(nb)) {
                nb=1;
              }
              newWord = newWords[0]+ "[" + word_nb[0]+"#"+(parseInt(nb)+1) + "]";
            };

            var newText = sectionBeforeWord + (sectionBeforeWord==""?"":" ") + newWord + sectionAfterWord;
            setTextCallback(newText);
            isSyn=false;
          };

      }

      if (action == ACTION.DOWNSYN) {

        var newWords = tmpSelectedManageWord.split("[");

        if (newWords.length>0) {

          var newWord = newWords[1];
          newWord = newWord.replace("]","");

          if (newWord.includes("#")) {
            var word_nb = newWord.split("#");
            var nb=word_nb[1];
            if(Number.isInteger(nb)) {
              nb=1;
            }
            if (nb==1) {
              newWord = newWords[0]+ "[" + word_nb[0]+ "]";
            } else {
              newWord = newWords[0]+ "[" + word_nb[0]+"#"+(parseInt(nb)-1) + "]";
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
    //console.log("InteractiveTextField::onKeyPressed");
    manageWord(ACTION.RESETPOS);
  };

  React.useEffect(() => {
    manageWord();
    if (typeof inputRef.current !== 'undefined') {
      inputRef.current.selectionStart = isCurrentCurPos;
      //inputRef.current.selectionEnd = isCurrentCurPos;
    }
  });


  //////////////////////////////////////////////////////////
  // RENDER
  //////////////////////////////////////////////////////////
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
  <Chip
      icon={<Icon>search</Icon>}
      label="Picto dico"
      onClick={(e) => setIsDialogSearchOpen(true)}
    />
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

    <DialogSearchPicto classes={classes}
     setIsDialogSearchOpen={setIsDialogSearchOpen}
      isDialogSearchOpen={isDialogSearchOpen}
      selectedWord={selectedWord}
      setSelectedWordCallback={setSelectedWord}
      ACTION={ACTION}
      manageWordCallback={manageWord}/>

    </Grid>

)

}
