////////////////////////////////////////////////////////////////////////////////////////////
// MyMenu
////////////////////////////////////////////////////////////////////////////////////////////

function MyMenu(props) {

  const classes = props.classes;

  const [anchorEl, setAnchorEl] = React.useState(null);

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
          <Icon>menu</Icon>&nbsp;Menu principal<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<Icon>menu_book</Icon>&nbsp;Lire<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<Icon>sports_esports</Icon>&nbsp;Jouer<br/>
        </Link>
      </MenuItem>
      <MenuItem onClick={handleClose}>
        <Link href="ecrire.html">
          <Icon>create</Icon>&nbsp;Ecrire une histoire
        </Link>
      </MenuItem>
    </Menu>
    </div>
  );

}
