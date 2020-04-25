////////////////////////////////////////////////////////////////////////////////////////////
// MyMenu
////////////////////////////////////////////////////////////////////////////////////////////

function MyMenu(props) {

  const classes = props.classes;

  const [anchorEl, setAnchorEl] = React.useState(0);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>

    <Tooltip title="menu">
      <IconButton aria-label="menu"  onClick={handleClick}>
        <Icon>menu</Icon>
      </IconButton>
    </Tooltip>

      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
      <MenuItem onClick={handleClose}>
        <Link href="SelectStory.html">
          <Icon>menu</Icon>&nbsp;Menu principal
        </Link>
      </MenuItem>
      <MenuItem onClick={handleClose}>
        <Link href="text_to_picts_material_ui_CDN_V2.html">
          <Icon>create</Icon>&nbsp;Ecrire une histoire
        </Link>
      </MenuItem>
    </Menu>
    </div>
  );

}
