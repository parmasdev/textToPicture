////////////////////////////////////////////////////////////////////////////////////////////
// FileUpload
////////////////////////////////////////////////////////////////////////////////////////////

function FileUpload(props) {

  const classes = props.classes;
  const fileName =props.fileName;
  const onClick = props.onClick;
  const onChange = props.onChange;

  return (

    <FormControl>
      <Grid item container direction="row" justify="space-around" alignItems="stretch">
        <input type="file" style={{ display: 'none' }} id="fileInput" onChange={e=> {
        onChange(e, onChange);
        }} />

        <Typography variant="h6" gutterBottom onClick={(event)=> onClick(event)}>
          {"Charger livre:"}
        </Typography>

        <Button className={classes.button} color="default"
        label='My Label' onClick={(event)=> onClick(event)}>
          < Icon className={classes.rightIcon}>file_upload</Icon>
        </Button>

        ({fileName})

      </Grid>
    </FormControl>


  );
}
