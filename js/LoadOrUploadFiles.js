////////////////////////////////////////////////////////////////////////////////////////////
// LoadOrUploadFiles
////////////////////////////////////////////////////////////////////////////////////////////

function LoadOrUploadFiles(props) {

  const classes = props.classes;
  const fileName =props.fileName;
  const onClick = props.onClick;
  const onChangeFileName = props.onChangeFileName;
  const onChangeUploadFile = props.onChangeUploadFile;
  const myExistingBook = props.myExistingBook;

  const updateIsLocalFileCbOptional = props.updateIsLocalFileCbOptional; // optional

  const options = myExistingBook.map(book => (
      <MenuItem key={book.name} value={book.url}>{book.name}</MenuItem>
      ));

  const [state, setState] = React.useState({
        checkedA: false,
      });

  const handleChange = name => event => {
        setState({ ...state, [name]: event.target.checked });
        if (updateIsLocalFileCbOptional instanceof Function) {
          updateIsLocalFileCbOptional(event.target.checked);
        }
      };

  return (

    <Grid container spacing={3}>

    <Grid item xs={2}>
      &nbsp;
    </Grid>

    <Grid item container justify="flex-start" item xs={5}>
      {state.checkedA? (
        <FileUpload classes={classes} fileName={fileName}
        onClick={onClick} onChange={onChangeUploadFile} />
      ) : (
        <Grid item container justify="flex-start" item>
          <Typography variant="h6" gutterBottom>
            {"Choisi une histoire:"}
          </Typography>
          &nbsp;
          <FormControl className={classes.formControl}>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={fileName}
              onChange={onChangeFileName}
            >
            {options}
            </Select>
          </FormControl>
        </Grid>
      )

      }
    </Grid>

      <Grid item container justify="flex-end" item xs={2}>
          <Grid item container justify="flex-end" item>
            {state.checkedA? (
              <Typography variant="h7" gutterBottom>
                {"(online)"}
              </Typography>
            ):(
              <Typography color="secondary" variant="h7" gutterBottom>
                {"(online)"}
              </Typography>
            )
            }
            <Switch
              checked={state.checkedA}
              onChange={handleChange('checkedA')}
              value="checkedA"
              inputProps={{ 'aria-label': 'secondary checkbox' }}
            />
            {state.checkedA? (
              <Typography color="secondary" variant="h7" gutterBottom>
                {"(local)"}
              </Typography>
            ):(
              <Typography variant="h7" gutterBottom>
                {"(local)"}
              </Typography>
            )
            }
          </Grid>
      </Grid>

      <Grid item xs={3}>
        &nbsp;
      </Grid>

    </Grid>
  );
}
