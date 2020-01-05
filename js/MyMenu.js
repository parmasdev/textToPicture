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
          <Link href="text_to_picts_material_ui_CDN_V2.html">
            <Icon>create</Icon>&nbsp;Ecrire une histoire
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link href="LIRE_HISTOIRE_react_material_ui_CDN_V2.html">
            <Icon>menu_book</Icon>&nbsp;Lire une histoire
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link href="GAME_react_material_ui_CDN_V3.html">
            <Icon>sports_esports</Icon>&nbsp;Game - Remettre l'histoire dans l'ordre
          </Link>
        </MenuItem>
      </Menu>
    </div>
  );

}
