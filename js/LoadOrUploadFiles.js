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

  const options = myExistingBook.map(book => (
      <MenuItem key={book.name} value={book.url}>{book.name}</MenuItem>
      ));

  const [state, setState] = React.useState({
        checkedA: false,
      });

  const handleChange = name => event => {
        setState({ ...state, [name]: event.target.checked });
      };

  return (

    <Grid container spacing={3}>

    <Grid item xs={2}>
      &nbsp;
    </Grid>

      <Grid item container justify="center" item xs={4}>
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

      <Grid item container justify="flex-end" item xs={1}>
        <Switch
          checked={state.checkedA}
          onChange={handleChange('checkedA')}
          value="checkedA"
          inputProps={{ 'aria-label': 'secondary checkbox' }}
        />
      </Grid>
      <Grid item container justify="flex-start" item xs={3}>
        {state.checkedA? (
          <FileUpload classes={classes} fileName={fileName}
          onClick={onClick} onChange={onChangeUploadFile} />
        ) : (
          <div></div>
        )

        }
      </Grid>

      <Grid item xs={2}>
        &nbsp;
      </Grid>

    </Grid>
  );
}
