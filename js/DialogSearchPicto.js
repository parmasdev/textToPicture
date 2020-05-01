///////////////////////////////////////////////////////////////////////////////////////////
// DialogSearchPicto
////////////////////////////////////////////////////////////////////////////////////////////

function DialogSearchPicto(props) {

  const classes = props.classes;

   const { setIsDialogSearchOpen, isDialogSearchOpen,
      setTmpNewWordCallback, selectedWord, setSelectedWordCallback,
       manageWordCallback, ACTION } = props;

   const [pictoNameList, setPictoNameList] = React.useState([]);

   const [mySearchResult, setMySearchResult] = React.useState("");
   const [nbResult, setNbResult] = React.useState(0);

   ////////////////////////////////////////////////////////////////////////////
   // load picto dico
   ////////////////////////////////////////////////////////////////////////////
   function loadPictoArrayList(fileName) {

       var xhr = new XMLHttpRequest();
           xhr.open('GET', fileName, true);
           xhr.responseType = 'json';

           xhr.onload = function() {
               var status = xhr.status;

               if (status == 200) {
                 //console.log("xhr.response: ",xhr.response);
                 var json = xhr.response;
                 setPictoNameList(json);
               } else {
                   //no
               }
           };
           xhr.send();
   }

   if (pictoNameList.length==0) {
     loadPictoArrayList("pictoList.json");
   }

   ///////////////////////////////////////////////////////////
   // onTextChange
   //////////////////////////////////////////////////////////
   const giveSearchResultForText = function(textToSearch) {

     var result="";
     var nbResult=0;

     if (typeof textToSearch !== 'undefined' && textToSearch!="") {
       for (var i=0;i<pictoNameList.length;i++) {
         if (pictoNameList[i].toLowerCase().startsWith(textToSearch.toLowerCase()) ) {
           if (nbResult<10) {
              var tmpText = pictoNameList[i];
              tmpText=tmpText.replace(/_/g,"#");
              tmpText=tmpText.replace(/ /g,"_");
              result= result+(nbResult==0?"":" ")+tmpText;
            }
            nbResult=nbResult+1;
         }
       }
     }

     setNbResult(nbResult);
     setMySearchResult(result);
   };


   const handleClose = () => {
     setIsDialogSearchOpen(false);
     setNbResult(0);
     setMySearchResult("");
     setSelectedWordCallback("");
   };


  React.useEffect(() => {
    console.log("Search " + selectedWord);
    giveSearchResultForText(selectedWord);
  });


  ///////////////////////////////////////////////////////////
  // RENDER
  //////////////////////////////////////////////////////////
  return (

    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title"
     open={isDialogSearchOpen} style={{height: "600px"}}>
        <DialogTitle id="simple-dialog-title">
        Picto dico -
        {nbResult>0?
          <i>
            {(mySearchResult.split(" ")).length}/{nbResult}
          </i>:
        <i>
          0/{pictoNameList.length}
        </i>}
        </DialogTitle>

        <DialogContent dividers>
          <Grid container justify="center" alignItems="center" spacing={2}>

            <Grid item container xs={10}>

             {mySearchResult!="" &&
               <GridList className={classes.gridList} cols={1}>
                {mySearchResult.split(" ").map((work,index) =>
                      <GridListTile key={index} style={{ width: 'auto' }}
                      onClick={()=> {
                        setNbResult(0);
                        setMySearchResult("");
                        setSelectedWordCallback("");
                        manageWordCallback(ACTION.ADD,work);
                        setIsDialogSearchOpen(false);
                        }
                      }
                      >
                          <Paper className={classes.paper}>
                            <TextToPicture direction={"column"} synonymArray={[]}
                             classes={classes} text={work}/>
                          </Paper>
                      </GridListTile>
                 )}
                </GridList>
              }
              {mySearchResult!=""?"":"Pas de résultat"}

            </Grid>

          </Grid>
          </DialogContent>
          <DialogActions>
              <TextField
                id="outlined-basic"
                className={classes.textField}
                label="Ma recherche de picto"
                margin="normal"
                variant="outlined"
                value={selectedWord}
                onChange={(e)=> {
                    giveSearchResultForText(e.target.value);
                    setSelectedWordCallback(e.target.value);
                  }
                }
                tabIndex="0"
              />

            <Button variant="contained" color="primary"
            disabled={selectedWord==""}
            onClick={()=> {
                            setNbResult(0);
                            setMySearchResult("");
                            setSelectedWordCallback("");
                          }
                      }
            >
             Effacer
            </Button>
            &nbsp;
            <Button variant="contained" color="primary"
            disabled={selectedWord==""}
            onClick={()=> {
                            setIsDialogSearchOpen(false);
                          }
                      }
            >
             Cancel
            </Button>
          </DialogActions>
      </Dialog>

    )

    }
