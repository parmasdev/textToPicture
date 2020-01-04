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
      <div>
        <input type="file" style={{ display: 'none' }} id="fileInput" onChange={e=> {
        onChange(e, onChange);
        }} />

        <Button className={classes.button} color="default"
        label='My Label' onClick={(event)=> onClick(event)}>
          Charger livre
          < Icon className={classes.rightIcon}>file_upload</Icon>
        </Button>

        ({fileName})

      </div>
    </FormControl>


  );
}
